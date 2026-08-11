import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  total_study_minutes: number;
  current_cefr_level: string;
  created_at: number;
}

export const CEFR_LEVELS = [
  { code: 'A1', minHours: 0, maxHours: 100 },
  { code: 'A2', minHours: 101, maxHours: 300 },
  { code: 'B1', minHours: 301, maxHours: 600 },
  { code: 'B2', minHours: 601, maxHours: 900 },
  { code: 'C1', minHours: 901, maxHours: 1100 },
  { code: 'C2', minHours: 1101, maxHours: 99999 }, // 1200 is fluency, but we cap high
];

export const calculateCEFRLevel = (totalMinutes: number): string => {
  const totalHours = Math.floor(totalMinutes / 60);
  const level = CEFR_LEVELS.find(l => totalHours >= l.minHours && totalHours <= l.maxHours);
  return level ? level.code : 'A1';
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data() as UserProfile;
  }
  return null;
};

export const createUserProfile = async (uid: string, email: string, name: string) => {
  const userRef = doc(db, 'users', uid);
  const newProfile: UserProfile = {
    uid,
    name,
    email,
    total_study_minutes: 0,
    current_cefr_level: 'A1',
    created_at: Date.now()
  };
  await setDoc(userRef, newProfile);
  return newProfile;
};

export const addStudyMinutes = async (uid: string, minutes: number) => {
  const userRef = doc(db, 'users', uid);
  
  // To calculate the new CEFR level, we need the current minutes first
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error("Usuário não encontrado.");

  const newTotalMinutes = profile.total_study_minutes + minutes;
  const newLevel = calculateCEFRLevel(newTotalMinutes);

  await updateDoc(userRef, {
    total_study_minutes: increment(minutes),
    current_cefr_level: newLevel
  });

  return { newTotalMinutes, newLevel };
};
