const { Disk } = require("./index")

const disk = new Disk()

// disk.insert("user", { name: "mew", age: 12 })

// console.log(disk.findById('user',"ln1oyrd9O2mN7oPT3g1695815838477"))
console.log(disk.findOne('user', {
    "age": 12
}))