import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        text1: '',
        text2: '',
        toHome: false
    }
    handleText1Change = (e) => {
        const text1 = e.target.value

        this.setState(() => ({
            text1
        }))
    }
    handleText2Change = (e) => {
        const text2 = e.target.value

        this.setState(() => ({
            text2
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { text1, text2 } = this.state
        const { dispatch } = this.props

        // todo: Add Tweet to Store

        dispatch(handleAddQuestion(text1, text2))
        this.setState(() => ({
            text1: '',
            text2: '',
            toHome: true,
        }))
    }
    render() {
        const { text1, text2, toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3 className='center'>New Question</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <div>Would You rather</div>
                      <textarea
                          placeholder="Option 1"
                          value={text1}
                          onChange={this.handleText1Change}
                          className='textarea'
                          maxLength={280}
                      />
                    <div>OR</div>
                    <textarea
                        placeholder="Option 2"
                        value={text2}
                        onChange={this.handleText2Change}
                        className='textarea'
                        maxLength={280}
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={text1.trim() === '' || text2.trim() === ''}>
                        Add Question
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)