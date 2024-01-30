import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore , collection , addDoc , getDocs} from "firebase/firestore";
import { getStorage , ref , uploadBytes , getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDN1HhAwR3OpCgrXekOnbl3LMuzHrAqfqg",
  authDomain: "bookify-7dae6.firebaseapp.com",
  projectId: "bookify-7dae6",
  storageBucket: "bookify-7dae6.appspot.com",
  messagingSenderId: "250917128622",
  appId: "1:250917128622:web:61d38d7e80ea0366cb603f",
  measurementId: "G-QXXCRNGW0P",
};

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signInUser = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        alert("Success");
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  };

  const googleSignIn = (email, password) => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        alert("Success");
        console.log(result);
      })
      .catch((error) => {
        alert("Success");
        console.log(error);
      });
  };

  const handleListData = async (name, isBnNumber, price, coverPic) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
    const uploadRes = await uploadBytes(imageRef,coverPic);
    console.log(name);
    console.log(isBnNumber);
    console.log(price);
    console.log(uploadRes.ref.fullPath);
    console.log(user.uid);
    console.log(user.email);
    return await addDoc(collection(firestore,'books'),{
      name,
      isBnNumber, price, imageURL: uploadRes.ref.fullPath,
      userID:user.uid,
      userEmail:user.email,
    })
  };

  const getURL = (path) => {
    return getDownloadURL(ref(storage,path));
  }

  const getAllList = () => {
    return getDocs(collection(firestore,'books'));
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signInUser,
        createUser,
        googleSignIn,
        handleListData,
        getAllList,
        getURL,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
