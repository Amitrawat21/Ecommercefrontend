import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validation from "../Validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useNavigate();
  const [state, setState] = useState("Login");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (isSubmitted) {
      // Real-time validation only if the form has been submitted
      const newFormData = {
        ...formData,
        [name]: value,
      };
      const validationErrors = validation(newFormData, state === "Sign Up");
      setErrors(validationErrors);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://ecommercebackend-11d1.onrender.com/login",
        formData
      );
      console.log(response, "jjj")
      if (response.data.success) {
        toast.success("Login successful");
        localStorage.setItem("auth", response.data.token);
      
        setTimeout(()=>{
          window.location.replace("/");

        } ,3000)
      
      }
      else if(response.data.status  == 402){
        toast.error("user email not found")

      }

      else if(response.data.status == 401){
        toast.error("password  is incorrect ")

      }
   
    } catch (error) {
      toast.error("Login error:", error);
    }
  };

  const signup = async () => {
    try {
      const response = await axios.post(
        "https://ecommercebackend-11d1.onrender.com/register",
        formData
      );
      if(response.data.success === false){

        toast.error("email already exits")
      }
      else if (response.data.success) {
        toast.success("Sign up successful");
        localStorage.setItem("auth", response.data.token);
        setTimeout(()=>{
          window.location.replace("/");

        } , 3000)
  
      }

     
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(formData, state === "Sign Up");
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (state === "Login") {
        login();
      } else {
        signup();
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form className="loginsignup-fields" onSubmit={handleValidation}>
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Your name"
              />
              {isSubmitted && errors.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
              )}
            </>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email address"
          />
          {isSubmitted && errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
          )}
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
          {isSubmitted && errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
          <button type="submit">Continue</button>
        </form>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
                setFormData({ ...formData, name: "" });
                setErrors({});
                setIsSubmitted(false);
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?
            <span
              onClick={() => {
                setState("Sign Up");
                setErrors({});
                setIsSubmitted(false);
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the Terms of Use & Privacy Policy</p>
        </div>
      </div>
        <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;
