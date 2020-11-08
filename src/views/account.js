import React from 'react';

class Account extends React.Component {
    state = {
        balance: null,
        apple: null,
        orange: null,
        pineapple: null,
        banana: null,
        pear: null,
        email: null,
        addBalance: 0,
        token: localStorage.token
    };

    async componentDidMount() {
        const url = "https://papi.jsram.me/accounts";
        const response = await fetch(url, { 
                                            method: "GET", 
                                            headers: {
                                                        "x-access-token": localStorage.token,
                                                        email: localStorage.email
                                                    }
                                        });
        const result = await response.json();
        console.log(result);
        this.setState({ balance: result.data[0].balance,
                        apple: result.data[0].apple,
                        orange: result.data[0].orange,
                        pineapple: result.data[0].pineapple,
                        banana: result.data[0].banana,
                        pear: result.data[0].pear,
                        email: result.data[0].email
                    });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.addBalance);
    }

    handleSubmit = (event) => {
        fetch('https://papi.jsram.me/accounts', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": localStorage.token
            },
            body: JSON.stringify(this.state),
            }).then(function(response) {
                console.log(response);
            return response.json();
            });
        this.setState({balance: (parseInt(this.state.balance) + parseInt(this.state.addBalance))});
        this.setState({addBalance: 0});
        event.preventDefault();
    }

    render () {
        if (!this.state.token) {
            return (
                <div>
                    <p>Please Login</p>
                </div>
            );
        }
        return (
            <div className0="register">
                <h2>Account</h2>
                <p>Balance: ${this.state.balance}</p>
                <p>Apple: {this.state.apple}</p>
                <p>Orange: {this.state.orange}</p>
                <p>Pineapple: {this.state.pineapple}</p>
                <p>Banana: {this.state.banana}</p>
                <p>Pear: {this.state.pear}</p>
                <p>Email: {this.state.email}</p>
                <form onSubmit={this.handleSubmit} className="funds">
                    <label>Add funds</label>
                    <input type="number" name="addBalance" value={this.state.addBalance} onChange={this.handleChange}></input>
                    <input type="submit" value="Add funds" className="registerButton"></input>
                </form>
            </div>
        );
    }
}

export default Account;