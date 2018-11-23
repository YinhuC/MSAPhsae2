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
import MediaStreamRecorder from 'msr';


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
        this.uploadAudio = this.uploadAudio.bind(this)
        this.searchTagByVoice = this.searchTagByVoice.bind(this)
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
                        id="search-tag-textbox"
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
                    <div style={{ margin: '20px' }} className="btn" onClick={this.searchTagByVoice}><i className="fa fa-microphone" /></div>
                </div>

                {this.createPosts()}
            </div>
        );
    }

    public searchTagByVoice() {
        const mediaConstraints = {
            audio: true,
        }

        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.uploadAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }
    }

    public uploadAudio(blob: any) {

        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': '1053010f56214753a8e7bfe1733d4636'
            },
            method: 'POST'
        }).then((response) => {
            console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        // posting audio
        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': '1053010f56214753a8e7bfe1733d4636'
            },
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            console.log(res)
            const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
            this.setState({
                input: textBox.value
            });
        }).catch((error) => {
            console.log("Error", error)
        });

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