// Firebase Connection Test Utility
import { getAuthInstance, getDb } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

export interface FirebaseConnectionStatus {
    isConnected: boolean;
    error?: string;
    user?: any;
    collections?: string[];
}

export const testFirebaseConnection = async (): Promise<FirebaseConnectionStatus> => {
    try {
        console.log('Testing Firebase connection...');

        // Test Authentication
        const auth = await getAuthInstance();
        const user = auth.currentUser;
        console.log('Current user:', user?.uid || 'No user logged in');

        // Test Firestore
        const db = await getDb();
        console.log('Firestore instance created successfully');

        // Test reading from bookings collection
        const bookingsRef = collection(db, 'bookings');
        const bookingsQuery = query(bookingsRef, limit(1));
        const bookingsSnapshot = await getDocs(bookingsQuery);
        console.log('Bookings collection accessible, found', bookingsSnapshot.size, 'documents');

        // Test reading from users collection
        const usersRef = collection(db, 'users');
        const usersQuery = query(usersRef, limit(1));
        const usersSnapshot = await getDocs(usersQuery);
        console.log('Users collection accessible, found', usersSnapshot.size, 'documents');

        return {
            isConnected: true,
            user: user ? { uid: user.uid, email: user.email } : null,
            collections: ['bookings', 'users']
        };

    } catch (error) {
        console.error('Firebase connection test failed:', error);
        return {
            isConnected: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const testBookingData = async (counselorId: string) => {
    try {
        const db = await getDb();
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, limit(5));
        const snapshot = await getDocs(q);

        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log('Sample booking data:', bookings);
        return bookings;
    } catch (error) {
        console.error('Failed to fetch booking data:', error);
        return [];
    }
};
