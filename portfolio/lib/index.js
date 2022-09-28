const express = require('express');
const app = express();

// adding a piece of middleware
app.use(express.json())

// temporary array to represent a database
const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

/*
methods available through app
app.get()
app.post()
app.put()
app.delete()
*/


// building end points
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// passes value through html 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)  res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// passes value through html 
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and minimum characters of 3');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // validate
    // if invalid, return 400 - bad request
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and minimum characters of 3');
        return;
    }

    // update course
    course.name = req.body.name;
    // return the update course
    res.send(course);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port + '...');
});