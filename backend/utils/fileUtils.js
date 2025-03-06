const fs = require("fs");
const filePath = "./data/data.txt";

// Read data from file
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return data ? JSON.parse(data) : { users: [], posts: [] };
    } catch (error) {
        return { users: [], posts: [] };
    }
};

// Write data to file
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

module.exports = { readData, writeData };
