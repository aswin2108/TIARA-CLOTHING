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

  firebase.initializeApp(config);

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
  };

  export const addCollectionAndDocuments=async(collectionKey, objectsToAdd)=>{
    const collectionRef= firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch=firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef=collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });
    return transformedCollection.reduce((accumulator, collection)=> {
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    } ,{});
  };
  
 export const getCurrentUser=()=>{
   return new Promise((resolve, reject)=>{
     const unsubscribe=auth.onAuthStateChanged(userAuth=>{
       unsubscribe();
       resolve(userAuth);
     }, reject)
   });
 }

  export const auth= firebase.auth();
  export const firestore= firebase.firestore();

  export const googleProvider=new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);

  export default firebase;
