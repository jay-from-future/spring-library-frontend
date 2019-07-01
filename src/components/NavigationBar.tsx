import React from 'react';
import {NavLink} from 'react-router-dom';

type MenuItemProps = {
    title: string,
    href: string
    visible: boolean
}

type NavigationBarState = {
    pages: Array<MenuItemProps>;
}

class NavigationBar extends React.Component<any, NavigationBarState> {

    constructor(props: any) {
        super(props);

        // only main and login pages are visible by default
        // todo show only links that are available for the user (depends on access rights)
        this.state = {
            pages: [
                {
                    title: 'Main',
                    href: '/',
                    visible: true
                },
                {
                    title: 'Books',
                    href: '/books',
                    visible: true
                },
                {
                    title: 'Authors',
                    href: '/authors',
                    visible: true
                },
                {
                    title: 'Genres',
                    href: '/genres',
                    visible: true
                },
                {
                    title: 'Log in',
                    href: '/login',
                    visible: true
                }
            ]
        };
    }

    render() {
        const {pages} = this.state;

        let menuItems = pages.filter(p => p.visible).map(p => {
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