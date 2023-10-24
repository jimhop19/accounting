import { Tilt_Warp } from "next/font/google"
import Link from "next/link"
const tiltWarp = Tilt_Warp({ subsets: ['latin'] })
const Index = () => {
  return (
    <div>      
      <h2 className={tiltWarp.className}>Welcome</h2>
      <div className="linkDiv">
        <Link href="/accounting" className={"linkStyle "+tiltWarp.className} >START</Link>
      </div>        
    </div>
  )
}
export default Index