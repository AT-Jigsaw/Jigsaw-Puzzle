import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjAlRcCAmzsrgE9AwN7ie_zvKMO7OpV4c",
  authDomain: "puzzle-5b0e7.firebaseapp.com",
  projectId: "puzzle-5b0e7",
  storageBucket: "puzzle-5b0e7.appspot.com",
  messagingSenderId: "800674090772",
  appId: "1:800674090772:web:a2d4cf761faf21eb51fc01",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
