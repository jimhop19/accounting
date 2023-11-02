/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_FIREBASE_CONFIG:"a",
        firebaseConfig : {
            apiKey: "AIzaSyC-zzmKJYQDZKZ_u1-SI6k-i93ikkmSdic",
            authDomain: "accounting-76df1.firebaseapp.com",
            projectId: "accounting-76df1",
            storageBucket: "accounting-76df1.appspot.com",
            messagingSenderId: "525597316968",
            appId: "1:525597316968:web:1aa11d019dc361d9e628dd",
            measurementId: "G-HM9752N8D6"
          }
    }
}

module.exports = nextConfig
