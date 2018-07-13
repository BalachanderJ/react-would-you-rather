import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <div>Answered Questions</div>
                <ul className='dashboard-list'>
                    {this.props.answeredQuestionIds.map((id) => (
                        <li key={id}>
                            <Question id={id}></Question>
                        </li>
                    ))}
                </ul>
                <div>Unanswered Questions</div>
                <ul className='dashboard-list'>
                    {this.props.unansweredQuestionIds.map((id) => (
                        <li key={id}>
                            <Question id={id}></Question>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({questions, autheduser}) {
    return {
        answeredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOneSelected = questions[question].optionOne.votes.indexOf(autheduser) !== -1;
                let optionTwoSelected = questions[question].optionTwo.votes.indexOf(autheduser) !== -1;
                return optionOneSelected || optionTwoSelected
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOneSelected = questions[question].optionOne.votes.indexOf(autheduser) === -1;
                let optionTwoSelected = questions[question].optionTwo.votes.indexOf(autheduser) === -1;
                return optionOneSelected && optionTwoSelected
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)