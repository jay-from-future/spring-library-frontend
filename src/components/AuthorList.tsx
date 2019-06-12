import React from 'react';
import AuthorGenericComponent from "./AuthorGenericComponent";

class AuthorList extends AuthorGenericComponent {

    render() {
        const {authors} = this.state;
        return (
            <ul className='list-unstyled'>
                {authors.map(a => {
                        return (<li key={a.self}>{a.firstName + ' ' + a.lastName}</li>);
                    }
                )}
            </ul>
        );
    }
}

export default AuthorList;