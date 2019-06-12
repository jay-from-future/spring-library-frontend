import React from 'react';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import WelcomePage from '../stateless/WelcomePage';
import GenreTable from './GenreTable';
import AuthorTable from './AuthorTable';
import BookTable from './BookTable';

type MenuItemProps = {
    title: string,
    href: string
}

type NavigationBarState = {
    pages: Array<MenuItemProps>;
}

class NavigationBar extends React.Component<any, NavigationBarState> {

    constructor(props: any) {
        super(props);

        this.state = {
            pages: [
                {
                    title: 'Main',
                    href: '/'
                },
                {
                    title: 'Books',
                    href: '/books'
                },
                {
                    title: 'Authors',
                    href: '/authors'
                },
                {
                    title: 'Genres',
                    href: '/genres'
                }
            ]
        };
    }

    render() {
        let menuItems = this.state.pages.map(p => {
            return (
                <li key={p.href} className='nav-item'>
                    <NavLink exact={true} to={p.href} className='nav-link inactive'
                             activeClassName='nav-link active' title={p.title}>{p.title}</NavLink>
                </li>
            );
        });

        return (
            <main role='main' className='flex-shrink-0'>
                <div className='container'>
                    <ul className='nav nav-pills nav-fill'>
                        <Router>
                            {menuItems}
                            <Route exact={true} path='/' component={WelcomePage}/>
                            <Route path='/books' component={BookTable}/>
                            <Route path='/authors' component={AuthorTable}/>
                            <Route path='/genres' component={GenreTable}/>
                        </Router>
                    </ul>
                </div>
            </main>
        );
    }
}

export default NavigationBar;