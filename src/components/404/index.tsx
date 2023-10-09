import { Link } from "react-router-dom"; // Import the Link component from react-router-dom.
import "./style.css"; // Import the CSS file for styling.

export const ErrorPage = () => {
  return (
    <div className="error-page">
      {/* Create a div with the "error-page" class for styling. */}
      <h1>Oops!</h1> {/* Display the error message "Oops!" in an h1 element. */}
      <p>Looks Like you lost your way! </p>
      {/* Display a custom error message in a paragraph element. */}
      <Link to="/"> Home </Link> {/* Create a link to the home page using the Link component. */}
    </div>
  );
};
