import express from "express"; // bring in express and required mmodules

// intialise express ap variable
const app = express();

// Intialise Middleware
// Setup the server to handle json data
// setup server to handle urlencoded data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
// can be post,get,put,delete
app.get("/", (req, res) => {
  // Log the path and request
  console.log("/ - GET Request,Response");
  // use res.send to output a response
  res.status(200).send("Home Page of Bob's Garage");
});

app.get("/test", (req, res) => {
  console.log("/test - GET - Request,Response"); // log the ptaht and request
  // send response
  res.status(200).send("I am Bob's Server and am ready for action");
});
//  Create Port Variable
const port = process.env.PORT || 3000;

// Listen for requests
app.listen(port, () =>
  console.log(`Bob's Garage Server is running on http:localhost:${port}`),
);
