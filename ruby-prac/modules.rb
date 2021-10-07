#####
# Import an existing module
#####

# use require to import a library/module
require 'digest'

class Vault
  def initialize(password)
    @password = password
  end

  def encrypted_password
    ## Digest is a module within the digest library
    ## SHA2 is a class in that module
    Digest::SHA2.hexdigest(@password)
  end
end

v = Vault.new 'doggy'
p v.encrypted_password

#####
# Define a new module
#####

module Sneeze
  def sneeze
    'achooo!'
  end

  VELOCITY = 24
end

# Add a module's methods and values to a class by "include"-ing the module
class Nose
  include Sneeze

  def sneeze_speed
    VELOCITY # or Sneeze::VELOCITY
  end
end

n = Nose.new
puts n.sneeze
puts n.sneeze_speed
