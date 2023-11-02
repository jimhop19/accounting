import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";




const firebaseConfig = process.env.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

const signInForm = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;            
            // IdP data available using getAdditionalUserInfo(result)
            // ...            
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
const signOutForm = () => {
  return new Promise (() => {
    signOut(auth).then(() => {
      resolve()
      // Sign-out successful.
    }).catch((error) => {
    
      // An error happened.
    });
  })
}

  

  export { signInForm, signOutForm }