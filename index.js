//views are webpages
//layouts are templates
// stock market portfolio app by: delroy jordan
const express = require('express'); // pull express into app
const app = express(); //create instance
const exphbs = require('express-handlebars');
const path = require('path');


// when you need top run node server asnd tell app what port to listern to
const PORT = process.env.PORT || 5000;
// use whatever the set port is or use 5000


//set handlbars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const otherstuff = "hello there this is other stuff"
//create route
//set handlebar routes
// '/' means homepage
app.get('/', function(req, res){
	res.render('home', {
		// we can pass things dirctly to our app
		stuff: otherstuff
	})
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));






//tell app to listen to the port

app.listen(PORT, () => console.log('Server listening on port ' + PORT))

