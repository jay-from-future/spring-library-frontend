import React from 'react';

type NavigationBarProps = {
    currentPage: string,
    onPageChange: {(currentPage: string): void};
}

type MenuItemProps = {
    title: string,
    href: string
    active: boolean,
    onClick?: { (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void }
}

type NavigationBarState = {
    pages: Array<MenuItemProps>;
}


class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {

    constructor(props: Readonly<NavigationBarProps>) {
        super(props);

        this.state = {
            pages: [
                {
                    title: 'Main',
                    href: '/index.html',
                    active: false
                },
                {
                    title: 'Books',
                    href: '/books',
                    active: false
                },
                {
                    title: 'Authors',
                    href: '/authors',
                    active: false
                },
                {
                    title: 'Genres',
                    href: '/genres',
                    active: false
                }
            ]
        };

        const currentPage = this.props.currentPage;
        const find = this.state.pages.find(p => p.title === currentPage);
        if (find) {
            find.active = true;
        } else {
            console.error('Cannot find selected page in menu: ' + currentPage)
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        console.log('+NavigationBar.handleClick');

        const selectedPage = e.currentTarget.title;
        const pages = this.state.pages.slice();
        const onPageChange = this.props.onPageChange;

        let find = pages.find(p => p.title === selectedPage);
        console.log('Selected page: ', find);
        if (find) {
            pages.forEach(p => {
                p.active = p === find;
            });
            this.setState({
                pages: pages
            });
            onPageChange(selectedPage);
        } else {
            console.error('Cannot find selected page in menu: ' + selectedPage)
        }
    }

    render() {
        let menuItems = this.state.pages.map(p => {
            return (
                <MenuItem key={p.href} title={p.title} href={p.href} active={p.active} onClick={this.handleClick}/>
            );
        });

        return (
            <main role='main' className='flex-shrink-0'>
                <div className='container'>
                    <ul className='nav nav-pills nav-fill'>
                        {menuItems}
                    </ul>
                </div>
            </main>
        );
    }
}

class MenuItem extends React.Component<MenuItemProps> {

    render() {
        const title = this.props.title;
        const href = this.props.href;
        const active = this.props.active;
        const onClick = this.props.onClick;

        let className = 'nav-link inactive';
        if (active) {
            className = 'nav-link active';
        }
        return (
            <li className='nav-item'>
                <a className={className} href={href} onClick={onClick} title={title}>{title}</a>
            </li>
        );
    }
}

export default NavigationBar;