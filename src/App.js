import React,{ useEffect, useState } from 'react';
import './App.css';
import TaskA from './components/TaskA';
import { csvToJSON } from './utils';

const DATA_INFO = {
  startDate:"2020-01-20",
  endDate:"2021-01-20",
}

function App() {

  const [stockData, setStockData] = useState(null)

  useEffect(() => {  
    const fetchData = async () =>{
      const csvData = await fetchCsv()
      const jsonData = csvToJSON(csvData)
      setStockData(jsonData)
    }
    fetchData()
  }, [])

  async function fetchCsv() {
    const response = await fetch('data.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
  }
  console.log(stockData)
  return (
    <div className="App">
      <h1>Stock Analyzer</h1>
      <TaskA stockData={stockData} dataInfo={DATA_INFO}/>
    </div>
  );
}

export default App;
