import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../config';
import { addStudyMinutes } from './userService';

export interface StudySession {
  id?: string;
  user_id: string;
  session_type: string; // 'input', 'recall', 'grammar'
  duration_minutes: number;
  notes: string;
  reference_url?: string;
  timestamp: number;
}

export const logStudySession = async (session: Omit<StudySession, 'id'>) => {
  // 1. Add the session log
  const sessionsRef = collection(db, 'study_sessions');
  const docRef = await addDoc(sessionsRef, session);
  
  // 2. Update the user's total hours
  await addStudyMinutes(session.user_id, session.duration_minutes);

  return docRef.id;
};

export const getUserSessions = async (uid: string) => {
  const sessionsRef = collection(db, 'study_sessions');
  const q = query(
    sessionsRef, 
    where("user_id", "==", uid),
    orderBy("timestamp", "desc")
  );

  const querySnapshot = await getDocs(q);
  const sessions: StudySession[] = [];
  querySnapshot.forEach((doc) => {
    sessions.push({ id: doc.id, ...doc.data() } as StudySession);
  });

  return sessions;
};
