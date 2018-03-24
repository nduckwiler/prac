#!/bin/bash
# First line of the script is shebang which tells the system how to execute
# Run this file by typing `bash start.sh`

echo Hello World!

echo
echo "~~VARIABLES~~"
echo
MY_VAR="Hi there"
echo $MY_VAR
# easier to use double quotes all the time than to remember when they are needed
# https://unix.stackexchange.com/questions/68694/when-is-double-quoting-necessary
echo "$MY_VAR"

echo
echo "~~BUILTIN VARIABLES~~"
echo
echo "Last program's return value: $?"
echo "Script's PID: $$"
echo "Number of arguments passed to script: $#"
echo "All arguments passed to script: $@"
echo "Script's arguments separated into different variables: $1 $2..."

# Expansion 
echo
echo "~~PATHNAME EXPANSION~~"
echo
# Use glob patterns, like `*` and `?` to expand pathnames
echo "Files ending with .sh:"
ls *.sh
echo "Files with 'package', a single char, then 'json'"
ls package?json

echo
echo "~~COMMAND SUBSTITUTION~~"
echo
echo "I'm in $(pwd)"

echo
echo "~~PARAMETER EXPANSION~~"
echo
time=23.73
# How do we add an 's' to the end of the time var?
echo "Your time is $time."
# times var isn't defined: This prints "Your time is ."
echo "Your time is $times."
# use ${} to specify variable name: "Your time is 23.73s."
echo "Your time is ${time}s."
# Use parameter expansion operations within ${}: "Your new time is 25.73s"
# One example is `/`: ${parameter/pattern/replacement}
echo "Your new time is ${time/3/5}s."

echo
echo "~~ARITHMETIC EXPANSION~~"
echo
echo "Your sum is $(( 5 + 2 ))."

echo
echo "~~CONDITIONALS~~"
echo
# if list
# then list
# elif list
# else list
# fi
# `if` evaluates the command list. In the below case it's `ls`.
# If the command list's final exit code is 0 (success),
# then the first branch is executed
if ls
then
  echo "First branch executed"
else
  echo "Second branch executed"
fi

# `[` is just a command, like `ls`
# It takes an expression and `]` as arguments, like
# [ 'hey' = 'hey' ]
# The expression is evaluated. If it evaluates to true, `[` returns a 
# zero exit status. How convenient...
[ 'hey' = 'hey' ]
echo "Exit code: $?" # --> "Exit code: 0"

if [ 'hey' = 'hey' ]
then
  echo "First branch exec'd"
else
  echo "Second branch exec'd"
fi

# Type `man test` to see all operators available to `[`
# Some examples:
# -f file    True if file exists and is regular file
# s1 = s2    True if strings s1 and s2 are identical
# n1 -eq n2  True if integers n1 and n2 are algebraically equal
if [ -f start.sh ]
then
  echo "start.sh exists!"
fi

# You can use && and ||
if [ 3 -eq 0 ] || [ -f start.sh ] 
then
  echo "At least one is true!"
fi

# Double quote to "safely" handle potentially empty variables
# If $FOO is empty and unquoted, this is interpreted like [ = "Jim" ]
# IF $FOO is quoted, this is interpreted like [ "" = "Jim" ]
[ $FOO = "Jim" ] # --> Syntax error
[ "$FOO" = "Jim" ]

# `[[` is bash improvement to `[`
# It's a bash extension, so if you are writing sh-compatible scripts then you 
# need to stick with `[.`
# Make sure you have the `#!/bin/bash` shebang line for your script if you
# use double brackets
