import * as React from 'react';
import './CSSFiles/App.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Background from './Components/MainPage.png';
import Input from '@material-ui/core/Input';

const sectionStyle = {
  backgroundImage: "url(" + Background + ")",
  height: "938px",
  width: "100%"
};

interface IState {
  input: string,
}

class App extends React.Component<{}, IState> {

  public static username: string;

  constructor(props: any) {
    super(props)
    this.state = {
      input: "",
    }
  }

  public handleChange = (event: any) => {
    this.setState({
      input: event.target.value,
    })
  }

  public handleClick = (event: any) => {
    App.username = this.state.input;
  }

  public render() {
    console.log(this.state.input)
    return (
      <section style={sectionStyle}>
        <div className="spare">i</div>

        <p className="fieldText">Enter a username to begin</p>

        <div className="field">
          <Input
            placeholder="Username"
            inputProps={{ 'aria-label': 'Description', }}
            style={{ fontSize: '30px', borderWidth: 1, color: "white" }}
            onChange={this.handleChange}
          />
        </div>

        <Link to="/Feed">
          <div className="userBtn">
            <Button
              variant="extendedFab"
              color="default"
              onClick={this.handleClick}>
              <div className="enter">ENTER</div>
            </Button>
          </div>
        </Link>

      </section>
    );
  }


}

export default App;
