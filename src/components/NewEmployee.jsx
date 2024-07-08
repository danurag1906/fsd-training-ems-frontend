import React, { useState } from "react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    DOB: "",
    employeeId: "",
  });

  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/createEmployee`,
        {
          method: "POST",
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
        setFormData({
          name: "",
          department: "",
          DOB: "",
          employeeId: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };
  return (
    <>
      <Navbar />

      <form className="mt-20">
        <h1 className="text-2xl font-bold mb-6">Create New Employee</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Employee name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Software"
              required
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="DOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              DOB
            </label>
            <input
              type="date"
              id="DOB"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter DOB"
              required
              value={formData.DOB}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="employeeId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Employee ID"
              required
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
};

export default NewEmployee;
