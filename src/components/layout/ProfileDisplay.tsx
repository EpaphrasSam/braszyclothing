import React, { useState } from 'react';

const ProfileDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Profile Details</h2>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDisplay;
