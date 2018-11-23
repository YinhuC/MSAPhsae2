import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import Feed from './Components/Feed';
import Personal from './Components/Personal';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/Feed" component={Feed} />
                    <Route path="/Personal" component={Personal} />
                </main>
            </div>
        </BrowserRouter>

    );
}