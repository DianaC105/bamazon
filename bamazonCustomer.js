// Then create a Node application called `bamazonCustomer.js`. 
//Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

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

// connection.connect(function(err) {
//   if (err) throw err;
// //   readData();
// //   runSearch();
// });

function runSearch() {
  inquirer
    .prompt({
      name: "items",
      type: "list",
      message: "Items for Sale",
      choices: [
        "Item ID:112	Face Wash	$35.99",
        "Item ID:113	Face Toner	$15.99",
        "Item ID:114	Skirt	$10.99",
        "Item ID:115	button down shirt	$36.99",
        "Item ID:116	Yeezys	$299.99",
        "Item ID:117	water proof pants	$38.99",
        "Item ID:118	yoga pants	$39.99",
        "Item ID:119	Home Door Ring	$159.99",
        "exit"
      ],
    })
  
    //   name: "id",
    //   type: "input",
    //   message: "Type the ID of the product you would like to buy"

    // })
    // .then(function)(answer) {

    .then(function(answer) {
      switch (answer.action) {
      case "Type the ID of the item you would like to purchase":
        idSearch();
        break;

      case "How many units of this product would you like to buy":
        unitSale();
        break;
    };
  });

  //Read data base
  function readData (){
    connection.query("SELECT * FROM products"),
    function(err,query){
      
      if (err) {
	      	throw err
	} else {
		enterStore(query);

	}

    }
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

    ]).then(response => {
	console.log(query);
	console.log(response.id);
	console.log(response.quantity);
    })

}

readData();

}
    