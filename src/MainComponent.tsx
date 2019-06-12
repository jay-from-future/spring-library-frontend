import React from 'react';
import WelcomePage from './WelcomePage';
import BookTable from './BookTable';
import AuthorTable from './AuthorTable';
import GenreTable from './GenreTable';

type MainComponentProps = {
    currentPage: string
}

const URL = 'https://spring-library-app.herokuapp.com/';

class MainComponent extends React.Component<MainComponentProps> {

    render() {
        const currentPage = this.props.currentPage;
        let currentComponent = <WelcomePage/>;
        switch (currentPage) {
            case 'Main':
                currentComponent = <WelcomePage/>;
                break;
            case 'Books':
                currentComponent =
                    <BookTable booksLink={URL + '/books'} authorsLink={URL + '/authors'} genresLink={URL + '/genres'}/>;
                break;
            case 'Authors':
                currentComponent = <AuthorTable authorsLink={URL + '/authors'}/>;
                break;
            case 'Genres':
                currentComponent = <GenreTable genresLink={URL + '/genres'}/>;
                break;
            default:
                currentComponent = <WelcomePage/>;
        }

        return (
            <main role='main' className='flex-shrink-0'>
                {currentComponent}
            </main>
        );
    }
}

export default MainComponent;