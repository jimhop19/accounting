import "./globals.css"
import { Tilt_Prism } from "next/font/google"
const tiltPrism = Tilt_Prism({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">      
      <body>
        <h1 className={tiltPrism.className}>Accounting</h1>        
        {children}
      </body>
    </html>
  )
}