import React from 'react';
import { withRouter } from 'react-router';

class Register extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    req1 = (data) => {
        fetch('https://papi.jsram.me/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json; charset=utf-8"},
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data),
            }).then(function(response) {
                console.log(response);
                return response.json();
            });
    }

    req2 = (data) => {
        fetch('https://papi.jsram.me/accounts', {
            method: 'POST',
            headers: {"Content-Type": "application/json; charset=utf-8"},
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data),
            }).then(function(response) {
                console.log(response);
                return response.json();
            });
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = this.state;
        await this.req1(data);
        await this.req2(data);
        this.props.history.push('/login');
    }

    render () {
        return (
            <div className="register">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                    <input type="email" name="email" value={this.state.value} onChange={this.handleChange}></input>
                    </label>
                    <label>
                        Password
                    <input type="password" name="password" value={this.state.value} onChange={this.handleChange}></input>
                    </label>
                    <input type="submit" value="Register" className="registerButton"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);