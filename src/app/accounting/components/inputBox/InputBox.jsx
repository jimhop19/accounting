import "./inputBox.css"
import { Tilt_Warp } from "next/font/google"
const tiltWarp = Tilt_Warp({ subsets: ['latin'] })
const InputBox = ({handleSubmit}) => {    
    return (
        <div className = {"inputBox "+ tiltWarp.className}>
            <form method="post" onSubmit={handleSubmit} >
                <label >
                    <input name="date"type="date" className={tiltWarp.className}
                    required />
                </label>
                <label >                
                    <select name="incomeOrOutcome" id="incomeOrOutcome" className={tiltWarp.className}>
                        <option value="income">income</option>
                        <option value="expense">expenses</option>
                    </select>
                </label>
                <label>
                    <input name="price" type="number" placeholder="price" className={tiltWarp.className} required/>
                </label>
                <input name="content" type="text" placeholder="content" className={tiltWarp.className} required/>
                <button type="submit" className={tiltWarp.className}>submit</button>
                </form>  
        </div>
    )
}
export default InputBox