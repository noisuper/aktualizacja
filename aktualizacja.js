const express = require('express')
var bodyParser = require(`body-parser`);
const app = express()
const port = 3000
const execSync = require('child_process').execSync;

app.use(express.static(`public`))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => res.send('Hello World!'))
app.post(`/`, (req, res) => {
    console.log(req.body);
    code = execSync('git pull');

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))