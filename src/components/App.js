import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import QuestionPage from './QuestionPage'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import PrivateRoute from './PrivateRoute'


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { loggedIn } = this.props;

        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <Nav />
                        <div>
                            <Switch>
                                <PrivateRoute path='/' exact component={Dashboard} loggedIn={loggedIn} />
                                <PrivateRoute path='/leaderboard' exact component={LeaderBoard} loggedIn={loggedIn} />
                                <PrivateRoute path='/new' exact component={NewQuestion} loggedIn={loggedIn} />
                                <PrivateRoute path='/question/:id' exact component={QuestionPage} loggedIn={loggedIn} />
                                <Route path='/login' exact component={Login} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({autheduser}) {
    return {
        loggedIn: autheduser !== null
    }
}

export default connect(mapStateToProps)(App)