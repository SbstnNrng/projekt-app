import React from 'react';
import {socket} from '../service/socket';

class Overview extends React.Component {
    state = {
        apple: null,
        applePrice: null,
        banana: null,
        bananaPrice: null,
        orange: null,
        orangePrice: null,
        pineapple: null,
        pineapplePrice: null,
        pear: null,
        pearPrice: null,
        token: localStorage.token
    };

    async componentDidMount() {
        const url = "https://papi.jsram.me/objects";

        let exist = socket.hasListeners('change');
        if (exist) {
            socket.off('change');
        }
        socket.on('change', async(price) => {
            this.setState({
                applePrice: price[0],
                bananaPrice: price[1],
                orangePrice: price[2],
                pineapplePrice: price[3],
                pearPrice: price[4]
            });
            console.log(price);
            const response = await fetch(url, { 
                                                method: "PUT", 
                                                body: JSON.stringify(this.state),
                                                headers: {
                                                    "Content-Type": "application/json; charset=utf-8"
                                                }
                                            });
            await response.json();

            const response2 = await fetch(url, { 
                                                method: "GET", 
                                                headers: {
                                                            "x-access-token": localStorage.token
                                                        }
                                            });
            const result = await response2.json();

            this.setState({
                            apple: result.data[0].apple,
                            applePrice: result.data[0].applePrice,
                            banana: result.data[0].banana,
                            bananaPrice: result.data[0].bananaPrice,
                            orange: result.data[0].orange,
                            orangePrice: result.data[0].orangePrice,
                            pineapple: result.data[0].pineapple,
                            pineapplePrice: result.data[0].pineapplePrice,
                            pear: result.data[0].pear,
                            pearPrice: result.data[0].pearPrice,
                        });
        });

        const response = await fetch(url, { 
                                            method: "GET", 
                                            headers: {
                                                        "x-access-token": localStorage.token
                                                    }
                                        });
        const result = await response.json();

        this.setState({
                        apple: result.data[0].apple,
                        applePrice: result.data[0].applePrice,
                        banana: result.data[0].banana,
                        bananaPrice: result.data[0].bananaPrice,
                        orange: result.data[0].orange,
                        orangePrice: result.data[0].orangePrice,
                        pineapple: result.data[0].pineapple,
                        pineapplePrice: result.data[0].pineapplePrice,
                        pear: result.data[0].pear,
                        pearPrice: result.data[0].pearPrice,
                    });
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
                <h2>Overview</h2>
                <div className="badge">
                    <p>Apple</p>
                    <p>Inventory: {this.state.apple}</p>
                    <p>${this.state.applePrice}</p>
                </div>
                <div className="badge">
                    <p>Orange</p>
                    <p>Inventory: {this.state.orange}</p>
                    <p>${this.state.orangePrice}</p>
                </div>
                <div className="badge">
                    <p>Banana</p>
                    <p>Inventory: {this.state.banana}</p>
                    <p>${this.state.bananaPrice}</p>
                </div>
                <div className="badge">
                    <p>Pineapple</p>
                    <p>Inventory: {this.state.pineapple}</p>
                    <p>${this.state.pineapplePrice}</p>
                </div>
                <div className="badge">
                    <p>Pear</p>
                    <p>Inventory: {this.state.pear}</p>
                    <p>${this.state.pearPrice}</p>
                </div>
            </div>
        );
    }
}

export default Overview;