// Booking Test Utility
import { createBooking } from "@/services/bookings";
import { testFirebaseConnection } from "@/lib/firebaseTest";

export const testBookingCreation = async (counselorId: string) => {
    try {
        console.log('=== BOOKING CREATION TEST ===');

        // Test Firebase connection first
        const connectionTest = await testFirebaseConnection();
        console.log('Firebase connection test result:', connectionTest);

        if (!connectionTest.isConnected) {
            throw new Error(`Firebase connection failed: ${connectionTest.error}`);
        }

        // Test booking creation
        console.log('Testing booking creation for counselor:', counselorId);
        const bookingId = await createBooking(counselorId);
        console.log('✅ Booking created successfully with ID:', bookingId);

        return {
            success: true,
            bookingId,
            message: 'Booking created successfully'
        };

    } catch (error) {
        console.error('❌ Booking creation test failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            message: 'Booking creation failed'
        };
    }
};

export const testBookingFlow = async () => {
    console.log('=== COMPLETE BOOKING FLOW TEST ===');

    try {
        // Test Firebase connection
        const connectionTest = await testFirebaseConnection();
        if (!connectionTest.isConnected) {
            throw new Error(`Firebase connection failed: ${connectionTest.error}`);
        }

        // Test counselor listing
        const { listCounselors } = await import("@/services/bookings");
        const counselors = await listCounselors();
        console.log('Available counselors:', counselors);

        if (counselors.length === 0) {
            throw new Error('No counselors found in database');
        }

        // Test booking creation with first counselor
        const firstCounselor = counselors[0];
        console.log('Testing booking with counselor:', firstCounselor.name, firstCounselor.id);

        const bookingResult = await testBookingCreation(firstCounselor.id);

        return {
            success: bookingResult.success,
            counselor: firstCounselor,
            bookingId: bookingResult.bookingId,
            error: bookingResult.error
        };

    } catch (error) {
        console.error('❌ Booking flow test failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
