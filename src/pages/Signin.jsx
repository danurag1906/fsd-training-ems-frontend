import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [signinLoader, setSigninLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setSigninLoader(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/signin`,
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
        if (data.employee.role === "normal") {
          //   console.log(data.employee.role);
          navigate("/normal-dashboard");
        }
        if (data.employee.role === "admin") {
          //   console.log(data.employee.role);
          navigate("/admin-dashboard");
        }
        if (data.employee.role === "superadmin") {
          //   console.log(data.employee.role);
          navigate("/superadmin-dashboard");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSigninLoader(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-2">Signin</h1>

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
        </div>
        <div className="flex justify-center items-center my-2">
          <p>{"Don't"} have an account?</p>
          <Link className="hover:underline" to={"/signup"}>
            Sign up
          </Link>
        </div>

        <button
          onClick={handleSignin}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {signinLoader ? "Loading..." : "Signin"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
