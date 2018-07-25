import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
    render() {
        const { component: Component, authenticated, path, ...rest } = this.props

        if (authenticated) {
            //valid signed in user
            return (
                <Route path={path} {...rest} render={props => (
                    <Component {...rest} {...props} />
                )} />
            )
        } else if (localStorage.getItem('autheduser') !== null) {
            return (
                <Route path={path} {...rest} render={props => (
                    <Redirect to={{
                            pathname: '/not-found',
                            state: { from: props.location }
                        }} />
                )} />
            )
        } else {
            return (
                <Route path={path} {...rest} render={props => (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )} />
            )
        }
    }
}

function mapStateToProps({ autheduser }) {
    const authenticated = autheduser !== null

    return {
        authenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)