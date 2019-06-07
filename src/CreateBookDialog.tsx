import React from "react";

type CreateBookDialogProps = {
    attributes?: [],
    onCreate: { (title: string): void }
}
type CreateBookDialogState = {
    title: string
}

export class CreateBookDialog extends React.Component<CreateBookDialogProps, CreateBookDialogState> {

    constructor(props: CreateBookDialogProps) {
        super(props);

        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({title: e.currentTarget.value});
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('+CreateBookDialog.handleSubmit');
        console.log(this.state.title);
        this.props.onCreate(this.state.title);

        this.setState({
            title: ""
        });

        // Navigate away from the dialog to hide it.
        // @ts-ignore
        window.location = "#";
    }

    render() {
        return (
            <div>
                <a href="#createBook">
                    <button type="button" className="btn btn-success">Add book</button>
                </a>
                <div id="createBook" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new book</h2>

                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Title" value={this.state.title}
                                   onChange={this.handleChange}/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}