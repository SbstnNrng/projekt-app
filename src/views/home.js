import React from 'react';
import { withRouter } from 'react-router';

class Start extends React.Component {
    state = {
        title: "Home",
        info: "Welcome! Trade fruit!",
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email')
    };

    handleSubmit = (event) => {
        event.preventDefault();
        localStorage.clear();
        this.props.history.push('/login');
    }

    render () {
        if (!this.state.token) {
            return (
                <div>
                    <h2>{this.state.title}</h2>
                    <p>{this.state.info}</p>
                </div>
            );
        }
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.info}</p>
                <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Log out" className="registerButton"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(Start);