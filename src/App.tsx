import * as React from 'react';
import './App.css';
import { Header } from './Components/Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

class App extends React.Component {



  public render() {

    const temp: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos modi odio, sapiente consequuntur" +
      "pariatur quo, illumww eius, et www sunt assumenda dicta non reiciendis exercitationem molestiae?" +
      "A totam magnam libero? "

    return (
      <div>
        <Header />

        <Grid className="Grid" xs={8}>
          <Paper className="Paper">
            {temp}<br />
            <p className="Vote">
            <IconButton aria-label="UpVote">
              <UpIcon />
            </IconButton>
            UpVotes: <br />
            </p>
            <p className="Vote">
            <IconButton aria-label="DownVote">
              <DownIcon />
            </IconButton>
            DownVotes:
            </p>
          </Paper>
        </Grid>

        <Grid className="Grid" xs={8}>
          <Paper className="Paper">
            {temp}<br />
            <p className="Vote">
            <IconButton aria-label="UpVote">
              <UpIcon />
            </IconButton>
            UpVotes: <br />
            </p>
            <p className="Vote">
            <IconButton aria-label="DownVote">
              <DownIcon />
            </IconButton>
            DownVotes:
            </p>
          </Paper>
        </Grid>

        <Grid className="Grid" xs={8}>
          <Paper className="Paper">
            {temp}<br />
            <p className="Vote">
            <IconButton aria-label="UpVote">
              <UpIcon />
            </IconButton>
            UpVotes: <br />
            </p>
            <p className="Vote">
            <IconButton aria-label="DownVote">
              <DownIcon />
            </IconButton>
            DownVotes:
            </p>
          </Paper>
        </Grid>


      </div >
    );

  }
}

export default App;
