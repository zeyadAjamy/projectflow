import { Link } from "react-router-dom";
import "./style.css"
export const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Looks Like you lost your way! </p>
      <Link to="/"> Home </Link>
    </div>
  );
};
