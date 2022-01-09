import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config= {
    apiKey: "AIzaSyBIKZDji4qXf1nJX_eVoshbcKIVvyWCqeQ",
    authDomain: "crwn-db-b9a25.firebaseapp.com",
    projectId: "crwn-db-b9a25",
    storageBucket: "crwn-db-b9a25.appspot.com",
    messagingSenderId: "320016011929",
    appId: "1:320016011929:web:3f39f963cccfbcace75e08",
    measurementId: "G-RYLZMT72R8"
  };

  export const createUserProfileDocument = async(userAuth, additionalData)=>{
    if(!userAuth) return;

    const  userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt=new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch(error){
         console.log('error creating user', error.message); 
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth= firebase.auth();
  export const firestore= firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
