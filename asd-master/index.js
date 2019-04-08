const execSync = require('child_process').execSync
const express = require('express')
var bodyParser = require('body-parser');

const app = express()
const port = 6969

app.use(express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var stan = false;
var licznik = 0;

app.get('/', (req, res) => {
  res.send(`Liczę, i mam ${licznik}`);
  licznik++;
})



app.get('/lampka', (req, res) => {
    // res.send(`Liczę, i mam ${licznik}`);
    // licznik++;
    res.send({state:stan});
})

app.post('/lampka', (req, res) => {
    console.log(req.body);
    stan = req.body.state;
    console.log(stan);
    //execSync('echo "1" > /sys/class/gpio/gpio26/value');
    //licznik++;
    res.send({state:stan});
})
app.post(`/update`, (req, res) => {
  console.log(req.body);
  code = execSync('git pull');
  res.send('Zrobilem aktualizacje')

})

  try {
     execSync('echo "26" > /sys/class/gpio/export');
     execSync('echo "out" > /sys/class/gpio/gpio26/direction');
   } 
   catch (error) {
     console.log(error.status);  // Might be 127 in your example.
     console.log(error.message); // Holds the message you typically want.
     console.log(error.stderr);  // Holds the stderr output. Use `.toString()`.
     console.log(error.stdout);  // Holds the stdout output. Use `.toString()`.
   }


app.listen(port,
() => console.log(`Example app listening on port ${port}!`))
