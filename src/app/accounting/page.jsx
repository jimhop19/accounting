"use client"
import React, { useEffect, useState } from "react"
import RowList from "./components/rowList/rowList"
import InputBox from "./components/inputBox/InputBox"
import Link from "next/link"
import { Tilt_Warp } from "next/font/google"
import "./accountingPage.css"


const tiltWarp = Tilt_Warp({ subsets: ['latin'] })

const Accounting = () => {    
    const [items, setItems] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)       
   
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);        
        const formJson = Object.fromEntries(formData.entries());        
        const newItem = {date:formJson.date,price:formatPrice(formJson),content:formJson.content}        
        setItems([...items,newItem])       
    }
    const formatPrice = (jsonData) =>{       
        if (jsonData.incomeOrOutcome === "income"){
            return  parseInt(jsonData.price)
        }else{
            return -parseInt(jsonData.price)
        }
    }
    useEffect(() => {        
        const priceArray = items.map(item => item.price)             
        const newTotalPrice = priceArray.reduce((accumulator,currentValue)=>{
            return accumulator + currentValue;},0)
        setTotalPrice(newTotalPrice)       
    },[items])    
    

    return (
        <div className="main">                     
            <InputBox handleSubmit={handleSubmit} />                       
            <RowList items = {items} setItems = {setItems}/>
            <p className={tiltWarp.className}>Total: <span>{totalPrice}</span></p>
            <div className={`linkDiv ${tiltWarp.className}`}>
                <Link href="/" className={"linkStyle "+tiltWarp.className}>HomePage</Link>
            </div>
        </div>
    )
}
export default Accounting