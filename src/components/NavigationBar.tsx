import React from 'react';
import {NavLink} from 'react-router-dom';

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
            <div className='container'>
                <ul className='nav nav-pills nav-fill'>
                    {menuItems}
                </ul>
            </div>
        );
    }
}

export default NavigationBar;