import React, { useEffect, useState } from "react";
import NormalNavbar from "../../components/normal/NormalNavbar";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";

const NormalAllEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      //   setProfileLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "normal" }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        // console.log(data.employeeDetails);
        // setUser(data.employeeDetails);
        // console.log(user);
        fetchAllEmployees(data.employeeDetails.department);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchAllEmployees = async (dept) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/employee/fetchAllEmployees?department=${dept}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: "normal" }),
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <NormalNavbar />
      <div className="mt-16 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mx-auto w-full">All Employees</h1>
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
      </div>
    </>
  );
};

export default NormalAllEmployees;
