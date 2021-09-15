import React,{useState,useEffect} from 'react';

function FetchData(props) {
  
  const [items, setItems]=useState([]);
  
  // const getItems=()=>{
  //     let stockHistoryUrl = props.target; //'http://localhost:8000/invest/GetStockPriceHistory/';
  //     let interval = props.interval; //'15min';
  //     let stock = props.stock; //'TSLA';
  //     let request = stockHistoryUrl + stock + '/' + interval;
  //     fetch(request)
  //     .then(function(res){ 
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then(function(response) {
  //       console.log(response);
  //       setItems(response)
  //     });
  // }

  useEffect(() => {
    getItems()

    function getItems () {
      let stockHistoryUrl = props.target; //'http://localhost:8000/invest/GetStockPriceHistory/';
      let interval = props.interval; //'15min';
      let stock = props.stock; //'TSLA';
      let request = stockHistoryUrl + stock + '/' + interval;
      fetch(request)
      .then(function(res){ 
        console.log(res);
        return res.json();
      })
      .then(function(response) {
        console.log(response);
        setItems(response)
      });
    }
  },[])
  
  return (
    <ul>
      {items && items.length > 0 && (items.map((item, index) => 
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default FetchData;