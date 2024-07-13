import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [signupLoader, setSignupLoader] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const passwordValidationError = validatePassword(formData.password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }

      setSignupLoader(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSignupLoader(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-2">Signup</h1>

      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Harvey Spector"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="flex justify-center items-center my-2">
          <p>Already have an account?</p>
          <Link className="hover:underline" to={"/signin"}>
            Sign in
          </Link>
        </div>

        <button
          onClick={handleSignup}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {signupLoader ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
