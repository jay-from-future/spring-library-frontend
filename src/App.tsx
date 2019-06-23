import React from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './stateless/Footer';
import {Router, Route, Switch} from 'react-router-dom';
import WelcomePage from "./stateless/WelcomePage";
import BookTable from "./components/BookTable";
import AuthorTable from "./components/AuthorTable";
import GenreTable from "./components/GenreTable";
import {PrivateRoute} from './stateless/PrivateRoute';
import {LoginPage} from "./components/LoginPage";
import {getHistory} from './service/history';

type AppState = {
    currentPage: string
}

class App extends React.Component<any, AppState> {

    render() {
        return (
            <Router history={getHistory()}>
                <NavigationBar/>
                <Switch>
                    <Route exact={true} path='/' component={WelcomePage}/>
                    <PrivateRoute path='/books' component={BookTable}/>
                    <PrivateRoute path='/authors' component={AuthorTable}/>
                    <PrivateRoute path='/genres' component={GenreTable}/>
                    <Route path='/login' component={LoginPage}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;
