//views are webpages
//layouts are templates
// stock market portfolio app by: delroy jordan
const express = require('express'); // pull express into app
const app = express(); //create instance
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
// when you need top run node server asnd tell app what port to listern to
const PORT = process.env.PORT || 5000;
// use whatever the set port is or use 5000


//use body parser middleware....info used in middle of app
app.use(bodyParser.urlencoded({extended: false}));



//create call api function
function call_api(finishedAPI, ticker){

	//API key: pk_de6d5482daf942ef8b2f8f73f694c38c 

	request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_de6d5482daf942ef8b2f8f73f694c38c', 
	{json: true}, (err, res, body) => {
		if (err) {return console.log(err);}
		//200 means good
		if(res.statusCode === 200){
			//console.log(body);
			finishedAPI(body);
		};
	});
}



//set handlbars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const otherstuff = "hello there this is other stuff"
//create route
//set handlebar index get routes
// '/' means homepage
app.get('/', function(req, res){
	call_api(function(doneAPI){
		res.render('home', {	
		// we can pass things dirctly to our app
		stock: doneAPI
		});
	}, "fb");
	
});

//set handlebar index POST routes
// '/' means homepage
app.post('/', function(req, res){
	call_api(function(doneAPI){
		//posted_stuff = req.body.stock_ticker;
		res.render('home', {	
		// we can pass things dirctly to our app
		stock: doneAPI, 
		});
	}, req.body.stock_ticker);
	
});

// create about page route
app.get('/about.html', function(req, res){
	res.render('about');
});



// set static folder
app.use(express.static(path.join(__dirname, 'public')));






//tell app to listen to the port

app.listen(PORT, () => console.log('Server listening on port ' + PORT))

