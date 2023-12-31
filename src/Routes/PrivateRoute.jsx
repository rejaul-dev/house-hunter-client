import jwt_decode from "jwt-decode";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  // Function to check if the token is valid
  const isValidToken = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.role === "house owner";
    } catch (error) {
      console.log("Error decoding token", error);
      return false;
    }
  };

  const isAuthenticated = token && isValidToken(token);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
