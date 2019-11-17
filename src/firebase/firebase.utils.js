import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCBdtoCwIZIUjV77_5iAoCZlCqnOW6w94I",
  authDomain: "mrj-skis.firebaseapp.com",
  databaseURL: "https://mrj-skis.firebaseio.com",
  projectId: "mrj-skis",
  storageBucket: "mrj-skis.appspot.com",
  messagingSenderId: "63327672174",
  appId: "1:63327672174:web:9446f0ce938974ec49137f",
  measurementId: "G-3Y8V50CR9P"
};

firebase.initializeApp(config)

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additioanlData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additioanlData
      })

    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef
}
