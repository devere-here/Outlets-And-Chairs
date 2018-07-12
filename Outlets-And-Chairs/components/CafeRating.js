import React from 'react'
import { db } from '../firebase'
import CafeRatingUI from './CafeRatingUI'

export default class CafeRating extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        overallRating: '',
        seatingRating: '',
        outletRating: '',
        restroomRating: '',
      }
    }

    componentDidMount(){
        db.collection('ratings').doc(this.props.id).get()
        .then(doc => {
            let data = doc.data()
            if (data){
                this.setState(data)
            }
        })
    }

    render(){
        const labels = {
                overallRating: 'Overall Rating',
                seatingRating: 'Access to Seating Rating',
                outletRating: 'Access to Outlets Rating',
                restroomRating: 'Restroom Rating',
            },
            keys = Object.keys(labels)

        return (
            <CafeRatingUI
                name={this.props.name}
                keys={keys}
                labels={labels}
                rating={this.state}
             />
        )
    }
}
