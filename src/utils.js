export const csvToJSON = (csvData) =>{
    const rows = csvData.split('\n')
    const header = rows[0].split(', ')
    const dataRows = rows.filter((item,index) => index !== 0&& item !== '') 
    const jsonData = dataRows.map(row => {
        let column = row.split(', ')
        let jsonColumn = {}
        header.forEach((item,index) => jsonColumn[item] = parseValue(column[index],item))
        return jsonColumn
    });
    return jsonData
}

const parseValue = (value,type) =>{
    switch(type){
        case 'Date':
            return new Date(value)
        default: 
            return Number(value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ''))
    }
}

export const dateToString = date => date.toLocaleString().split(',')[0]
