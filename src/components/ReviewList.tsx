import React from 'react';
import {Review} from "../domain/Review";

type ReviewListProps = {
    reviewLink: string
}
type ReviewListState = {
    reviews: Array<Review>
    visible: boolean
}

export class ReviewList extends React.Component<ReviewListProps, ReviewListState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            reviews: new Array<Review>(),
            visible: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.loadReviews = this.loadReviews.bind(this);
    }

    componentDidMount(): void {
        this.loadReviews();
    }

    loadReviews() {
        console.log('+loadReviews:' + this.props.reviewLink);
        fetch(this.props.reviewLink)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const reviews = result._embedded.reviews.map((r: any) => {
                    return new Review(r._links.self.href, r.review);
                });
                this.setState({reviews: reviews});
            }, error => {
                console.error(error)
            });
    };


    handleClick() {
        console.log('+ReviewList.handleClick');
        const visible = this.state.visible;
        if (!visible) {
            this.loadReviews();
        }
        this.setState({
            visible: !visible
        });
    }

    render() {
        const {visible, reviews} = this.state;
        return (
            <div>
                <button type='button' onClick={this.handleClick}>
                    <img src='/img/baseline-chat-24px.svg' alt='Reviews'/>
                </button>
                <div>
                    {visible && reviews && reviews.map((r) => {
                        return (
                            <span key={r.self} className='card'>
                                <p>{r.review}</p>
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    }

}