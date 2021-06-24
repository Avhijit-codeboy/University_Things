let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
//app.use(express.static(__dirname + "/home.html"));
app.use(express.static(__dirname+'/public'));
app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname+'/login.html'));
});
let connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Avhijit13",
	database:"Avhijit1"
});
connection.connect(err=>{
if(err) throw err;
console.log("Connected!");
});

app.post('/SignUp',(req,res)=>{
res.sendFile(path.join(__dirname+'/signup.html'));
});

app.post('/auth',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	//console.log(username);console.log(password);
	//console.log(req.session);
	if(username&&password){
		connection.query("Select * from logininfo where username=? and password=?",[username,password],
			(error,results,fileds)=>{
				if(results.length>0){
					//console.log(req.session);
					req.session.loggedin = true;
					req.session.username = username;
					res.redirect('/home');
				}else{
					res.send('Incorrect username or password!');
				}
				res.end();
			});
	}else{
		res.send("Please enter username and password");
		res.end();
	}
});

app.post('/registration',(req,res)=>{
	let username = req.body.username;
	let pass1 = req.body.password[0];
	let pass2 = req.body.password[1];
	if(pass1==pass2){
		connection.query("Insert into logininfo(Username,Password) values(?,?)",[username,pass1],(error,results,fileds)=>{
			if(error) throw error;
			res.redirect('/login');
		});
	}
	else{
		res.send('Passwords must match');
	}
	//res.end();
});
app.post('/scoresave',(req,res)=>{
	let score = req.body.score;
	let username = req.session.username;
	connection.query("update logininfo set score=? where username=?",[score,username],(error,results,fileds)=>{
		if(error)throw error;
	});
});
app.post('/scoreretrieve',(req,res)=>{
 let score = 0;
 let username = req.session.username;
 connection.query("select score from logininfo where username=?",[username],(error,results,fields)=>{
 	console.log(results.body.score);
 });
});
app.get('/login',(req,res)=>{
	res.sendFile(path.join(__dirname+'/login.html'));
});
//app.use(express.static('public'));
app.get('/home',(req,res)=>{
	//console.log(req.session.loggedin);
	if(req.session.loggedin){
	res.sendFile(path.join(__dirname+'/index.html'));
}
else{
	res.send("Please login");
}
});
app.listen(3000);