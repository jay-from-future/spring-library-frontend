import React from "react";
import WelcomePage from "./WelcomePage";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import GenreList from "./GenreList";

type MainComponentProps = {
    currentPage: string
}

class MainComponent extends React.Component<MainComponentProps> {

    render() {

        const currentPage = this.props.currentPage;
        let currentComponent = <WelcomePage/>;
        switch (currentPage) {
            case 'Main':
                currentComponent = <WelcomePage/>;
                break;
            case 'Books':
                currentComponent = <BookList/>;
                break;
            case 'Authors':
                currentComponent = <AuthorList/>;
                break;
            case 'Genres':
                currentComponent = <GenreList/>;
                break;
            default:
                currentComponent = <WelcomePage/>;
        }

        return (
            <main role="main" className="flex-shrink-0">
                {currentComponent}
            </main>
        );
    }
}

export default MainComponent;