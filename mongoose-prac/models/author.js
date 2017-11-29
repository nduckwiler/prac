const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
		family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}, // this is a path of type Date
    // phone uses a custom validator
    // if a validation error is thrown, you can assert the value of 
    // err.errors.phone.message, ...kind, ...path, ...value
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
      },
      required: [true, 'Phone number required']
    }
  }
);

// Adds an instance method to documents constructed from Models compiled from this schema
AuthorSchema.methods.identify = function(callback) {
  return this.model('Author').find({ first_name: 'Pat' }, callback);
}

// Adds an instance method to documents constructed from Models compiled from this schema
AuthorSchema.method('sayName', function() {
  console.log('sayName method called with first name: ' + this.first_name);
});

// Add query helper function, which is like an instance method for mongoose queries
AuthorSchema.query.byName = function(name) {
  return this.find({ first_name: new RegExp(name, 'i') });
};

// Adds a static method to a Model
// TODO

// Virtuals are document properties that do not get persisted to MongoDB
// Useful for formatting, combining, or de-composing fields
// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

module.exports = mongoose.model('Author', AuthorSchema);
