import React from 'react';
import AuthorGenericComponent from "./AuthorGenericComponent";

class AuthorTable extends AuthorGenericComponent {

    render() {
        const {authors} = this.state;
        return (
            <div className='container'>
                <h1 className='mt-5'>Authors:</h1>
                <p className='lead'>List of all authors in the library:</p>
                <table className='table table-bordered'>
                    <thead className='thead-dark'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors.map(a => {
                        return (
                            <tr key={a.self}>
                                <td>{a.firstName}</td>
                                <td>{a.lastName}</td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AuthorTable;