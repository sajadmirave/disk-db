const fs = require("fs");
const path = require("path");

class Disk {
    constructor() {
        this.path = 'database';

        // create folder structure
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
}

module.exports = { Disk };
