#!./node_modules/bats/libexec/bats
# If every command in the test case exits with a 0 status code (success), the test passes.
# In this way, each line is an assertion of truth.

@test "Expect 'raw_lessons.csv' and 'cleaner_lessons.csv' to exist" {
  [[ -f "assets/raw_lessons.csv" ]]
  [[ -f "assets/cleaner_lessons.csv" ]]
}

@test "Expect 'cleaner' files to be a subset of 'raw' files" {
  cat "queries/subset.sql" | sqlite3 "assets/test-data.sqlite" > output.txt
  touch empty.txt
  run diff output.txt empty.txt
  [ "$status" -eq 0 ]
}

