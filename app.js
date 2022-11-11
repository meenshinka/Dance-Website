const express = require("express");
const connectToMongo = require('./db')
const User = require('./model')
const path = require("path"); 
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
connectToMongo();

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));


// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})

app.get('/contact', (req, res)=>{ 
    res.status(200).render('contact.pug');
})



app.post('/contactForm' , async (req, res)=>{
   
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const Phone = req.body.Phone;

  var user = await User.create({
        name:name,email:email,age:age,Phone:Phone
  })

  user.save();
  console.log(name,email,age,Phone)
  res.status(200).send("data saved");

})

    

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});