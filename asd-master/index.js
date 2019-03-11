const execSync = require('child_process').execSync
const express = require('express')
var bodyParser = require('body-parser');

const app = express()
const port = 8080

app.use(express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var licznik = 0;
app.get('/', (req, res) => {
    res.send(`Liczę, i mam ${licznik}`);
    licznik++;
})

app.post('/lampka.html', (req, res) => {
    //console.log(req.body);
    res.redirect('lampka1.html');
    //execSync('echo "0" > /sys/class/gpio/gpio26/value');
    //licznik++;
})

app.post('/lampka1.html', (req, res) => {
    //console.log(req.body);
    res.redirect('lampka.html');
    //execSync('echo "1" > /sys/class/gpio/gpio26/value');
    //licznik++;
})

//execSync('echo "26" > /sys/class/gpio/export');
//execSync('echo "out" > /sys/class/gpio/gpio26/direction');

app.listen(port,
() => console.log(`Example app listening on port ${port}!`))