import React from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './stateless/Footer';

type AppState = {
    currentPage: string
}

class App extends React.Component<any, AppState> {

    render() {
        return (
            <div>
                <NavigationBar/>
                <Footer/>
            </div>
        );
    }
}

export default App;
