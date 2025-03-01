// EmailContext.js
import React, { createContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
