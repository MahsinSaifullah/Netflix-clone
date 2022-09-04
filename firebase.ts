import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB15N9MnKM7pK-CZz826-mBo8SFuIT8OtU',
  authDomain: 'netflix-clone-mahsin.firebaseapp.com',
  projectId: 'netflix-clone-mahsin',
  storageBucket: 'netflix-clone-mahsin.appspot.com',
  messagingSenderId: '694429662455',
  appId: '1:694429662455:web:1e78ce0b37383d43f967f2',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
