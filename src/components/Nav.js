import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {handleSetAuthUser} from "../actions/autheduser";



class Nav extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        this.props.dispatch(handleSetAuthUser(null))
    }

    render() {
        return (
            <div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/new' activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                LeaderBoard
                            </NavLink>
                        </li>
                        <li>
                            {this.props.loggedIn &&
                                <div>
                                    <div>Welcome {this.props.autheduser}</div>
                                    <a onClick={this.logout}>

                                        Logout
                                    </a>
                                </div>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps ({autheduser}) {
    return {
        loggedIn: autheduser !== null,
        autheduser
    }
}

export default withRouter(connect(mapStateToProps)(Nav))