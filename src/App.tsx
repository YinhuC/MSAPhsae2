import * as React from 'react';
import './CSSFiles/App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import Feed from './Components/Feed';
import Personal from './Components/Personal';

class App extends React.Component {

  public render() {

    return (
      <BrowserRouter>
        <div>
          <Header />
          <main>
            <Route exact={true} path="/" component={App} />
            <Route path="/FirstComponent" component={Feed} />
            <Route path="/SecondComponent" component={Personal} />
            <Redirect from='*' to='/' />
          </main>
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
