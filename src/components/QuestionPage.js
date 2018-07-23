import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import { handleAnswerQuestion } from '../actions/questions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'



class QuestionPage extends Component {
    state = {
        answered: this.props.answered,
        selectedOption: ''
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(handleAnswerQuestion(this.props.autheduser, this.props.question.id, this.state.selectedOption));
        this.setState(() => ({
            answered: true
        }))
    }

    render() {
        const { question } = this.props

        if (question === null) {
            return <p>This question doesn't exist</p>
        }

        const {
            author, optionOne, optionTwo
        } = question

        return (
            <div className='tweet'>
                <Avatar name={author} />
                <div className='tweet-info'>
                    {this.state.answered &&
                        <div>
                            <span>{author} asks</span>
                            <div> Would You Rather </div>
                            <div>
                                {optionOne.text} - {question.optionOne.votes.length} votes
                                {question.optionOne.votes.indexOf(this.props.autheduser) !== -1 &&
                                    <FontAwesomeIcon icon={faCheckCircle} color='green' />
                                }
                            </div>
                            <div> OR </div>
                            <div>
                                {optionTwo.text} - {question.optionTwo.votes.length} votes
                                {question.optionTwo.votes.indexOf(this.props.autheduser) !== -1 &&
                                <FontAwesomeIcon icon={faCheckCircle} color='green'/>
                                }
                            </div>
                        </div>
                    }
                    {!this.state.answered &&
                    <form onSubmit={this.handleSubmit}>
                        <div>Would You Rather</div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="optionOne"
                                       checked={this.state.selectedOption === 'optionOne'}
                                       onChange={this.handleOptionChange} />
                                {optionOne.text}                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="optionTwo"
                                       checked={this.state.selectedOption === 'optionTwo'}
                                       onChange={this.handleOptionChange} />
                                {optionTwo.text}
                            </label>
                        </div>
                        <button
                            className='btn'
                            type='submit'
                            disabled={this.state.selectedOption === ''}>
                            VOTE
                        </button>
                    </form>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps ({autheduser, questions}, props) {
    const { id } = props.match.params;
    const question = questions[id]
    let answered = false
    if (question) {
        answered = question.optionOne.votes.indexOf(autheduser) !== -1 || question.optionTwo.votes.indexOf(autheduser) !== -1
    }

    return {
        id,
        question,
        autheduser,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))