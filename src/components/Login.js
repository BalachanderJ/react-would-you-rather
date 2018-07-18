import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthUser } from '../actions/autheduser'
import { Redirect } from 'react-router-dom'



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            toDashboard: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(handleSetAuthUser(this.state.value))
        this.setState(() => ({
            toDashboard: true
        }))
    }

    render() {
        const { users } = this.props
        const { toDashboard } = this.state

        if (toDashboard === true) {
            return <Redirect to='/' />
        }

        return (
            <ul className='dashboard-list'>
                    <div className='tweet'>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Select a User to login:
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value=''>Select a User</option>
                                    {Object.keys(users).map((user) => (
                                        <option key={users[user].id} value={users[user].id}>{users[user].name}</option>
                                    ))}
                                </select>
                            </label>
                            <input disabled={this.state.value === ''} type="submit" value="Login" />
                        </form>
                    </div>
            </ul>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))