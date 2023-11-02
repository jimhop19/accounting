import Row from "../row/row";
import "./rowList.css"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, collection } from "firebase/firestore";

const firebaseConfig = process.env.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RowList = ({items, setItems, userID}) => {
       
    return(
    <div className="rowList">
        {items.sort((a,b) => new Date(b.date) - new Date(a.date)).map((item,i) => {            
            return(                
                <Row 
                    item = {item} 
                    key = {`item${i}`} 
                    deleteItem = {() => {                    
                        const updatedItems = items.filter((_, index) => index !== i);
                        console.log(items[i])
                        const deleteFromFirebase = async(input) => {
                            const docRef = doc(db,"users",userID)
                            await deleteDoc(doc(docRef, "data", input));
                            console.log("delete success")
                        }                        
                        deleteFromFirebase(items[i].id)                        
                        setItems(updatedItems);                                      
            }}/>) 
        })}
        
    </div>
    )
};
export default RowList;