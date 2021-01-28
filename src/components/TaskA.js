import React,{useState,useEffect} from 'react'
import { filterData } from '../utils'
import DateInputs from './DateInputs'

export default function TaskA({stockData,dataInfo}) {

    const [selectedDates,setSelectedDates] = useState(null)
    const [longestTrendDays, setLongestTrendDays] = useState(null)

    useEffect(() => {
        setSelectedDates(dataInfo)
    }, [])

    useEffect(() => {
        if(stockData){

            const dataCopy = filterData(stockData,selectedDates)

            let longestUpwardTrendDays = 0
            let currentUpwardTrendDays = 0
            
            for(let i=1;i<dataCopy.length;i++){
                
                const upFromPrevDay = dataCopy[i]["Close/Last"] > dataCopy[i-1]["Close/Last"]

                if(!upFromPrevDay){
                    currentUpwardTrendDays = 0
                    continue
                }

                if(currentUpwardTrendDays > longestUpwardTrendDays){
                    longestUpwardTrendDays = currentUpwardTrendDays
                }
                
                currentUpwardTrendDays++
            }
            setLongestTrendDays(longestUpwardTrendDays)
        }
    }, [selectedDates,stockData])

    const changeDateHandler = (e) =>{
        const { value, name } = e.target
        setSelectedDates({...selectedDates,[name]:value})
    }

    return (
        <div>
            <p>A) How many days was the longest bullish (upward) trend within a given date range?</p>
            <DateInputs 
                changeDate={changeDateHandler} 
                selectedDates={selectedDates} 
                dataInfo={dataInfo}
            />
            <div>
                {selectedDates &&<p>
                    Close/Last price increased <b>{longestTrendDays}</b> days in a row between {selectedDates.startDate} and {selectedDates.endDate}.
                </p>}
            </div>
        </div>
    )
}
