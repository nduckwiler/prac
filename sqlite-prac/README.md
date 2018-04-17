# sqlite3-prac

## Getting Started

This README applies specifically to the `sqlite-prac` project.

Clone the repo.

```
git clone https://github.com/nduckwiler/prac.git
```

`cd` into `sqlite-prac`.

```
cd sqlite-prac
```

Install dependencies.

```
npm install
```

## How to use this repo

Read the rest of this README to learn about sqlite3. The files mentioned in the examples also exist in this repo. 

Run `npm test` to see how the BATS testing framework works with sqlite3.

## Create a temp database from csv (interactive mode)
Use these instructions to create a temporary sqlite database from `sessions.csv`.

```
sqlite3
>sqlite .mode csv
>sqlite .import data/sessions.csv sessions
>sqlite .schema sessions
>sqlite SELECT * FROM sessions;
>sqlite .quit
```

## Create a persistent database from csv (interactive mode)
Use these instructions to create a temporary sqlite database from `data/sessions.csv`. Then save it to a persistent database `data/sessions.db`.
```
sqlite3
>sqlite .mode csv
>sqlite .import data/sessions.csv sessions
>sqlite .save data/sessions.db
>sqlite .quit
```
You will see a file `sessions.db` saved in the `data` directory.

You can open this database in interactive by entering
```
sqlite3 data/sessions.db
```

## Query and write results to file (from bash)
You can query a persistent database without entering sqlite's interactive mode. These examples assume you created a persistent database `sessions.db`.

This will write the results of the query to `stdout`.
```
sqlite3 data/sessions.db "SELECT * FROM sessions;" 
```

This will write the results of the query to the file `results/output.txt`.
```
sqlite3 data/sessions.db "SELECT * FROM sessions;" > results/output.txt
```

You can write to a `.txt` or `.sqlite` file. Either works in this case.

## Query and write results to file (interactive mode)
You can choose where the results of your query are written.

By default, they are written to `stdout`.

```
sqlite3 data/sessions.db
>sqlite SELECT * FROM sessions LIMIT 1;
001|guitar|30|studio
```

You can write to a file, say `results/output.txt`, with `.output FILENAME`
```
sqlite3 data/sessions.db
>sqlite .output results/output.txt
>sqlite SELECT * FROM sessions LIMIT 1;
>sqlite .quit
cat results/output.txt
001|guitar|30|studio
```

You can write to a `.txt` or `.sqlite` file. Either works in this case.

## Run query from file (from bash)
Say you have a SQL query written in a file `queries/command.sql`.

You can run this query from bash using the `--init` flag. This will open interactive mode after the query has run. 
```
sqlite3 data/sessions.db --init queries/command.sql
-- Loading resources from queries/command.sql
guitar
guitar
flute
voice
voice
SQLite version 3.16.0 2016-11-04 19:09:39
Enter ".help" for usage hints.
sqlite>
```

Or, you can run this query using the pipe command `|`. This will open interactive mode after the query has run. 
```
cat queries/command.sql | sqlite3 data/sessions.db
guitar
guitar
flute
voice
voice
```

This is more or less equivalent to a format we've seen before:
```
sqlite3 data/sessions.db "SELECT * FROM sessions LIMIT 1;"
```

## Run query from file (interactive mode)
Say you have a SQL query written in a file `queries/command.sql`. You can run this query in interactive mode

```
sqlite3 data/sessions.db
>sqlite .read queries/command.sql
guitar
guitar
flute
voice
voice
```

