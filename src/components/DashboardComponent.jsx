import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";

const DashboardComponent = ({ userRole, NavbarComponent }) => {
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/updateUserProfile/${
          formData._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ formData: formData, role: userRole }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        toast.success(data.message);
        setUpdating(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: userRole }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        setFormData(data.employeeDetails);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="mt-16 flex justify-center items-center">
        <form className="mt-20">
          <h1 className="text-2xl font-bold mb-6">Employee Profile Settings</h1>
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
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DOB
              </label>
              <input
                type="date"
                id="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter DOB"
                required
                value={formatDate(formData.dob)}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default DashboardComponent;
