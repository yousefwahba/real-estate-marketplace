import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { async } from "@firebase/util";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(formData);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const copyFormData = { ...formData };
      delete copyFormData.password;
      copyFormData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), copyFormData);
      navigate("/");
    } catch (error) {
      toast.error(error.code);
      console.log(error.code);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header className='mb-6'>
          <p className='pageHeader'>welcome </p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? "text" : "password"}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() =>
                showPassword ? setShowPassword(false) : setShowPassword(true)
              }
            />
          </div>
          <Link to='/forget-password' className='forgotPasswordLink'>
            forget password{" "}
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'> Sign Up</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* google outh */}
        <Oauth />
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
