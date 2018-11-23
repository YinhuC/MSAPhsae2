import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Header } from './Header';

interface IState {
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
            posts: [],
            upvotes: 0,
        }
        this.fetchPosts("")
        this.fetchPosts = this.fetchPosts.bind(this)
        this.searchMsg = this.searchMsg.bind(this);
    }


    public render() {
        return (
            <div>
                <Header />
                {this.createPosts()}
            </div>
        );
    }

    // GET the posts on the server
    private fetchPosts(search: string) {
        let url = "https://chitchatmsa.azurewebsites.net/api/post"
        if (search !== "") {
            url += "/tag?=" + search
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

    // Search meme by tag
    private searchMsg() {
        const textBox = document.getElementById("search-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        // const tag = textBox.value
        // this.state.searchMsg(tag)
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
                        <p className="Title">{post.title}</p>
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
            Feed.id = post.id;
        }

        return htmlList;
    }

    private incUpVote = () => {
        this.setState({ upvotes: this.state.upvotes + 1 });
    }
    private incDownVote = () => {
        this.setState({ downvotes: this.state.downvotes + 1 });
    }


}