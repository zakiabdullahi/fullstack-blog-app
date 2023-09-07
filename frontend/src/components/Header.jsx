/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useAuth } from "../Context";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const handleClick = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/logout");
      toast.success(data);
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Logo</h1>
        <ul>
          {currentUser ? (
            <Link to="/create-post">Create Post</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </ul>
        {currentUser && (
          <div>
            <span>welcome {currentUser.username} </span>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
