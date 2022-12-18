import { db } from "../firebaseConfig";
import { getDocs, query, collection, where } from 'firebase/firestore';


export class Db {

    userRef = collection(db,"users");
    

static async login(username, password) {
    console.log("hey")
    const q = query(collection(db,"users"),where("username","==", username))
    try {
    const snap = await  getDocs(q);
    console.log(snap)
    if(snap.length === 0) {
        return "no users with this username"
    }

    snap.forEach((doc) => {
       if(doc.data().password !== password) {return "wrong credentials!!!"}
       return {...doc.data(), id: doc.id }
    })

    
        
    } catch (error) {
        console.log(error)
    }
}

}