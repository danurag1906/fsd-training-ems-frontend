import React, { useState, useEffect } from "react";
import SuperAdminNavbar from "../../components/superadmin/SuperAdminNavbar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";

const SuperAdminAllEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [dept, setDept] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/deleteEmployee/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "superadmin" }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        // console.log(dept, "dept");
        fetchAllEmployees(dept);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/fetchAllEmployees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "superadmin" }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
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
          body: JSON.stringify({ role: "superadmin" }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        setDept(data.employeeDetails.department);
        // console.log(dept, "dept");

        fetchAllEmployees();
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
      <SuperAdminNavbar />
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
                      to={`/superadmin-dashboard/edit-employee/${employee._id}`}
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

export default SuperAdminAllEmployees;
