const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return value > 0; // Age must be a positive number
      },
      message: 'Age must be a positive number',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
    validate: {
      validator: (value) => {
        // Use a regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  courses: [
    {
      name: String,
      grade: {
        type: Number,
        validate: {
          validator: (value) => {
            return value >= 0 && value <= 100; // Custom validation for grade (between 0 and 100)
          },
          message: 'Grade must be between 0 and 100',
        },
      },
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);