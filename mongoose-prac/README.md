# Getting Started

This README applies specifically to `mongoose-prac` node project.

Clone the repo.

```
https://github.com/nduckwiler/prac.git
```

Install dependencies.

```
npm install
```

# Documentation

Everything in Mongoose starts with a **Schema**. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

**Models** are fancy constructors compiled from our Schema definitions. Instances of these models represent documents which can be saved and retrieved from our database. All document creation and retrieval from the database is handled by these models.

Finding documents is easy with Mongoose, which supports the rich **query** syntax of MongoDB. Documents can be retrieved using each models find, findById, findOne, or where static methods.

```javascript
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
```

**Documents** are instances of its Model. Some actions on documents include retrieval, updating, validating, and overwriting. Read more on the [Mongoose guide](http://mongoosejs.com/docs/documents.html).
