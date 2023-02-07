import { db } from "../../firebaseConfig";
import { getDocs, query, collection, where, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";



/**
 * @class Db (Database)
 * for crud-Operations in firebase / firestore
 */
export class Db {

     userRef = collection(db,"users");
     userResponse ;
   
     error;
     isError = true;

    courseRef = collection(db, "courses");
    


/**
 *  verify if the account already exists in database
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<void>}
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

/**
 * logout the current user => delete the current user in async storage
 * @returns {Promise<void>}
 */
static async logout() {
    AsyncStorage.clear();
    return {
      status: "success",
      message: "You are logged out",
    };
  };



/**
 * fetch all availables courses in the database
 *@returns {Promise<void>}
 */
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



/**
 * fetch the current student corresponding with the current user id
 * @param {string} id 
 * @returns {Promise<void>}
 */
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


/**
 * fetch the current teacher corresponding with the current user id
 * @param {string} id
 * @returns {Promise<void>}
 */
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
 * fetch a course corresponding to the id
* @param {string} id 
* @returns {Promise<void>}
*/
static async getCourseById(id) {
        let courseResponse;
        try {
            const courseRef = doc(db, 'courses', `${id}`);
            const snap = await getDoc(courseRef);
            this.isError = false;
            courseResponse =  {...snap.data(), id: snap.id}
        } catch (error) {
          this.isError = true;
          this.error = error;  
        }

        return new Promise((resolve, reject) => {
            if(!this.isError) {
                resolve({...courseResponse})
            } else {
                reject(this.error);
            }
        })
       
    }


/**
 * to register a student in a course
* @param {string} id 
* @param {string} course
* @returns {Promise<void>}
*/
static async postCourseForStudent(id, course) {
      const response = await  this.getStudentByUserId(id); 
      console.log(response)
     const foundCourse = response.courses.find((c) => c.id === course.id);
     const studentRef = doc(db, "students", response.id)
     if(foundCourse) {
        this.isError = true;
        this.error = {message : 'you are already registred for this course'}
     } else {
        const {id: responseId, ...others} = response;
        console.log(response.courses)
        const newStudent = {...others, courses : [...response.courses, course]};
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

/**
 * to add a course by a teacher
* @param {string} id 
* @param {string} course
* @returns {Promise<void>}
*/
static async postCourseForTeacher(id, course) {
        let courseId;
        const courseRef = doc(collection(db, 'courses'));
        try {
            await setDoc(courseRef, course);
           // console.log(response)
           const q = query(collection(db,"courses"),where("title","==", course.title))
           const snap = await getDocs(q);
           snap.forEach((doc) => {
            courseId = doc.id;
           })
            const teacher = await this.getTeacherByUserId(id);
            const teacherRef = doc(db, 'teachers', teacher.id);
            const {id: teacherId, ...others} = teacher;
            const newTeacher = {...others, courses: [...teacher.courses, {...course, id: courseId}]};
            await setDoc(teacherRef, newTeacher);
            this.isError = false;
        } catch (error) {
           this.isError = true;
           this.error = error; 
        }

        return new Promise((resolve, reject) => {
            if(!this.isError){
                resolve({message : "Your new course is successfully registred"})
            } else {
                reject({message: 'Error by saving the new course'})
            }
        })
        

    }

/**
 * set a student online
* @param {string} id 
* @param {string} studentId
* @returns {Promise<void>}
*/
static async setStudentOnline(id, studentId) {
        console.log('begin')
        let student;
        let courseResponse;
        try {
             courseResponse =  await this.getCourseById(id);
             console.log(id) 
             console.log(courseResponse) 
            
        } catch (error) {
            this.error = 'failed to check in'
            this.isError = true;
           console.log('no course found with this id') 
        }

        const studentRef = doc(db, "students", studentId);
        const studentSnapshot = await getDoc(studentRef);
         console.log('middle')
        if(studentSnapshot.exists()) {
            student = studentSnapshot.data();
        } else {
            this.error = 'failed to check in'
            console.log('error by searching current student')
            this.isError = true;
            Promise.reject({message: error})
        }

        const oldOnlines = courseResponse.online;
        const courseRef = doc(db, "courses", id);
        
        try {
            await updateDoc(courseRef, {
                online: [...oldOnlines, student.userId]
            })
            this.isError = false;
        } catch (error) {
            this.error = 'failed to check in'
           console.log('failed to update course model') 
           this.isError = true;
        }
       
        return new Promise((resolve, reject) => {
            if(this.isError) {
                reject({error : "there is an error by saving student"})
            }
            resolve({message: "saved successfully"})
        })
     
    }


/**
 * set a student offline
* @param {string} id 
* @param {string} userId
* @returns {Promise<void>}
*/
static async setStudentOffline(id, userId) {
        let course;

        try {
          course = await this.getCourseById(id); 
          const newOnlines = course.online.filter((onlineId) => onlineId !== userId);
          const courseRef = doc(db, "courses", id);
          await updateDoc(courseRef, {
            online : newOnlines
          })
          this.isError = false
        } catch (error) {
          this.isError = true;
          console.log(error) 
        }

        return new Promise((resolve, reject) => {
            if(this.isError) {
                reject({message: this.error})
            }

            resolve({message: "successfully checkout"})
        })
    }

/**
 * fetch users with the following ids
* @param {string[]} id 
* @returns {Promise<void>}
*/
static async getUsersByIds(ids) {
        let userList = [];
        
        for(const id of ids) {
           console.log(id)
           try {
           const userRef = doc(db, "users", id)
            const userSnapshot = await getDoc(userRef);
            if(userSnapshot.exists()) {
            userList.push({...userSnapshot.data(), id: userSnapshot.id})
            this.isError = false;
                }

            } catch (error) {
                console.log(error) 
                this.isError = true;
                this.error = 'fail to get online students'; 
              }

            }
        
       

        return new Promise((resolve, reject) => {
            if(this.isError) {
                reject({data: this.error})
            }
            resolve(userList)
        })
       
    }



    /**
 * fetch all availables students in the database
 *@returns {Promise<void>}
 */
static async getAllStudents() {
    let studentsResponse = [];
    const q = collection(db,"students");
    try {
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            this.isError = false;
          studentsResponse?.push({...doc.data(), id: doc.id}); 
        })

    } catch (error) {
        this.isError = true;
        this.error = error;
    }

    return new Promise((resolve,reject) => {
        if(!this.isError) {
            resolve(studentsResponse);
        } else {
            reject(this.error);
        }
    })
}



static async getStudentsByCourseId(id) {
    let courseResponse;
    let students;
    try {
       courseResponse = await this.getCourseById(id)
        students = await this.getAllStudents(); 
        console.log(students)
        this.isError= false
    } catch (error) {
       this.isError = true;
       this.error = error;
        
    }
    
    const referencedStudents = students.filter((student) => {
        student.courses.forEach((course) => {
        if(course.title === courseResponse.title) {
            return true;
        }
        })
    })
    console.log("here is good"+referencedStudents)

    return new Promise((resolve,reject) => {
               if(!this.isError) {
                resolve(referencedStudents)
               }  else {
                reject(this.error)
               }
    })

}


   

}