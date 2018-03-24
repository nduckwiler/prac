#!./test/lib/bats/bin/bats
# If every command in the test case exits with a 0 status code (success), the test passes.
# In this way, each line is an assertion of truth.

@test "echo exits with 0 status code (implicit)" {
  run echo
}

@test "echo exits with 0 status code (explicit)" {
  run echo
  [[ "$status" -eq 0 ]]
}

@test "echo prints argument to stdout" {
  run echo "hi"
  [[ "$output" = "hi" ]]
}

@test "addition works" {
  result=$(( 3 + 5 ))
  [[ "$result" -eq 8 ]]
}

@test "start.sh exists in root directory" {
  [[ -f start.sh ]]
}

@test "bloop.sh does not exist in root directory" {
  [[ ! -f bloop.sh ]]
}

@test "test/ directory exists in root directory" {
  [[ -d test ]]
}

@test "there is at least one .sh file in root directory" {
  [[ $(echo *.sh | wc -w ) -ge 1 ]]
}

@test "vim is running" {
  pgrep vim
}
