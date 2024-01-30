import React, { createContext, useContext , useState , useEffect} from "react";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged , getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDN1HhAwR3OpCgrXekOnbl3LMuzHrAqfqg",
    authDomain: "bookify-7dae6.firebaseapp.com",
    projectId: "bookify-7dae6",
    storageBucket: "bookify-7dae6.appspot.com",
    messagingSenderId: "250917128622",
    appId: "1:250917128622:web:61d38d7e80ea0366cb603f",
    measurementId: "G-QXXCRNGW0P"
};

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user,setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        setUser(user);
      } else {
        setUser(null);
      }
    })
  },[]);

    const signInUser = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                alert("Success");
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const createUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                alert("Success");
                console.log(userCredential);
            })
            .catch((error) => {
                alert("Error");
                console.log(error.value);
            });
    }
    
   const googleSignIn = (email, password) => { signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      alert("Success");
    console.log(result)
    }).catch((error) => {
      alert("Success");
      console.log(error)
    });
}

const isLoggedIn = user ? true : false;
    return <FirebaseContext.Provider value={{ signInUser , createUser , googleSignIn , isLoggedIn}}>
        {
            props.children
        }
    </FirebaseContext.Provider>
}