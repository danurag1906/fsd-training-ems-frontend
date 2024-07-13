import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SuperAdminNavbar = () => {
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/signout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        toast.success(data.message);
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-black border-gray-200 dark:bg-gray-900 w-full fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/superadmin-dashboard"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            EMS Super Admin
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col  border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <Link
                to={"/superadmin-dashboard"}
                className="block  text-white hover:underline"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/superadmin-dashboard/all-employees"}
                className="block  text-white hover:underline"
                aria-current="page"
              >
                All Employees
              </Link>
            </li>

            <li
              onClick={handleSignout}
              className="block  text-white hover:underline"
            >
              Signout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
