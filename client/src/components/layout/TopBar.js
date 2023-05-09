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
      <SignOutButton />
  ];

  let authenticatedUserName = [
    <>
    </>
  ]
  if(user) {
    authenticatedUserName = [
      <span key="userName" className="sign-in-button-top-nav">
        {user.userName}
      </span>
    ]
  }

  return (
    <div className="top-bar top-text-custom">
      <div className="top-bar-left">
        <ul className="menu top-text-custom">
          <li>
            <Link to="/home" className="top-text-custom">Home</Link>
          </li>
          <li>
            <Link to="/parks" className="top-text-custom">Dog Parks</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu top-text-custom">
          {authenticatedUserName}{user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;