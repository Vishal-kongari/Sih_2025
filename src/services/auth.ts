import { getAuthInstance, getDb } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type AppRole = 'student' | 'counselor' | 'on-campus-counselor';

export interface AppUser {
  id: string;
  email: string;
  role: AppRole;
  name: string;
}

export const fetchRole = async (uid: string): Promise<AppRole> => {
  const db = await getDb();
  const snap = await getDoc(doc(db, 'users', uid));
  return (snap.exists() ? (snap.data().role as AppRole) : 'student');
};

export const ensureProfile = async (uid: string, email: string, role: AppRole, name: string) => {
  const db = await getDb();
  await setDoc(doc(db, 'users', uid), { email, role, name }, { merge: true });
};

export const signInEmail = async (email: string, password: string): Promise<AppUser> => {
  const auth = await getAuthInstance();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const role = await fetchRole(cred.user.uid);
  const name = (cred.user.email || email).split('@')[0];
  return { id: cred.user.uid, email: cred.user.email || email, role, name };
};

export const signUpEmail = async (email: string, password: string, role: AppRole, displayName?: string): Promise<AppUser> => {
  const auth = await getAuthInstance();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const name = (displayName && displayName.trim()) ? displayName.trim() : email.split('@')[0];
  await ensureProfile(cred.user.uid, email, role, name);
  return { id: cred.user.uid, email, role, name };
};

export const signOutUser = async () => {
  const auth = await getAuthInstance();
  await signOut(auth);
};

export const listenAuth = (cb: (user: AppUser | null) => void) => {
  getAuthInstance().then((auth) => {
    onAuthStateChanged(auth, async (u) => {
      if (!u) return cb(null);
      const role = await fetchRole(u.uid);
      const email = u.email || '';
      const name = email.split('@')[0];
      cb({ id: u.uid, email, role, name });
    });
  });
};


