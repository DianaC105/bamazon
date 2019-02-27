var mysql = require("mysql");
var inquirer = require("inquirer");

require("console.table");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

 connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId + "\n");
 // start();
  readData();

// //   runSearch();
 });


  //Read data base
  function readData (){
    console.log("Welcome to the BAMAZON Store \n");
    connection.query("SELECT * FROM products" , function(err,query){
      
      if (err) {
	      	throw err;
	} else {
      console.table(query);
		enterStore(query);

	}

    })
  }
  
  function enterStore (query){
    inquirer
    .prompt([
	{
		name: "id",
		type: "input",
		message: "Type in the ID of the item you would like to purchase:"
	},

  	{
		name: "quantity",
		type: "input",
		message: "How many units of this product would you like to buy?"
	}
    ])
  //   ]).then(response => {
	// console.log(query);
	// console.log(response.id);
	// console.log(response.quantity);
  //   })


.then(function(chosenItem){
  // gets information of the chosen item
  var chosenItem;
  for (var i = 0; i < results.length; i++){
    if (results[i].id ===answer.choice){
      chosenItem = results[i];
    }
  }
function updateStore(id,quantity){
  connection.query(
    "UPDATE auctions SET ? WHERE ?",
  [
{
  id: chosenItem.id
},
{
  quantity:answer.stock_quantity
}
  ],
  function (err){
    if (error) throw err;
    console.log ("Your purchase has been processed! Thank you!");
  })

}
});

