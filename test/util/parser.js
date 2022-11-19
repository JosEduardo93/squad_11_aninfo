const projectSchema = require('../../src/models/project');

const parserData = (data, id) => {
    const newDate = {};
    data = JSON.parse(data);
    newDate._id = id;
    Object.keys(data).forEach(key => {
        newDate[key] = data[key]; 
        if(key.includes("Date"))
            try {
                newDate[key] = new Date(Date.parse(data[key])).toISOString();
            } catch (error) {
                console.error({message : error})
            }
    })
    newDate.__v = 0;
    return newDate;
};

module.exports = parserData;