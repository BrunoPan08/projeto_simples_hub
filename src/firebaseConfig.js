import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhQiScaUq5TZ_Prnkj3RQvgrfFjwvyxF8",
  authDomain: "simpleshub-37479.firebaseapp.com",
  databaseURL: "https://simpleshub-37479-default-rtdb.firebaseio.com",
  projectId: "simpleshub-37479",
  storageBucket: "simpleshub-37479.appspot.com",
  messagingSenderId: "49136668225",
  appId: "1:49136668225:web:b96e1c6fba62383eaf40c0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const clientRef = ref(database, 'clientes');
export const certificateRef = ref(database, 'certificados');
