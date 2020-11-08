import React from 'react';
import { withRouter } from 'react-router';

class Buy extends React.Component {
    state = {
        email: null,
        balance: null,
        applePrice: null,
        orangePrice: null,
        pineapplePrice: null,
        bananaPrice: null,
        pearPrice: null,
        appleAccount: null,
        orangeAccount: null,
        pineappleAccount: null,
        bananaAccount: null,
        pearAccount: null,
        appleStock: null,
        orangeStock: null,
        pineappleStock: null,
        bananaStock: null,
        pearStock: null,
        selected: null,
        amount: null,
        token: localStorage.token
    };

    async componentDidMount() {
        var url = "https://papi.jsram.me/accounts";
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
                        appleAccount: result.data[0].apple,
                        orangeAccount: result.data[0].orange,
                        pineappleAccount: result.data[0].pineapple,
                        bananaAccount: result.data[0].banana,
                        pearAccount: result.data[0].pear,
                        email: result.data[0].email
                    });
    
        url = "https://papi.jsram.me/objects";
        const response2 = await fetch(url, { 
                                            method: "GET", 
                                            headers: {
                                                        "x-access-token": localStorage.token
                                                    }
                                        });
        const result2 = await response2.json();
        console.log(result2);
        this.setState({ applePrice: result2.data[0].applePrice,
                        orangePrice: result2.data[0].orangePrice,
                        pineapplePrice: result2.data[0].pineapplePrice,
                        bananaPrice: result2.data[0].bananaPrice,
                        pearPrice: result2.data[0].pearPrice,
                        appleStock: result2.data[0].apple,
                        orangeStock: result2.data[0].orange,
                        pineappleStock: result2.data[0].pineapple,
                        bananaStock: result2.data[0].banana,
                        pearStock: result2.data[0].pear,
                    });
        console.log(this.state);
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    handleSelect = (event) => {
        event.preventDefault();
        this.setState({"selected": event.target.value});
        console.log(this.state.selected)
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await fetch('https://papi.jsram.me/objects/buy', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": localStorage.token
            },
            body: JSON.stringify(this.state),
            }).then(async function(response3) {
                const result3 = await response3.json();
                console.log(result3)
            });

        await fetch('https://papi.jsram.me/accounts/buy', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": localStorage.token
            },
            body: JSON.stringify(this.state),
            }).then(async function(response4) {
                const result4 = await response4.json();
                console.log(result4)
            });
            this.props.history.push('/account');
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
            <div>
                <h2>Buy</h2>
                <form onSubmit={this.handleSubmit} className="buysell">
                    <select name="dropdown" onChange={this.handleSelect}>
                        <option>Select Object</option>
                        <option>apple</option>
                        <option>orange</option>
                        <option>pineapple</option>
                        <option>banana</option>
                        <option>pear</option>
                    </select>
                    <label>Amount</label>
                    <input type="number"
                            name="amount"
                            onChange={this.handleChange}></input>
                    <input type="submit"
                            value="Buy"
                            className="registerButton"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(Buy);