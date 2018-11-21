import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

export default class Feed extends React.Component<{}> {

    public render() {

        const temp: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos modi odio, sapiente consequuntur" +
            "pariatur quo, illumww eius, et www sunt assumenda dicta non reiciendis exercitationem molestiae?" +
            "A totam magnam libero? "

        return (
            <div>

                <Grid className="Grid" xs={8}>
                    <Paper className="Paper">
                        <p className="Title">Title</p>
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
            </div>
        );
    }
}