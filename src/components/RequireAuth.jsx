import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isSignedIn = !!localStorage.getItem("token");
  if (!isSignedIn) return <Navigate to="/" />;
  return children;
};

export default RequireAuth;
