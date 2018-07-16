import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Nav from './Nav'


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <Nav />
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Dashboard} />
                                <Route path='/login' component={Login} />
                                <Route path='/new' component={NewQuestion} />
                                <Route path='/leaderboard' component={LeaderBoard} />
                            </div>}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({autheduser}) {
    return {
        loading: autheduser === null
    }
}

export default connect(mapStateToProps)(App)