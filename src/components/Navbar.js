import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div>
        <Link to={"/"} className="colorWhite">
          <h2>CuroQuiz</h2>
        </Link>
      </div>
      <div>
        <button className="btn btn-primry">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
