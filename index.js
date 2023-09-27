const fs = require("fs");
const path = require("path");

class Disk {
    constructor() {
        this.path = 'database';

        // create folder structure

    }


    createStructure() {
        fs.mkdirSync(path.join(__dirname, this.path));
    }

    generateUUID(len) {
        const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$#"
        let result = '';

        for (let i = 0; i < len; i++) {
            const random = Math.floor(Math.random() * char.length)
            result += char[random]
        }

        const uuid = Date.now().toString(36) + result + Date.now()
        return uuid
    }

    // scema

    insert(collection, data) {
        try {
            let existingData = [];

            // Check if the file exists before trying to read it
            if (fs.existsSync(path.join(__dirname, this.path, `${collection}.json`))) {
                const fileContent = fs.readFileSync(path.join(__dirname, this.path, `${collection}.json`), 'utf8');
                existingData = JSON.parse(fileContent);
            }

            const uuid = this.generateUUID(10)

            //config time stapms

            const newDataEntry = { _id: uuid, ...data }
            existingData.push(newDataEntry);

            fs.writeFileSync(path.join(__dirname, this.path, `${collection}.json`), JSON.stringify(existingData, null, 2), 'utf8');
            console.log('Data has been inserted into data.json');
        } catch (error) {
            console.error('An error occurred while writing to data.json:', error);
        }
    }

    findById(collection, _id) {
        let data = fs.readFileSync(path.join(__dirname, this.path, `${collection}.json`))
        let content = JSON.parse(data)

        const result = content.filter((item) => item._id === _id)

        return result[0]
    }

    findOne(collection, query) {
        let data = fs.readFileSync(path.join(__dirname, this.path, `${collection}.json`))
        const content = JSON.parse(data)

        // return content.filter((item) => item === JSON.stringify(query))
        const result = content.find((item) => {
            // find property in obj
            for (const key in query) {
                if (item[key] !== query[key]) {
                    return false
                }

                return true
            }
        })

        return result
    }

    findMany(collection, query) {
        let data = fs.readFileSync(path.join(__dirname, this.path, `${collection}.json`))
        const content = JSON.parse(data)

        // return content.filter((item) => item === JSON.stringify(query))
        const result = content.filter((item) => {
            // find property in obj
            for (const key in query) {
                if (item[key] !== query[key]) {
                    return false
                }

                return true
            }
        })

        return result
    }
}

module.exports = { Disk };
