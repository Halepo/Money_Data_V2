import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material';
import React from 'react';

class CustomButton extends React.Component<ButtonProps> {
  public render() {
    return <Button {...this.props} />;
  }
}

export default CustomButton;
