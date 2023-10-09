import { Link } from "react-router-dom";
import "./style.css";

export const Header = () => {
  return (
    <header className="container">
      <div className="header">
        <Link className="brand" to="/"> My Todo </Link>
        <div className="user">
          <img src="/todo/avatar.png" alt="John Doe" title="John Doe" />
          <span> John Doe </span>
        </div>
      </div>
    </header>
  );
};
