import React,{useState,useEffect} from 'react'
import { dateToString } from '../utils'

export default function TaskB({stockData}) {

    const [orderBy,setOrderBy] = useState('Volume')
    const [sortedData,setSortedData] = useState(null)

    useEffect(() => {
        if(stockData){
            
            const dataCopy = [...stockData]

            dataCopy.forEach(day =>{
                day.intraDayChange = +Math.abs(day.High - day.Low).toFixed(2)
            })

            dataCopy.sort((a,b) => b[orderBy] - a[orderBy])
            setSortedData(dataCopy)
        }
    }, [stockData,orderBy])
    
    return (
        <div>
            <p>B) Which dates within a given date range had a) the highest trading volume and b) the most
significant stock price change within a day?</p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>
                            <button 
                                onClick={() => setOrderBy('Volume')}
                                className={orderBy==='Volume'?'selected':''}
                            >
                                Volume
                            </button>
                        </th>
                        <th>
                            <button 
                                onClick={() => setOrderBy('intraDayChange')}
                                className={orderBy==='intraDayChange'?'selected':''}
                            >
                                Intraday change
                            </button>
                        </th>
                    </tr>                    
                </thead>
                <tbody>
                    {sortedData && sortedData.map(item =>
                        <tr key={item.Date}>
                            <td>{dateToString(item.Date)}</td>
                            <td >
                                {item.Volume}
                            </td>
                            <td >
                                {item.intraDayChange}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
