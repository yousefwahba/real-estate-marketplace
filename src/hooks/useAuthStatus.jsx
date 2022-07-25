import { useEffect,useState } from "react"
import { getAuth,onAuthStateChanged } from "firebase/auth"
const useAuthStatus = () => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [chekingStatus,setCheckingStatus] = useState(true)


    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    },[])

  return {loggedIn,chekingStatus}
}

export default useAuthStatus