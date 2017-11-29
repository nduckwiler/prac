const Author = require('../../models/author');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Author', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#first_name', () => {
    it('is a String', () => {
      const firstNameAsInt = 1;
      const familyNameAsInt = 1;
      const phone = '555-555-5555';

      const author = new Author({
        first_name: firstNameAsInt,
        family_name: familyNameAsInt,
        phone: phone
      });

      assert.strictEqual(author.first_name, firstNameAsInt.toString());
    });

  });
});
