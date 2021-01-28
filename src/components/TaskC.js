import React,{ useState, useEffect } from 'react'
import { dateToString } from '../utils'


export default function TaskC({stockData}) {

    const [order,setOrder] = useState(1) // 1 high to low, -1 low to high
    const [sortedData,setSortedData] = useState(null)

    useEffect(() => {
        if(stockData){

            const dataCopy = [...stockData]
                .sort((a,b) => a.Date.getTime()-b.Date.getTime())
            
            const smaDays = 5

            for(let i=0;i<dataCopy.length;i++){
                if(i>=smaDays){
                    let smaTotal = 0
                    for(let a=1;a<=smaDays;a++){
                        smaTotal+=dataCopy[i-a]['Close/Last']
                    }
                    let sma = smaTotal / smaDays
                    dataCopy[i].sma = +sma.toFixed(2)
                    dataCopy[i].smaToOpenPercent = +(((dataCopy[i].Open - sma) / sma) * 100).toFixed(2)         
                }else{
                    dataCopy[i].sma = 0
                    dataCopy[i].smaToOpenPercent = 0  
                }
            }      

            dataCopy.sort((a,b) => 
                order===1?
                b.smaToOpenPercent - a.smaToOpenPercent:
                a.smaToOpenPercent - b.smaToOpenPercent
            )
            setSortedData(dataCopy)
        }
    }, [stockData,order])

    return (
        <div>
            <p>C) Within a given date range, which dates had the best opening price compared to 5 days
simple moving average (SMA 5)?
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>
                            <button 
                                onClick={() => setOrder(order===1?-1:1)}
                            >
                                Volume
                            </button>
                        </th>
                    </tr>                    
                </thead>
                <tbody>
                    {sortedData && sortedData.map(item =>
                        <tr key={item.Date}>
                            <td>{dateToString(item.Date)}</td>
                            <td >
                                {item.smaToOpenPercent} %
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
