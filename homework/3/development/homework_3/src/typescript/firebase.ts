import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, getDocs, query, orderBy, limit} from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyAscQNw8eTc4rwCs1x1eDKV58Z8CMev4xw",

  authDomain: "cmpsc-421-homework-3.firebaseapp.com",

  projectId: "cmpsc-421-homework-3",

  storageBucket: "cmpsc-421-homework-3.firebasestorage.app",

  messagingSenderId: "981252902700",

  appId: "1:981252902700:web:c6c2ac4a8bc25dd693a689"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the leaderboard collection
export const leaderboard_ref = collection(db, "leaderboard");

// Helper function to save a score
export async function saveScore(score_data: any) {
    try {
        await addDoc(leaderboard_ref, {
            ...score_data,
            timestamp: new Date()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Helper function to get top 10 scores
export async function get_top_scores() {
    const q = query(leaderboard_ref, orderBy("correct_words", "desc"), limit(10));
    const query_snap_shot = await getDocs(q);
    return query_snap_shot.docs.map(doc => doc.data());
}