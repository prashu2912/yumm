import React, { useEffect, useState } from 'react';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  const [firmName, setFirmName] = useState('');

  // Only access localStorage in useEffect to avoid SSR/early-access issues
  useEffect(() => {
    const name = localStorage.getItem('firmName');
    setFirmName(name || 'Unknown Firm');
  }, []);

  return (
    <div className="navSection">
      <div className="company">
        <div className="logoContainer">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>
      </div>

      <div className="userAuth">
  {!showLogOut ? (
    <>
      <button onClick={showLoginHandler} className="authBtn">Login</button>
      <button onClick={showRegisterHandler} className="authBtn">Register</button>
    </>
  ) : (
    <button onClick={logOutHandler} className="logout">Logout</button>
  )}
</div>

    </div>
  );
};

export default NavBar;