#!./node_modules/bats/libexec/bats
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

@test "hello is found in assets/strings.txt" {
  grep "hello" assets/strings.txt
}

@test "wazzup is not found in assets/strings.txt" {
  run grep "wazzup" assets/strings.txt
  [[ "$status" -eq 1 ]]
}

@test "a URL is found in assets/strings.txt" {
  # grep and its variations only succeed if the entire match is on 
  # a single string
  egrep "(http:|https:)//.+" assets/strings.txt
}

@test "backticks are used in assets/loop.js" {
  grep "\`" assets/loop.js
}

@test "double quotes are not used in assets/loop.js" {
  run grep "\"" assets/loop.js
  [[ "$status" -eq 1 ]]
}

@test "there are 3 semi-colons in assets/loop.js" {
  result=$(grep -o ";" assets/loop.js | wc -l)
  [[ "$result" -eq 3 ]]
}

@test "assets/loop.js is written exactly how I want it" {
  str="for (let i = 0; i < 4; i++) {
      console.log(\`i equals \${i}\`);
    }"
  echo "$str" > ${BATS_TMPDIR}/tmp.txt

  run diff -iw ${BATS_TMPDIR}/tmp.txt assets/loop.js
  [[ "$status" -eq 0 ]]
}

@test "root dir contains /bats" {
  # note that this pwd prints the root of the project 
  pwd > ${BATS_TMPDIR}/tmp.txt
  grep "/bats" ${BATS_TMPDIR}/tmp.txt 
}

@test "assets/empty.txt is empty" {
  touch assets/empty.txt 
  run diff assets/blank.txt assets/empty.txt
  [ "$status" -eq 0 ]
}

