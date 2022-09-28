const express = require('express');
const app = express();

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
    res.send([1, 2, 3]);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port + '...');
})