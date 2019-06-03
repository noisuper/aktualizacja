const execSync = require('child_process').execSync
const express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');

const app = express()
const port = 6969


app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'keyboard cat',   saveUninitialized: true, cookie: { maxAge: 60000 }}))

var router = express.Router();
router.get('/', function (req, res, next) {  
  console.log(req.session);
  if(req.session){
    if (req.session.loginname) next();
    else res.redirect('/login.html');
  } else {
    res.redirect('/login.html');
  }
  //next();
});
app.use(router);

app.use(express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var stan = false;
var licznik = 0;


function checkPass(login,password){
  if(login=="login"&&password=="haslo123"){
    return true;
  }else{
    return false;
  }
}

app.post('/login',(req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  console.log(login+" "+password);
  if(checkPass(login,password)){
    req.session.loginname=1;
    console.log(req.session.loginname);
    res.send('OK');
  }else{
    res.redirect('login.html');
  }
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
    res.send({state:stan});
    try {
      if (stan !== 'true'){
      execSync('echo "0" > /sys/class/gpio/gpio26/value');
    }
    else {
        execSync('echo "1" > /sys/class/gpio/gpio26/value');
    }
  } catch (error) {
    console.log(error.status);  // Might be 127 in your example.
    console.log(error.message); // Holds the message you typically want.
    console.log(error.stderr);  // Holds the stderr output. Use `.toString()`.
    console.log(error.stdout);  // Holds the stdout output. Use `.toString()`.
  }

    
    
    
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
