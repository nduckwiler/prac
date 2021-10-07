# Exercise
# Given the two hashes languages and dictionary, write a function that returns:
# de eins zwei drei
# en one two three
# es uno dos tres

dictionary = {
  :de => { :one => 'eins', :two => 'zwei', :three => 'drei' },
  :en => { :one => 'one', :two => 'two', :three => 'three' },
  :es => { :one => 'uno', :two => 'dos', :three => 'tres' }
}

def playing_with_words(dictionary)
  lines = []
  dictionary.each do |key, wordhash|
    lines.push(key.to_s + ' ' + wordhash.values.join(' '))
  end

  lines.join("\n")
end

puts playing_with_words(dictionary)
