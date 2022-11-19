const projectSchema = require('../../src/models/project');

const parserData = (data, id) => {
    data = JSON.parse(data);
    data._id = id;
    data.__v = 0;
    Object.keys(data).forEach(key => {
        if(key.includes("Date"))
            try {
                data[key] = new Date(Date.parse(data[key])).toString();
            } catch (error) {
                console.error({message : error})
            }
    })
    return data;
};

module.exports = parserData;