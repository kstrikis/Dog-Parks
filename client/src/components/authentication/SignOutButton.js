import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault()
    try {
        const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const respBody = await response.json()
      setShouldRedirect(true)
      return { status: "ok" }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    location.href = location.href;
  }

  return (
    <button type="button" className="sign-in-button-top-nav top-text-custom" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
