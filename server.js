const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://saikishore:sai123@cluster0.bs3e7sq.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const Student = require('./models/student'); // Import your Student model

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('MongoDB Connection Established');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.get('/students/:name', async (req, res) => {
    const studentName = req.params.name;
  
    try {
      // Using the `findOne` method to query the database for the student by name
      const student = await Student.findOne({ name: studentName });
  
      if (!student) {
        return res.status(404).send('Student not found');
      }
  
      // Send the retrieved student as a JSON response
      res.json(student);
    } catch (err) {
      console.error(`Error finding student: ${err}`);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.post('/students', async (req, res) => {
  try {
    const { name, age, email,courses  } = req.body;

    // Create a new student instance
    const newStudent = new Student({
      name,
      age,
      email,
      courses
    });

    // Save the new student to the database
    const savedStudent = await newStudent.save();

    res.json(savedStudent); // Send the saved student as a JSON response
  } catch (error) {
    console.error(`Error creating student: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});