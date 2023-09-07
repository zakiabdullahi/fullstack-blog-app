/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Context";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/get-user-profile");

        console.log("app", data);
        setCurrentUser(data);
      } catch (err) {
        if (err.response.status === 403) {
          navigate("/login");
        }
        console.log(err);
        // toast.error(err.message);
      }
    };

    fetchUserProfile();
  }, [setCurrentUser]);
  return (
    <div style={{ maxWidth: "1112px", marginInline: "auto" }}>
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
