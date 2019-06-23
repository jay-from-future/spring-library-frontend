import React from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './stateless/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WelcomePage from "./stateless/WelcomePage";
import BookTable from "./components/BookTable";
import AuthorTable from "./components/AuthorTable";
import GenreTable from "./components/GenreTable";

type AppState = {
    currentPage: string
}

class App extends React.Component<any, AppState> {

    render() {
        return (
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route exact={true} path='/' component={WelcomePage}/>
                    <Route path='/books' component={BookTable}/>
                    <Route path='/authors' component={AuthorTable}/>
                    <Route path='/genres' component={GenreTable}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;
