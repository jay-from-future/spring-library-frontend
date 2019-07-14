import React from 'react';

type AlertProps = {
    type: string,
    message: string
    onClose: { (): void }
}

/**
 * Renders alert message.
 *
 * See https://getbootstrap.com/docs/4.0/components/alerts/ for available types.
 */
export class Alert extends React.Component<AlertProps> {

    render() {
        const {type, message} = this.props;

        return (
            <div className={`alert alert-dismissable ${type}`} role="alert">
                <button className="close" data-dismiss="alert" aria-label="close"
                        onClick={this.props.onClose}>
                    ×
                </button>
                {message}
            </div>);
    }
}