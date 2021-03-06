// import the neccessary libraries
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

// configure express server
app.use(express.static("./"));
app.use(express.json());
const port = 3001;

// configure database connection
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = "mongodb://localhost:27017/";

// configure security parameters
const saltRounds = 10;

// get request at root
app.get("/", (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("/index.html");
});

// insert new highscore
app.post("/highscore", async (request, response) => {

  // receive and log the highscore data from the
  let highscore = request.body;
	console.log("Inserting highscore: " + JSON.stringify(highscore));

  // connect to the database and insert the highscore data
  let db = await MongoClient.connect(url);
  let result = await db.db("flextinder")
  .collection("flex").insertOne(highscore);

  // log the the result and send response to client
  console.log("Inserted: " + JSON.stringify(highscore))
  response.json(highscore);

  // close the database
  db.close();
});

// get specific highscore by username
app.get("/highscore/:username", async (request, response) => {
	
  let username = request.params;
  console.log("Finding highscores by: " + JSON.stringify(username));

  let db = await MongoClient.connect(url);
  let result = await db.db("flextinder")
  .collection("highscores").find(username).toArray();

  console.log(result);
  response.json({highscores: result});
  db.close();
});

// get all highscores
app.get("/highscores", async (request, response) => {
	console.log("Finding all highscores... ");

  let db = await MongoClient.connect(url);
  let result = await db.db("flextinder")
  .collection("highscores").find({}).toArray();

  console.log(result);
  response.json({highscores: result});
  db.close();
});

// delete one highscore by id
app.delete("/highscore", async (request, response) => {

  let highscore = {_id: new ObjectID(request.body.highscoreID)};
	console.log("Deleting highscore by: " + JSON.stringify(highscore));

  let db = await MongoClient.connect(url);
  let result = await db.db("flextinder")
  .collection("highscores").deleteOne(highscore);

  console.log("Deleted: " + JSON.stringify(highscore));
  response.json(highscore);
  db.close();
});

//updating highscore
app.put("/highscore", async (request, response) => {

  let oldHighscore = {_id: new ObjectID(request.body.highscoreID)};
  let newHighscore = { $set: {highscore: request.body.highscore}};
	console.log("Updating highscore of " + JSON.stringify(oldHighscore) +
  " to:" + JSON.stringify(newHighscore));

  let db = await MongoClient.connect(url);
  let result = await db.db("flextinder")
  .collection("highscores").updateOne(oldHighscore, newHighscore);

  console.log("Updated highscore of " + JSON.stringify(oldHighscore) +
  " to:" + JSON.stringify(newHighscore));
  response.json(request.body);
  db.close();
});

// new user signup
app.post("/user/signup", async (request, response) => {

  // hash the password
  let hash = await bcrypt.hash(
    request.body.password, saltRounds);

  console.log(
    "Inserting new user: " +
    request.body.username + ", " + hash
  );
    

  // connect to the database
  let db = await MongoClient.connect(url);

  let dbo = db.db("flextinder");
  let myobj = {
        username: request.body.username, 
        hash: hash
  };

  // try to insert the new user
  try {
    let result = await dbo.collection("users").insertOne(myobj);
    console.log("Created user:", myobj)
    response.json(myobj);
  }
  catch (error){
    console.log("Username occupied:", myobj)
    response.json({message: "Username occupied"});
  }

  db.close();
});

// user login
app.post("/user/login", async (request, response) => {

  let passwordIsCorrect = await checkPassword(
    request.body.username,
    request.body.password
  );

  // normally return an authentication token here
  if(passwordIsCorrect) response.json({loginWasSuccessful: true});
  else response.json({loginWasSuccessful: false});
  
});

app.delete("/user", async (request, response) => {

  try {
    console.log("Deleting user: " + request.body.name);

    let passwordIsCorrect = await checkPassword(
      request.body.username,
      request.body.password
    );

    if(!passwordIsCorrect) {
      response.json({message: "Deletion Unuccessful"});
      console.log("Deletion failed")
    }

    let db = await MongoClient.connect(url);
    let dbo = db.db("flextinder");
    let myquery = {username: request.body.username};
    let result = dbo.collection("users").deleteOne(myquery);
    
    console.log("Deleted: " + JSON.stringify(myquery));
    response.json({
      message: "Successfully deleted",
      user: myquery.username
    });
    db.close();
  }
  catch(error) {
    console.log(error);
  }
});

async function checkPassword(username, password) {


    let db = await MongoClient.connect(url);
    let dbo = db.db("flextinder");

    let result = await dbo.collection("users")
    .find({username: username}).toArray();

    let isPasswordCorrect;
    if (result[0] != undefined)
    isPasswordCorrect = await bcrypt
    .compare(password, result[0].hash);
    else isPasswordCorrect = false;

    db.close();
    return isPasswordCorrect;
}


// start server
app.listen(port, () => console.log("Listening on port " + port));
