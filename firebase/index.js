import firebase from 'firebase'
import * as c from '../config/constants'


require('firebase/firestore')

// Initialize Firebase
const config = {
    apiKey: c.FIREBASE_API_KEY,
    authDomain: c.FIREBASE_AUTH_DOMAIN,
    databaseURL: c.FIREBASE_DATABASE_URL,
    projectId: c.FIREBASE_PROJECT_ID,
    storageBucket: c.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const settings = {
    timestampsInSnapshots: true
}

const db = firebase.firestore()

db.settings(settings)

export { db }
export const storage = firebase.storage()
export const firebaseAuth = firebase.auth
