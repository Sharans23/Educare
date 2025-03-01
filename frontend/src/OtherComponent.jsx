// OtherComponent.js
import React, { useContext } from 'react';
import EmailContext from './EmailContext';
import { Button } from '@mui/material';

function OtherComponent() {
  const { email } = useContext(EmailContext);
  const handleClick = () => {
    console.log(email)
  }
  return <div><Button onClick={handleClick}>hi</Button></div>;
}

export default OtherComponent;
