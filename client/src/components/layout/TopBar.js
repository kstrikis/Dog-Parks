import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="sign-in-button-top-nav top-text-custom">
        Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="sign-up-button-top-nav top-text-custom">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar top-text-custom">
      <div className="top-bar-left">
        <ul className="menu top-text-custom">
          <li className="menu-text top-text-custom">App</li>
          <li>
            <Link to="/" className="top-text-custom">
              Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu top-text-custom">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
