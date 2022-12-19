import { db } from "../../firebaseConfig";
import { getDocs, query, collection, where } from 'firebase/firestore';


export class Db {

    userRef = collection(db,"users");
     userResponse ;
   
     error;
     isError;

    courseRef = collection(db, "courses");
    
/**
 * 
 * @param {username} username 
 * @param {password} password 
 * @returns Promise<void>
 */
static async login(username, password) {
    let dbUsername;
    
    const q = query(collection(db,"users"),where("username","==", username))
    try {
    const snap = await  getDocs(q);
    console.log(snap)
    snap.forEach((doc) => {
        dbUsername = doc.data().username
    })
    if(dbUsername !== username) {
        this.isError = true;
        this.error = {message:"no users with this username"}
    } else {
        snap.forEach((doc) => {
            if(doc.data().password !== password) {
             this.isError = true;
             this.error = { message: "wrong credentials!!!"}
         } else {
             this.isError = false;
             this.userResponse =  {...doc.data(), id: doc.id }
         }
           
         })

    }

   } catch (error) {
        this.isError = true;
        this.error = error;
    }

    return new Promise((resolve, reject) => {
        if(!this.isError) {
            resolve(this.userResponse);
        } else {
            reject(this.error)
        }
    })
}


    static async getAllCourses() {
        let courseResponse = [];
        const q = collection(db,"courses");
        try {
            const snap = await getDocs(q);
            snap.forEach((doc) => {
                this.isError = false;
              courseResponse?.push({...doc.data(), id: doc.id}); 
            })

        } catch (error) {
            this.isError = true;
            this.error = error;
        }

        return new Promise((resolve,reject) => {
            if(!this.isError) {
                resolve(courseResponse);
            } else {
                reject(this.error);
            }
        })
    }

}