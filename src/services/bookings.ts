import { getAuthInstance, getDb } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, getDocs, getDoc } from "firebase/firestore";

export interface CounselorProfile {
  id: string;
  name: string;
  role: 'counselor' | 'on-campus-counselor';
  specialization?: string;
  availability?: string;
}

export interface Booking {
  id: string;
  userId: string;
  counselorId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  scheduledTime?: string;
  createdAt?: any;
  isEmergency?: boolean;
}

export const listCounselors = async (): Promise<CounselorProfile[]> => {
  const db = await getDb();
  const q = query(collection(db, 'users'), where('role', 'in', ['counselor', 'on-campus-counselor']));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
};

export const createBooking = async (counselorId: string) => {
  const auth = await getAuthInstance();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const db = await getDb();
  await addDoc(collection(db, 'bookings'), {
    userId: user.uid,
    counselorId,
    status: 'pending',
    createdAt: serverTimestamp(),
    isEmergency: false,
  });
};

export const listenBookingsForCounselor = async (
  cb: (bookings: Booking[]) => void
) => {
  const auth = await getAuthInstance();
  const user = auth.currentUser;
  if (!user) return () => {};
  const db = await getDb();
  const q = query(collection(db, 'bookings'), where('counselorId', '==', user.uid), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Booking[]);
  });
};

export const acceptBooking = async (bookingId: string, scheduledTime: string) => {
  const db = await getDb();
  const update: any = { status: 'accepted' };
  if (scheduledTime) update.scheduledTime = scheduledTime;
  await updateDoc(doc(db, 'bookings', bookingId), update);
};

export const rejectBooking = async (bookingId: string) => {
  const db = await getDb();
  await updateDoc(doc(db, 'bookings', bookingId), { status: 'rejected' });
};

export const getUserProfileById = async (userId: string): Promise<{ id: string; name: string; phoneNumber?: string; guardianPhone?: string } | null> => {
  const db = await getDb();
  const snap = await getDoc(doc(db, 'users', userId));
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return { id: userId, name: data.name || 'Student', phoneNumber: data.phoneNumber, guardianPhone: data.guardianPhone };
};

export const listenBookingsForStudent = async (
  cb: (bookings: Booking[]) => void
) => {
  const auth = await getAuthInstance();
  const user = auth.currentUser;
  if (!user) return () => {};
  const db = await getDb();
  const q = query(collection(db, 'bookings'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Booking[]);
  });
};


