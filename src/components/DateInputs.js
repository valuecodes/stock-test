import React from 'react'

export default function DateInputs({changeDate,selectedDates,dataInfo}) {
    return (
        <div className='dateInputs'>
            <div className='dateInput'>
                <label>Start Date</label>
                <input type='date' 
                    value={selectedDates?selectedDates.startDate:''} 
                    min={dataInfo.startDate} 
                    max={dataInfo.endDate}
                    name='startDate'
                    onChange={changeDate}
                />                    
            </div>
            <p>-</p>
            <div className='dateInput'>
                <label>End Date</label>
                <input type='date' 
                    value={selectedDates?selectedDates.endDate:''} 
                    min={dataInfo.startDate} 
                    max={dataInfo.endDate}
                    name='endDate'
                    onChange={changeDate}
                />                    
            </div>
        </div>

    )
}
