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

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

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

export const getCurrentUser = () =>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}


export const convertCollectionsSnapshotToMap = (collections)=>{

  const transformedCollection = collections.docs.map(
    doc=>{
      const {title, items} = doc.data();

      return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      }
    }
  )

  return transformedCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;

  } ,{})

  //creating an object accumulator containing something like this
  // accumulator = {ski: { ** ski collection **}, ... sale: { ** sale collection**}}
  // .reduce() iterates every element within the array "transformedCollection" and
  // makes a key by calling accumulator[key name] = elements <-associated within
  // this can be used when I need to convert array to object. 
}



//this function creates a new collection in the firebase DB using batch()
// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) =>{

//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();

//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc()
//     batch.set(newDocRef, obj);
//   })

//   return await batch.commit()

// }

//this is a trigger 

    // addCollectionAndDocuments('collections', 
    // collectionsArray.map(({title, items}) => ({title, items})))

    //creating a new object containing only 'title' and 'items' element
    // array.map(({a, b}) => { return ({a,b})}) )) 
    // for every element equals to 'a' and 'b', create a new object only with a and b
