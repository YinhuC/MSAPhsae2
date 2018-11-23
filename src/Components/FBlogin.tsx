import * as React from 'react';
import FacebookLogin from "react-facebook-login";

interface IState {
    isLoggedIn: boolean,
    name: string,
}

class Facebook extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            isLoggedIn: false,
            name: "",
        }
    }

    public responseFacebook = (response: any) => {
        this.setState({
            isLoggedIn: true,
            name: response.name,
        });
    };

    public render() {
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <div
                        style={{
                            background: "#f4f4f4",
                            margin: "auto",
                            padding: "20px",
                            width: "400px",
                        }}
                    >
                        <h2>Welcome {this.state.name}</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <FacebookLogin
                        appId="273517053351336"
                        autoLoad={false}
                        callback={this.responseFacebook}
                    />
                </div>
            );
        }
    }
}

export default Facebook