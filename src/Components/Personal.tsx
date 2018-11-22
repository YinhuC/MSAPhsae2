import * as React from "react";
import { Header } from './Header';
import App from '../App';


interface IState {
    currentPost: any,
    posts: any[],
    upvotes: number,
    downvotes: number
}

class Personal extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentPost: { "id": 0, "userid": "0", "upvotes": "0", "downvotes": "0", "title": "There are currently no posts", "msg": "Create your own post to start a thread", "time": "0" },
            downvotes: 0,
            posts: [],
            upvotes: 0,
        }
        this.fetchPosts("")
        this.fetchPosts = this.fetchPosts.bind(this)
    }


    public render() {
        console.log(App.username)
        return (
            <div>
                <Header />
            </div>
        );
    }



    // GET the posts on the server
    private fetchPosts(search: string) {
        const url = "https://chitchatmsa.azurewebsites.net/api/post/userid?=" + App.username
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





}

export default Personal;