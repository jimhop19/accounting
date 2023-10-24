import Row from "../row/row";
import "./rowList.css"
const RowList = ({items, setItems}) => {
       
    return(
    <div className="rowList">
        {items.sort((a,b) => new Date(b.date) - new Date(a.date)).map((item,i) => {            
            return(                
                <Row 
                    item = {item} 
                    key = {`item${i}`} 
                    deleteItem = {() => {
                        const updatedItems = items.filter((_, index) => index !== i);
                        setItems(updatedItems);                                      
            }}/>) 
        })}
        
    </div>
    )
};
export default RowList;