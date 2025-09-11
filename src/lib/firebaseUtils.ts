import { getAuthInstance, getDb } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  guardianPhone?: string;
  role?: string;
}

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const auth = await getAuthInstance();
  const user = auth.currentUser;
  if (!user) return null;
  const db = await getDb();
  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists()) return { id: user.uid, name: user.email?.split('@')[0] || 'User' };
  const data = snap.data() as any;
  return {
    id: user.uid,
    name: data.name || user.email?.split('@')[0] || 'User',
    phoneNumber: data.phoneNumber,
    guardianPhone: data.guardianPhone,
    role: data.role,
  };
};


