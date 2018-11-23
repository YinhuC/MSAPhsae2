import * as React from "react";
import { Header } from './Header';
import App from '../App';
import Feed from './Feed';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import '../CSSFiles/App.css';


interface IState {
    edit: any,
    input: string,
    input2: string,
    currentPost: any,
    posts: any[],
    upvotes: number,
    downvotes: number,
    newpost: any,
    open: boolean
}

class Personal extends React.Component<{}, IState> {

    public static post: string;
    public static title: string;

    constructor(props: any) {
        super(props);
        this.state = {
            currentPost: { "id": 0, "userid": "0", "upvotes": 0, "downvotes": 0, "title": "There are currently no posts", "msg": "Create your own post to start a thread", "time": "0" },
            downvotes: 0,
            edit: { "id": "", "userid": "0", "upvotes": 0, "downvotes": 0, "title": "", "msg": "", "time": "To Be Implemented" },
            input: "",
            input2: "",
            newpost: { "id": "", "userid": "0", "upvotes": 0, "downvotes": 0, "title": "", "msg": "", "time": "To Be Implemented" },
            open: false,
            posts: [],
            upvotes: 0,
        }
        this.fetchPosts()
        this.fetchPosts = this.fetchPosts.bind(this)
    }


    public handleChange = (event: any) => {
        this.setState({
            input: event.target.value,
        })
    }


    public handleClick = (event: any) => {
        Personal.post = this.state.input;
        Personal.title = this.state.input2;
        this.setState({
            input: "",
            input2: "",
        })
        this.state.newpost.id = Feed.id + 1;
        this.state.newpost.userid = App.username;
        this.state.newpost.title = Personal.title;
        this.state.newpost.msg = Personal.post;
        this.uploadPost(this.state.newpost);
    }

    public handleChange2 = (event: any) => {
        this.setState({
            input2: event.target.value,
        })
    }

    public render() {

        const { open } = this.state;

        return (
            <div>
                <Header />

                <div className="posting">
                    <Input
                        placeholder="Enter title for new post"
                        inputProps={{ 'aria-label': 'Description', }}
                        style={{ fontSize: '30px', borderWidth: 1, color: "black" }}
                        value={this.state.input2}
                        onChange={this.handleChange2}
                    />
                </div>

                <div className="posting">
                    <Input
                        placeholder="Enter text for a new post"
                        inputProps={{ 'aria-label': 'Description', }}
                        style={{ fontSize: '30px', borderWidth: 1, color: "black" }}
                        value={this.state.input}
                        onChange={this.handleChange}
                    />
                </div>

                <Link to="/Feed">
                    <div className="userBtn">
                        <Button
                            variant="extendedFab"
                            color="default"
                            onClick={this.handleClick}>
                            <div className="enter">SUMBIT</div>
                        </Button>
                    </div>
                </Link>
                {this.createPosts()}

                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="txtbox">
                            <label>Title of Post:</label>
                            <input type="text" id="posttitle" placeholder="Enter New Title" />
                        </div>
                        <div className="txtbox">
                            <label>Post Details:</label>
                            <input type="text" id="postmsg" placeholder="Enter New Post" />
                        </div>
                        <Link to="/Feed">
                            <button type="button" className="btn" onClick={this.updatePost.bind(this, this.state.edit)}>Save</button>
                        </Link>
                    </form>
                </Modal>
            </div>
        );
    }

    // GET the posts on the server
    private fetchPosts() {
        const url = "https://chitchatmsa.azurewebsites.net/api/post/userid?=" + App.username
        if (App.username === "") {
            return
        }
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let currentPost = json[0]
                if (currentPost === undefined) {
                    currentPost = { "id": 0, "userid": "0", "upvotes": 0, "downvotes": 0, "title": "There are currently no posts", "msg": "Create your own post to start a thread", "time": "0" }
                }
                this.setState({
                    currentPost,
                    posts: json,
                })
            });
    }


    private createPosts() {

        const htmlList = [];
        const postList = this.state.posts;

        if (postList[0] === undefined) {
            return;
        }

        for (const post of this.state.posts) {
            htmlList.push(
                <Grid className="Grid" xs={8}>
                    <Paper className="Paper">
                        <p className="Title">
                            {post.title}
                            <IconButton
                                aria-label="Edit" onClick={this.onOpenModal.bind(this, post)} >
                                <Edit style={{ fontSize: '30px' }} />
                            </IconButton>
                            <Link to="/Feed">
                                <IconButton
                                    aria-label="Delete" onClick={this.deleteMeme.bind(this, post)} >
                                    <Delete style={{ fontSize: '30px' }} />
                                </IconButton>
                            </Link>
                        </p>
                        {post.msg}<br />
                        <p className="Vote">
                            <IconButton aria-label="UpVote" onClick={this.incUpVote}>
                                <UpIcon />
                            </IconButton>
                            UpVotes: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.upvotes}<br />
                        </p>
                        <p className="Vote">
                            <IconButton aria-label="DownVote" onClick={this.incDownVote} >
                                <DownIcon />
                            </IconButton>
                            DownVotes:&nbsp;&nbsp;{this.state.downvotes}
                        </p>
                    </Paper>
                </Grid>
            );
            post.upvotes = this.state.upvotes;
            post.downvotes = this.state.downvotes;
        }
        return htmlList;
    }

    // Modal Open
    private onOpenModal = (post: any) => {
        this.setState({
            edit: post,
            open: true
        });
    };

    // Modal Close
    private onCloseModal = () => {
        this.setState({ open: false });
    };

    private incUpVote = () => {
        this.setState({ upvotes: this.state.upvotes + 1 });
    }
    private incDownVote = () => {
        this.setState({ downvotes: this.state.downvotes + 1 });
    }


    // POST the post to the server
    private uploadPost(post: any) {

        const url = "https://chitchatmsa.azurewebsites.net/api/post"

        if (post.id === null || post.userid === null || post.upvotes === null
            || post.downvotes === null || post.title === null || post.msg === null || post.time === null) {
            return;
        }
        console.log(post)
        fetch(url, {
            body: JSON.stringify(post),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
            })
    }

    // DELETE selected post
    private deleteMeme(post: any) {
        const url = "https://chitchatmsa.azurewebsites.net/api/post/" + post.id;

        fetch(url, {
            method: 'DELETE'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error Response
                    alert(response.statusText)
                } else {
                    location.reload()
                }
            })
    }

    // PUT update the post
    private updatePost(post: any) {

        const titleInput = document.getElementById("posttitle") as HTMLInputElement
        const msgInput = document.getElementById("postmsg") as HTMLInputElement

        if (titleInput === null || msgInput === null) {
            return;
        }

        post.title = titleInput.value
        post.msg = msgInput.value

        const url = "https://chitchatmsa.azurewebsites.net/api/post/" + post.id

        fetch(url, {
            body: JSON.stringify(post),
            headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'PUT'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText + " " + url)
                } else {
                    location.reload()
                }
            })
    }


}

export default Personal;