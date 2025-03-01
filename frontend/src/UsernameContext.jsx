import React, { createContext, useState, useEffect } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  
  useEffect(() => {
    console.log('Username changed:', username);
  }, [username]);

  return (
    <UsernameContext.Provider value={{username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContext;
