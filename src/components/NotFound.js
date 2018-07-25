import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'


class NotFound extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>Requested page is not found. Please  <NavLink to='/login' className='login-btn' exact>
                    login
                </NavLink></h3>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(NotFound)