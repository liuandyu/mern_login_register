import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Quote from './pages/Quote';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/quote" exact component={Quote} />
            </BrowserRouter>
        </div>
    )
}

export default App;