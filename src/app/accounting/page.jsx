"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import RowList from "./components/rowList/rowList"
import InputBox from "./components/inputBox/InputBox"
import { Tilt_Warp } from "next/font/google"
import "./accountingPage.css"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc } from "firebase/firestore"; 
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
 
const firebaseConfig = process.env.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const tiltWarp = Tilt_Warp({ subsets: ['latin'] })

const Accounting = () => {    
    const [items, setItems] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [userID, setUserID] = useState("")
    const router = useRouter()
    const [signInStatus, setSignInStatus] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                const uid = auth.currentUser.uid;
                console.log("signedIn")
                console.log(auth.currentUser.displayName)
                setUserID(uid)
                setSignInStatus(true)                     
              // User is signed in
              // You can access user information with user.uid, user.email, etc.
            } else {
                console.log("signedout")
                router.push("/")
              // User is signed out
            }
          });
        
    },[])    
    useEffect(() => {
        const getData = async() => {
            if (userID !== ""){
                const dataArr = []
                // const docRef = doc(db, "users", userID,"data")         
                const querySnapshot = await getDocs(collection(db, "users", userID,"data"));
                querySnapshot.forEach((doc) => {
                    dataArr.push(doc.data())                
                })        
                setItems(dataArr)            
            }    
        }
        getData()
    },[userID])
    
    
    useEffect(() => {        
        const pricedataArray = items.map(item => item.price)             
        const newTotalPrice = pricedataArray.reduce((accumulator,currentValue)=>{
            return accumulator + currentValue;},0)
        setTotalPrice(newTotalPrice)       
    },[items])
    
    const handleSubmit = async(e) => {
        e.preventDefault()        
        const form = e.target;
        const formData = new FormData(form);        
        const formJson = Object.fromEntries(formData.entries());        
        const newItem = {date:formJson.date,price:formatPrice(formJson),content:formJson.content}        
        const docRef = doc(db, "users", userID);
        const result = await addDoc(collection(docRef,"data"),newItem)
        await updateDoc(doc(docRef,"data",result.id),{
            id:result.id
        })
        newItem.id = result.id
        console.log("Document written with ID: ",result.id);
        setItems([...items,newItem])                
    }
    const formatPrice = (jsonData) =>{       
        if (jsonData.incomeOrOutcome === "income"){
            return  parseInt(jsonData.price)
        }else{
            return -parseInt(jsonData.price)
        }
    }
       
    

    return (        
        <div className="main">                     
            <InputBox handleSubmit={handleSubmit} />                       
            <RowList items = {items} setItems = {setItems} userID = {userID}/>
            <p className={tiltWarp.className}>Total: <span>{totalPrice}</span></p>
            <div className={`linkDiv ${tiltWarp.className}`}>
                <Link href="/" className={"linkStyle "+tiltWarp.className}>HomePage</Link>
            </div>
        </div>
    )
}
export default Accounting
