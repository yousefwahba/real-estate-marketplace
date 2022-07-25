import { useNavigate, useLocation } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

const Oauth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      //add google auth provider
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check if user already exists
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      //if user does not exist, create a new user
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("could not sign in with google");
    }
  };
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === "/sign-up" ? "Up" : "In"}</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img src={googleIcon} alt='google icon' className='socialIconImg' />
      </button>
    </div>
  );
};

export default Oauth;
