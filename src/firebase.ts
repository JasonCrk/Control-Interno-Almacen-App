import { FirebaseOptions, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

import config from "./config"

const firebaseConfig: FirebaseOptions = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
