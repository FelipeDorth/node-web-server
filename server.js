const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log +'\n',(err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  console.log(log);
  next();
});





hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome!!'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/home', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome!!'
  });
});

app.get('/maintenance', (req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome!!'
  });
  // setTimeout(() => {
  //   res.render('help.hbs', {
  //     pageTitle: 'Help Page',
  //     currentYear: new Date().getFullYear()
  //   });
  // }, 3000);
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: 'Help Page',
    currentYear: new Date().getFullYear()
  });
});


app.get('/bad', ( req, res) => {
  res.send({
    errorMessage: 'Deu erro mano...'
  });
});


app.listen(port, () => {
  console.log(`Serving is up on port ${port}`);
});
