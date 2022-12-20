import { db } from "../../firebaseConfig";
import { getDocs, query, collection, where, getDoc, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Db {

    userRef = collection(db,"users");
     userResponse ;
   
     error;
     isError = true;

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
             this.userResponse =  {...doc.data(), id: doc.id , status: "success" }
         }
           
         })

    }

   } catch (error) {
        this.isError = true;
        this.error = error;
    }

    return new Promise((resolve, reject) => {
        if(!this.isError) {
            AsyncStorage.setItem("user", JSON.stringify(this.userResponse));
            resolve(this.userResponse);
        } else {
            reject(this.error)
        }
    })
}


static async logout() {
    AsyncStorage.clear();
    return {
      status: "success",
      message: "You are logged out",
    };
  };


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


    static async getStudentByUserId(id) {
        let studentResponse;
        const q = query(collection(db,"students"),where("userId","==",`${id}`))

        try {
            const snap =  await getDocs(q);
            this.isError = false;
            snap.forEach((doc) => {
            studentResponse = { ...doc.data(), id: doc.id};
            })
           
        } catch (error) {
            this.isError = true;
            this.error = error;
        }

        return new Promise((resolve, reject) => {
            if(!this.isError){
                resolve(studentResponse)
            } else {
                reject(this.isError)
            }
        })
    }


    static async getTeacherByUserId(id) {
        let studentResponse;
        const q = query(collection(db,"teachers"),where("userId","==",`${id}`))

        try {
            const snap =  await getDocs(q);
            this.isError = false;
            snap.forEach((doc) => {
            studentResponse = { ...doc.data(), id: doc.id};
            })
           
        } catch (error) {
            this.isError = true;
            this.error = error;
        }

        return new Promise((resolve, reject) => {
            if(!this.isError){
                resolve(studentResponse)
            } else {
                reject(this.isError)
            }
        })
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */

    static async getCourseById(id) {
        let courseResponse;
        try {
            const courseRef = doc(db, 'courses', `${id}`);
            const snap = await getDoc(courseRef);
            this.isError = false;
            courseResponse = snap.data(); 
        } catch (error) {
          this.isError = true;
          this.error = error;  
        }

        return new Promise((resolve, reject) => {
            if(!this.isError) {
                resolve(courseResponse)
            } else {
                reject(this.error);
            }
        })
       
    }


    static async postCourseForStudent(id, course) {
      const response = await  this.getStudentByUserId(id);
     const foundCourse = response.courses.find((c) => c.id === course.id);
     const studentRef = doc(db, "students", response.id)
     if(foundCourse) {
        this.isError = true;
        this.error = {message : 'you are already registred for this course'}
     } else {
        const newStudent = {...response, courses : [...response.courses, course]};
        try {
            await setDoc(studentRef, newStudent);
            this.isError = false; 
        } catch (error) {
         this.isError = true;
         this.error = error;   
        }
        

     }

     return new Promise((resolve, reject) => {
        if(!this.isError){
            resolve({message: "you are successfully registred for this course"})
        } else {
            reject(this.error)
        }
     })
      

    }

}