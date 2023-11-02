"use client"
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { signInForm, signOutForm } from "../../auth";
import { redirect, useRouter } from 'next/navigation'
import { Tilt_Warp } from "next/font/google"
import "./menu.css"
const firebaseConfig = process.env.firebaseConfig
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const tiltWarp = Tilt_Warp({ subsets: ['latin'] })

const Menu = () => {
    const [menuToggle,setmenuToggle] = useState(false)
    const [display,setDisplay] = useState("none")
    const [userName,setUserName] = useState("")
    const [userNameDisplay,setUserNameDisplay] = useState("none")
    const [signInStatus,setSignInStatus] = useState("Sign in")
    const router = useRouter()
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                const uid = auth.currentUser.uid;               
                setUserName(auth.currentUser.displayName)
                setUserNameDisplay("block")
                setSignInStatus("Sign Out")  
              // User is signed in
              // You can access user information with user.uid, user.email, etc.
            } else {                
                setSignInStatus("Sign In")
              // User is signed out
            }
          });        
    },[])
    useEffect(() => {
        if(menuToggle){
            setDisplay("block")
        }else{
            setDisplay("none")
        }
    },[menuToggle])
    const onClickHandler = () => {
        if(menuToggle){
            setmenuToggle(false)
        }else{
            setmenuToggle(true)
        }        
    }
    const signInOutHandler = async(e) => {
        e.preventDefault();
        if (signInStatus === "Sign In"){
            signInForm()            
        }else if (signInStatus === "Sign Out"){
            signOutForm()
            .then(setUserNameDisplay("none"))
            router.push("/")
            
            
        }
    }
    
    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <span className="material-symbols-outlined" onClick={onClickHandler}>menu</span>
            <div className="dropDownBlock" style={{"display":display}}>
                <p className={`userName menuText ${tiltWarp.className}`} style={{"display":userNameDisplay}}>Hi, {userName}</p>
                <hr />
                <p className={`menuText ${tiltWarp.className}`} onClick={signInOutHandler}>{signInStatus}</p>
            </div>
        </div>
        
    )
}

export default Menu