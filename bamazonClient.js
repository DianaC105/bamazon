var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var table = new Table({
    head: ['id', 'product_name', 'customer_price', 'stock_quanity'],
    });
  

 require("console.table");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId + "\n");
  // start();
  readData();

  // //   runSearch();

});


//Read data base
readData()

function readData() {
    console.log ("Welcome To The Bamazon Store");
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].customer_price, res[i].stock_quantity])
      }
    //   console.log(Table.toString());
     console.table(res);

// functin enterStore(query){
  inquirer 
     .prompt([
      {
        name: "id",
        type: "input",
        choices:"id",
        message: "Type in the ID of the item you would like to purchase:",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true
            } else {
                return false;
            }
        }
      },

      {
        name: "quantity",
        type: "input",
        choices: "stock_quantity",
        message: "How many units of this product would you like to buy?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true
            } else {
                return false;
            }
        }
      },
    ])
    .then(function(res) {
    var quantity = res.quantity;
    var itemId = res.id;
    connection.query('SELECT * FROM products WHERE ?', [{
        id: itemId
    }], function(err, chosenItem) {

        if (err) throw err;
        if (chosenItem[0].stock_quantity - quantity >= 0) {

            var orderTotal = quantity * chosenItem[0].customer_price;
            
            console.log('We have (' + chosenItem[0].product_name + ') in stock!');
            console.log('Quantity in stock: ' + chosenItem[0].stock_quantity + ' Ordered: ' + quantity);
            console.log('You will be charged a total of $' + orderTotal + '. Thank you for your order!');

            connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [chosenItem[0].stock_quantity - quantity, itemId],
                function(err, inventory) {
                    if (err) throw err;
                    enterOrder();
                })
        } else {
            console.log('Insufficient stock !!! ' + chosenItem[0].stock_quantity + ' ' + chosenItem[0].product_name);
            enterOrder();
        }
    });
});
});
}


function enterOrder() {
    inquirer.prompt([{
     name: "repurchase",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
    }]).then(function(res) {
        if (res.repurchase === 'Yes') {
            start();
        } else {
            console.log('Thank you for shopping with us. Have a great day! , come again!');
            connection.end();
        }
    })
}