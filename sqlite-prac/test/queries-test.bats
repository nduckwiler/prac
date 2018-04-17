#!./node_modules/bats/libexec/bats
# If every command in the test case exits with a 0 status code (success), the test passes.
# In this way, each line is an assertion of truth.

@test "queries/command.sql should exist" {
  [[ -f queries/command.sql ]]
}

@test "queries/command.sql should contain SELECT" {
  run grep "SELECT" queries/command.sql
  [[ "$status" -eq 0 ]]
}

@test "queries/command.sql should not contain JOIN" {
  run grep "JOIN" queries/command.sql
  [[ "$status" -eq 1 ]]
}

@test "results/output.txt should contain a list of instruments" {
  sqlite3 data/sessions.db "SELECT instrument FROM sessions;" > tmp.txt
  run diff results/output.txt tmp.txt
  rm tmp.txt
  [[ "$status" -eq 0 ]]
}
