import React from 'react';
import NavigationBar from './NavigationBar';
import MainComponent from './MainComponent';
import Footer from './Footer';

type AppState = {
    currentPage: string
}

class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 'Main'
        };

        this.onPageChange = this.onPageChange.bind(this);
    };

    onPageChange(currentPage: string) {
        console.log('+App.onPageChange');
        this.setState({currentPage: currentPage});
    }

    render() {

        let currentPage = this.state.currentPage;

        return (
            <div>
                <NavigationBar currentPage={currentPage} onPageChange={this.onPageChange}/>
                <MainComponent currentPage={currentPage}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
