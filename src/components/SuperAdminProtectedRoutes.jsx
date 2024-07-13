import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const SuperAdminProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      // setIsLoading(true);
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
        setUser(data.employeeDetails);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!isLoading) {
    if (user != null) {
      return <Outlet />;
    } else {
      return <Navigate to={"/signin"} />;
    }
  }
};

export default SuperAdminProtectedRoutes;
