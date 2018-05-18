# Getting Started

This README applies specifically to the `rewire-prac` node project.

Clone the repo.

```
git clone https://github.com/nduckwiler/prac.git
```

Make sure you're in the `rewire-prac` directory.

```
cd rewire-prac
```

Install dependencies.

```
npm install
```

Run the tests.

```
npm test
```

# How to use rewire-prac

After using `npm install`, your directory will look like this:
```
rewire-prac/
|-- index.js
|-- package.json
|-- request.json
|-- test/
    |-- index-test.js
    |-- ...
|-- node_modules/
    |-- alexa-sdk/
      |-- index.js
    |-- ...
```
The directory demonstrates how to use `rewire` to test JavaScript files. Running `npm test` will use Mocha to run `test/index-test.js`, which tests `index.js`. 

For now, the example is an `index.js` that would be used with an Alexa skill. This is type of testing is used in Codecademy's Dialog Management course. It requires a `request.json` file, which mocks a real JSON request to a Lambda function. It also uses a fake `alexa-sdk` node module, which is empty.

# Sources

- The [rewire repo](https://github.com/jhnns/rewire)
- The [Chai Assertion Library](http://www.chaijs.com/api/assert/)
