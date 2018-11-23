import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Header } from './Header';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Chatbot from './Chatbot';
import '../CSSFiles/App.css';


interface IState {
    input: string,
    currentPost: any,
    posts: any[],
    upvotes: number,
    downvotes: number
}

export default class Feed extends React.Component<{}, IState> {

    public static id: string;

    constructor(props: any) {
        super(props)
        this.state = {
            currentPost: { "id": 0, "userid": "0", "upvotes": "0", "downvotes": "0", "title": "There are currently no posts", "msg": "Create your own post to start a thread", "time": "0" },
            downvotes: 0,
            input: "",
            posts: [],
            upvotes: 0,
        }
        this.fetchPosts("")
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    public handleChange = (event: any) => {
        this.setState({
            input: event.target.value,
        })
    }

    public handleClick = (event: any) => {
        this.fetchPosts(this.state.input)
    }


    public render() {
        return (
            <div className="main">
                <Header />

                <Chatbot />

                <div className="posting">
                    <Input
                        placeholder="Enter words to search"
                        inputProps={{ 'aria-label': 'Description', }}
                        style={{ fontSize: '30px', borderWidth: 1, color: "black" }}
                        value={this.state.input}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="userBtn">
                    <Button
                        variant="extendedFab"
                        color="default"
                        onClick={this.handleClick}>
                        <div className="enter">Search</div>
                    </Button>
                </div>

                {this.createPosts()}
            </div>
        );
    }

    // GET the posts on the server
    private fetchPosts(search: string) {
        let url = "https://chitchatapi.azurewebsites.net/api/post"
        if (search !== "") {
            url += "/msg?=" + search
        }
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let currentPost = json[0]
                if (currentPost === undefined) {
                    currentPost = { "id": 0, "userid": "0", "upvotes": "0", "downvotes": "0", "title": "There are currently no posts", "msg": "Create your own post to start a thread", "time": "0" }
                }
                this.setState({
                    currentPost,
                    posts: json
                })
            });
    }

    private createPosts() {

        const htmlList = [];
        const postList = this.state.posts;

        if (postList[0] === undefined) {
            return;
        }

        for (let i = 0; i < postList.length; i++) {

            const post = postList[i];
            console.log(post)

            htmlList.push(
                <Grid className="Grid" xs={8}>
                    <Paper className="Paper">
                        <p className="Title">{post.title}</p>
                        {post.msg}<br />
                        <p className="Vote">
                            <IconButton aria-label="UpVote" onClick={this.incUpVote.bind(this, i)}>
                                <UpIcon />
                            </IconButton>
                            UpVotes: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.upvotes}<br />
                        </p>
                        <p className="Vote">
                            <IconButton aria-label="DownVote" onClick={this.incDownVote.bind(this, i)} >
                                <DownIcon />
                            </IconButton>
                            DownVotes:&nbsp;&nbsp;{post.downvotes}
                        </p>
                    </Paper>
                </Grid>
            );
            Feed.id = post.id;
        }

        return htmlList;
    }

    private incUpVote = (i: any) => {
        this.setState({ upvotes: this.state.upvotes + 1 });
        this.state.posts[i].upvotes++;
        this.updatePost(this.state.posts[i]);
    }

    private incDownVote = (i: any) => {
        this.setState({ downvotes: this.state.downvotes + 1 });
        this.state.posts[i].downvotes++;
        this.updatePost(this.state.posts[i]);
    }

    // PUT update the post
    private updatePost(post: any) {

        const url = "https://chitchatapi.azurewebsites.net/api/post/" + post.id

        fetch(url, {
            body: JSON.stringify(post),
            headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'PUT'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText + " " + url)
                }
            })
    }

}