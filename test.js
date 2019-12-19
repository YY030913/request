const request = require('./index')

let result = request("https://google.com", "get").then(function(result) {
    console.log(result)
}).catch((err) => {
    console.log(err)
})