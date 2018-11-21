import * as React from 'react';
import logo from './icon2.png';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const Header: React.StatelessComponent<{}> = () => {
  return (

    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          <img src={logo} className="icon" />
        </Typography>

        <Typography color="inherit">

          <Link to="/">
            <Button
              variant="flat"
              color="primary">
              Main
            </Button>
          </Link>

          <Link to="Feed">
            <Button
              variant="flat"
              color="primary">
              Feed
            </Button>
          </Link>

          <Link to="Personal">
            <Button
              variant="flat"
              color="primary">
              Personal
            </Button>
          </Link>


        </Typography>

      </Toolbar>
    </AppBar>

  );
}