import axios from "axios";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post("api/auth/signup", formData);
      const data = response.data;
      if (response.data.success) {
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <h3 className="">Your username</h3>
          <TextInput
            type="text"
            placeholder="Your username"
            id="username"
            onChange={handleChange}
          />
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
              "SignUp"
            )}
          </Button>
        </form>
        <div>
          <span>Have an Account?</span>
          <Link to="/sign-in">Sign In</Link>
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
