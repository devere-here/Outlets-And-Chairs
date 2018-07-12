import React from 'react'
import { db } from '../firebase'
import CafeReviewsUI from './CafeReviewsUI'

export default class CafeReviews extends React.Component {
    state = {
        reviews: []
    }

    componentDidMount() {
        let reviews = []
        db.collection('reviews').doc(this.props.id).collection('reviews')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    reviews.push(doc.data())
                })
                this.setState({ reviews })
            })
    }

    render() {
        return <CafeReviewsUI reviews={this.state.reviews} />
    }
}
