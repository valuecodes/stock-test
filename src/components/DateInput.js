import React from 'react'

export default function DateInput({name,changeDate,selectedDates,dataInfo}) {
    return (
        <div className='dateInput'>
            <label>{name}</label>
            <input type='date' 
                value={selectedDates?selectedDates.startDate:''} 
                min={dataInfo.startDate} 
                max={dataInfo.endDate}
                name={name}
                onChange={changeDate}
            />                    
        </div>
    )
}
