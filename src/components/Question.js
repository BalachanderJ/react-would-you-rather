import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/api'
// import { handleAnswerQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'


class Question extends Component {
    handleAnswer = (e) => {
        e.preventDefault()

        const { dispatch, question, autheduser } = this.props

        // dispatch(handleAnswerQuestion({
        //     id: tweet.id,
        //     hasLiked: tweet.hasLiked,
        //     autheduser
        // }))
    }

    render() {
        const { question } = this.props

        if (question === null) {
            return <p>This question doesn't exist</p>
        }

        const {
            id, author, optionOne, optionTwo, timestamp
        } = question

        return (
            <Link to={`/question/${id}`} className='tweet'>
                <Avatar name={author} />
                <div className='tweet-info'>
                    <div>
                        <span>{author}</span>
                        <div>{formatDate(timestamp)}</div>
                        <p>{optionOne.text} OR {optionTwo.text}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({autheduser, questions}, { id }) {
    const question = questions[id]

    return {
        autheduser,
        question: question
    }
}

export default withRouter(connect(mapStateToProps)(Question))