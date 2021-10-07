# Exercise
# Given the two hashes languages and dictionary, write a function that returns:
# In German, one means eins, two means zwei, three means drei. In Spanish, one means uno, two means dos, three means tres.
# Note that this uses newer hash syntax (none of these =>)
languages = {
  de: 'German',
  en: 'English',
  es: 'Spanish'
}
dictionary = {
  de: { one: 'eins', two: 'zwei', three: 'drei' },
  en: { one: 'one', two: 'two', three: 'three' },
  es: { one: 'uno', two: 'dos', three: 'tres' }
}

def playing_with_words(languages, dictionary)
  result = ''
  languages.keys.each do |key|
    if key != :en
      result += 'In ' + languages[key] + ', '
      dictionary[key].each do |key, value|
        result += key.to_s + ' means ' + value
        if key != :three
          result += ', '
        end
      end
      result += '. '
    end
  end

  result.chop
end

puts playing_with_words(languages, dictionary)

# alternatively
def  playing_with_words_better(languages, dictionary)
  selected = languages.select do |key, _|
    key == :de or key == :es
  end
  lines = selected.map do |key, name|
    words = dictionary[key]
    parts = words.map { |key, word| "#{key} means #{word}" }
    "In #{name}, #{parts.join(', ')}."
  end
  lines.join(' ') # convert the array to string and return it
end

puts playing_with_words_better(languages, dictionary)
