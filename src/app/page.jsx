"use client"
import { Tilt_Warp } from "next/font/google"
import { signInForm} from "./accounting/auth"
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, getRedirectResult, signInWithRedirect} from "firebase/auth";
import { useEffect } from "react";

const tiltWarp = Tilt_Warp({ subsets: ['latin'] })

const Index = () => {
  const router = useRouter()
  const auth = getAuth();
  


  const checkSignIn = () => {
    const user = auth.currentUser;
    if (user) {            
        const uid = user.uid;
        console.log("signed in")            
        router.push("/accounting")  
      // User is signed in
      // You can access user information with user.uid, user.email, etc.
    } else {
        console.log("signedout")
        signInForm()
      // User is signed out
    }
      
}
  return (
    <div>      
      <h2 className={tiltWarp.className}>Welcome</h2>
      <div className="linkDiv">
        <h3 className={"linkStyle "+tiltWarp.className} onClick={checkSignIn} >START</h3>
      </div>        
    </div>
  )
}
export default Index