import "./row.css"
import { Tilt_Warp } from "next/font/google"
const tiltWarp = Tilt_Warp({ subsets: ['latin'] })

const Row = ({item,deleteItem}) => {
    const {date,price,content} = item
    return (
        <div className="rowDiv">
            <div className="information">
                <p className={tiltWarp.className}>{date}</p>            
                <p className={`price ${price >0 ? "income" : "outcome" } ${tiltWarp.className}`}>{price}</p>
                <p className={tiltWarp.className}>{content}</p>
            </div>
            <button onClick = {deleteItem} className={"button "+tiltWarp.className}>delete</button>
        </div>
    )
}
export default Row