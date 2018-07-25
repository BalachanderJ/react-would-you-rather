import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'


class LeaderBoard extends Component {
    render() {
        const { leaderBoardUsers } = this.props

        return (
        <ul className='dashboard-list'>
            {leaderBoardUsers.map((user) => (
                <div className='tweet' key={user.id}>
                    <Avatar name={user.id} />
                    <div className='tweet-info'>
                        <div>
                            <span>{user.name}</span>
                            <div>Questions Asked : {user.questions}</div>
                            <div>Questions Answered : {user.answers}</div>
                            <div>Score: {user.score}</div>
                        </div>
                    </div>
                </div>
            ))}
        </ul>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        leaderBoardUsers: Object.keys(users)
            .map((user) => {
                return {
                    id: user,
                    name: users[user].name,
                    answers: Object.keys(users[user].answers).length,
                    questions: users[user].questions.length,
                    score: Object.keys(users[user].answers).length + users[user].questions.length
                }
            }).sort((a,b) => b.score - a.score)
    }
}

export default connect(mapStateToProps)(LeaderBoard)