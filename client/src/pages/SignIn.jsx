import axios from "axios";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";



export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart())
      const response = await axios.post("api/auth/signin", formData);
      if(response.data.success == false){
        dispatch(signInFailure(response.data.message))
        return
      }

        dispatch(signInSuccess(response.data))
        navigate("/");
      
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong.";
       dispatch(signInFailure(msg))
      }

  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 max-w-md mx-auto">
        <form onSubmit={handleSubmit}>

          <h3 className="">Your email</h3>
          <TextInput
            type="email"
            placeholder="Your email"
            id="email"
            onChange={handleChange}
          />
          <h3 className="">Your password</h3>
          <TextInput
            type="password"
            placeholder="Your password"
            id="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="text-black border-2 mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div>
          <span>Don't have an account?</span>
          <Link to="/sign-up">Sign Up</Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
