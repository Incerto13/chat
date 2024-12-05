import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa6';
import '../style.css';
import _ from 'lodash';

// Define the type for the props, particularly the setUser function
interface UserLoginProps {
  setUser: React.Dispatch<React.SetStateAction<string | null>>; // Function to update the user state
}

const UserLogin: React.FC<UserLoginProps> = ({ setUser }) => {
  // Define state for the user name with a type of string or undefined
  const [userName, setUserName] = useState<string>(''); 

  // Handle the user login logic
  const handleUser = () => {
    if (!userName) return;
    localStorage.setItem('user', userName);
    setUser(userName);
    localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
  };

  return (
    <div className="login_container">
      <div className="login_title">
        <FaReact className="login_icon" />
        <h1>Chat App</h1>
      </div>
      <div className="login_form">
        <input
          type="text"
          placeholder="Enter a Unique Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleUser}>Login</button>
      </div>
    </div>
  );
};

export default UserLogin;
