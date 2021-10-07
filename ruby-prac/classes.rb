class Calculator
  def sum(number, other)
    number + other
  end

  def minus(number, other)
    number - other
  end

  def divide(number, other)
    # Will lead to integer-rounding if not converted to float
    number.to_f / other
  end
end

# Instantiate with "new"
calc = Calculator.new
calc.is_a?(Calculator) # true

# Notice above:
# new is a class method
# is_a? is an instance method

p calc.minus(10, 8)
p calc.divide(10, 8)

class Person
  # this runs every time you call Person.new
  # args are passed through to this method
  def initialize(name)
    @name = name
  end

  # attribute reader
  # in Ruby, "attribute" means "instance variable"
  def name
    @name
  end

  # attribute writer
  def password=(password)
    @password = password
  end

  # we can call an object's instance methods in here too
  # AKA instance methods have access to local method scope and object scope
  def greet(other)
    "Hi #{other.name}, I'm #{name}!"
  end

  # self is a keyword that refers to the current instance
  def greet2(other)
    name = other.name
    "Hi #{name}, I'm #{self.name}!"
  end
end

ada = Person.new('Ada')
# equivalent to ada.password=("super secret")
ada.password = 'super secret'

p ada # #<Person:0x00007ff8148cc530 @name="Ada", @password="super secret">

jill = Person.new('Jil')
p ada.greet(jill)
p ada.greet2(jill)
