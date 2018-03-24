# Getting Started

This README applies specifically to the `bats-prac` node project.

Clone the repo.

```
git clone https://github.com/nduckwiler/prac.git
```

Install dependencies.

```
npm install
```

# How to use bats-prac
```
bats-prac/
|-- start.sh
|-- test/
    |-- test.sh
    |-- basic-test.bats
    |-- ...
```
`start.sh` provides basic bash knowledge necessary to write BATS tests. Run it with `bash start.sh`.

`basic-test.bats` contains some basic BATS tests. These are good for learning and copying for your own tests.

`test.sh` can be run to execute all `.bats` tests in the `test` directory. Run it with `bash test/test.sh`.

# Sources

- The [BATS repo](https://github.com/sstephenson/bats)
- [Testing Your Shell Scripts, with Bats](https://medium.com/@pimterry/testing-your-shell-scripts-with-bats-abfca9bdc5b9) - a good primer
- [The Bash Guide on bash.academy](http://guide.bash.academy) - everything you need to know about bash
