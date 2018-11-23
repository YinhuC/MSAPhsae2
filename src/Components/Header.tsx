import * as React from 'react';
import logo from './icon2.png';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../CSSFiles/App.css';

export const Header: React.StatelessComponent<{}> = () => {
  return (

    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          <img src={logo} className="icon" />
        </Typography>

        <Typography color="inherit">

          <Link to="Feed">
            <Button
              variant="text"
              color="primary">
              Feed
            </Button>
          </Link>

          <Link to="Personal">
            <Button
              variant="text"
              color="primary">
              Profile
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="text"
              color="primary">
              Logout
            </Button>
          </Link>


        </Typography>

      </Toolbar>
    </AppBar>

  );
}