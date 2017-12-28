import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks() {
        const { authenticated } = this.props.auth;

        if (authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/signout" className="nav-link">
                        Sign out
                    </Link>
                </li>
            );
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link to="/signup" className="nav-link">
                        Sign up
                    </Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link to="/signin" className="nav-link">
                        Sign in
                    </Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">
                    Fullstack Auth
                </Link>
                <ul className="nav navbar-nav">{this.renderLinks()}</ul>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(Header);
