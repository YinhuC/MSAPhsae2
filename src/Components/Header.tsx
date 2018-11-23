import * as React from 'react';
import logo from './icon2.png';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../CSSFiles/App.css';
import { FacebookShareButton, FacebookIcon } from 'react-share';

export const Header: React.StatelessComponent<{}> = () => {

  const urlll = 'https://www.facebook.com/sharer/sharer.php?u=https%3A//chitchatmsa.azurewebsites.net/';

  return (

    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          <img src={logo} className="icon" />
        </Typography>

        <Link to="Feed" className="headerbtn">
          <Button
            variant="text"
            color="inherit">
            Feed
            </Button>
        </Link>

        <Link to="Personal">
          <Button
            variant="text"
            color="inherit">
            Profile
            </Button>
        </Link>
        <div className="fbBtn">
          <FacebookShareButton
            url={urlll}
            quote={"Join the discussion on ChitChat"}>
            <FacebookIcon size={28} round={true} />
          </FacebookShareButton>
        </div>
        <Link to="/" className="logout">
          <Button
            variant="text"
            color="inherit">
            Logout
            </Button>
        </Link>

      </Toolbar>
    </AppBar>

  );
}