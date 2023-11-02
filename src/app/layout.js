import "./globals.css"
import { Tilt_Prism } from "next/font/google"
import Menu from "./accounting/components/menu/menu"
const tiltPrism = Tilt_Prism({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>            
        <div className="nav">
          <h1 className={tiltPrism.className}>Accounting</h1>        
          <Menu/>
        </div>
          {children}
      </body>
    </html>
  )
}