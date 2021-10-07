#####
# Printing
#####
puts 'PRINTING'

# print: no newline
print 'Stay on this line!'
print 'ok fine.'

# puts: ends with a newline
puts 'im outta here.'
puts 'a fresh start!'

# print: prints the array all at once
zeroes = [0, 0, 0, nil, 0]
print zeroes

# puts: prints each value on its own line
# puts: converts values to string (nil converts to empty string)
puts zeroes

#####
# String
#####
puts 'STRINGS'

# String interpolation with double quotes and #{}
secret = 'pswrd'
phrase = "My secret is #{secret}"
puts phrase

#####
# Arrays
#####
puts 'ARRAYS'

ships = ['pirate', 'space', 'ufo', 'relation'] # or %w[pirate, space, ufo, relation]

puts 'first: ' + ships.first
puts 'last: ' + ships.last

ships << 'friend' # or use .push

ships.include? 'friend' # true

ship_lengths = ships.map do |word| # .collect is equivalent to .map
  word.length
end

puts ship_lengths # [ 6, 5, 3, 8, 6 ]

puts ship_lengths[10] # non-existent elements are nil. Note that we can print nil but it is blank space in terminal

puts 'intersection: ' + ([1, 2, 3] & [2, 3, 4]).to_s

#####
# Hashes
#####
puts 'HASHES'

# Numbers as keys
{ 1 => 'eins', 2 => 'zwei', 3 => 'drei' }
# Symbols as keys
dictionary = { :one => 'eins', :two => 'zwei', :three => 'drei' }

# Note that we have spaces around { } but not []

# Fetch raises an error, [] does not
puts dictionary[:one]
puts dictionary.fetch(:one)
# puts dictionary.fetch(:nonexistent)

# New colon syntax also uses Symbols as keys
dictionary_copy = { one: 'eins', two: 'zwei', three: 'drei' }

# Check for keys
dictionary.has_key? :one

dictionary.key? :two

#####
# Blocks
#####
puts 'BLOCKS'

2.times do
  str = 'hej hej'
  puts str
end

# {} can replace a block, but prefer to use it for one-liners only
2.times { puts 'Hello there!' }

# do...end block with argument, surrounded by pipes ||
[900, 902, 903].each do |num|
  puts num
end

# map, when not passed a block, returns an iterator object, allowing method chaining
# with_index can be called on iterator objects
# you'll see this in documentation "If no block is given, an Enumerator is returned instead."

growers = [1, 1, 1, 1, 1].map.with_index do |num, index|
  num + index
end

p growers