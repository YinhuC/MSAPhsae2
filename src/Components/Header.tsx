import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import logo from './icon2.png';

export const Header: React.StatelessComponent<{}> = () => {
  return (

    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
            <img src={logo} className="icon" />
        </Typography>
        
      </Toolbar>
    </AppBar>

  );
}