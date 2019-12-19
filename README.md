# Request

a simple request method use node nodejs(http or https). support redirect url auto fetch.

## Usage

```js
const request = require('yy030913.request')

let result = request("https://google.com", "get").then(function(result) {
    console.log(result)
}).catch((err) => {
    console.log(err)
})

or

async function test() {
    let result = await request("https://google.com", "get");
    console.log(result)
}
```
all levels: ['fatal', 'error', 'warn', 'info', 'debug', 'trace']

## Acknowledgements

Nodejs http API [http ⇗](https://nodejs.org/api/http.htm)
Nodejs https APIg [https ⇗](https://nodejs.org/api/https.html)	


## License

Licensed under [MIT](./LICENSE).
