import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [allEmployees, setAllEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  // Function to format the date to YYYY-MM-DD
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/fetchAllEmployees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        setAllEmployees(data.employees);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/deleteEmployee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        fetchAllEmployees();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <div className="text-center">Loading...</div>}
      {/* Table */}
      <div className="relative overflow-x-auto mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                IsActive
              </th>
              <th scope="col" className="px-6 py-3">
                EmploymentType
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.length > 0 ? (
              allEmployees.map((employee) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={employee._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {employee.employeeid}
                  </th>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{formatDate(employee.dob)}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">
                    {employee.isactive ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">{employee.employementtype}</td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/edit-employee/${employee._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleDelete(employee._id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
