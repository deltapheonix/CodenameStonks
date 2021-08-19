import React from 'react';

class FetchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    };

    componentDidMount() {
        let stockHistoryUrl = 'http://localhost:8000/invest/GetStockPriceHistory/';
        let interval = '15min';
        let stock = 'TSLA';
        let request = stockHistoryUrl + stock + '/' + interval;
        fetch(request)
            .then(res => res.json())
            .then(
                (result) => {
                  this.setState({
                    isLoaded: true,
                    items: result.items
                  });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
            )
    }

    render() {
        let count = 0;
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {items.map(item => (
                <li key={count++}>
                  {item.high}{item.low}
                </li>
              ))}
            </ul>
          );
        }
    }
    
}

export default FetchData;