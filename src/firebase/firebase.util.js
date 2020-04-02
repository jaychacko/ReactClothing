import firebase from 'firebase/app';


import 'firebase/firestore';
import 'firebase/auth';



const config = {


    apiKey: "AIzaSyBIfidXTI5U34erhbSVzS-xMLb09wp8v2c",
    authDomain: "crwn-db-46812.firebaseapp.com",
    databaseURL: "https://crwn-db-46812.firebaseio.com",
    projectId: "crwn-db-46812",
    storageBucket: "crwn-db-46812.appspot.com",
    messagingSenderId: "907259427487",
    appId: "1:907259427487:web:c0b8613c8780f6632b40aa",
    measurementId: "G-ZN6FY4V2E5"
}
firebase.initializeApp(config);

export const createUserProfilDocument = async (userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error.message)
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promp:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;