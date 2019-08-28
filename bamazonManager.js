require ('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');

const arrChoice = [
    'View Products for Sale',
    'View Low Inventory',
    'Add to Inventory',
    'Add New Product'
];

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "userDB",
	password: "Jamaica1998!",
	database: "bamazon_db"
});

const table = (res) => console.table(res);
const tableResults = (query, callback = table) => {
    connection.query(
        query,
        (err, res) => {
            if(err) throw err;
            else callback(res);
        }
    );
    connection.end();
}

const productAmount = () => {
    tableResults(`
    SELECT item_id, product_name, price, stock_quantity
    FROM products;`
    );
};

const lowInventory = () => {
    tableResults(`
    SELECT item_id, product_name, price, stock_quantity
    FROM products
    WHERE stock_quantity < 5;`
    );
};

const inventoryAdded = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the product id that would like like to add today.',
            validate: function (input){
                if (!isNaN(input) && input.length > 0){
                    return true;
                } else{
                    console.log('It must be a valid id.')
                    return false;
               } 
            }
        },
         {
            type: 'input',
            name: 'quantity',
            message: "Enter the amount you would like to add to the inventory, please!",
            validate: (input) => {
                if (!isNaN(input) && input.length > 0){
                    return true;   
            } else{
                console.log('You must have a valid amount.')
                return false;
            } 
        }
    }
])
.then((validInput) => {
    connection.query(`
    UPDATE products 
            SET stock_quantity = stock_quantity + ${Math.abs(parseInt(validInput.quantity))}
            WHERE item_id = ${validInput.item_id}`,
            (err, res) => {
                if (err) console.log(err);
                else console.log(
                    'You have just added this item into the inventory.'
                    );
                });
                connection.end();
            });
        };

const addProduct = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Enter product name.',
            validate: function(input){
                if (input.length > 0) {
                    return true;
                } else {
                    console.log('You must enter a valid product name');
                    return false;
                } 
            }
        },
        {
            type: 'list',
            name: 'department_name',
            message: "Please select a department.",
            choices: [
                'Electronics',
                'Liquor',
                'Shoes',
                'Music'
            ]
        },
        {
            type: 'input',
            name: 'price',
            message: 'Please insert the price here in this format $(xx.xx)',
            validate: function(input){
                if (/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(input)) return true;
                else console.log('You must put a valid number.');
                

            }

        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Input the quantity of the new item',
            validate: function(input) {
                if (!isNaN(input) && input.length > 0) {
                    return true;
                } else {
                    console.log('\n You must enter a valid quantity')
                    return false;
                } 
            }
        }
    ]).then((itemAdded) => {
        connection.query(`
        INSERT INTO products (product_name, department_name, price, stock_quantity)
        VALUES ('${itemAdded.product_name}', '${itemAdded.department_name}', ${parseInt(itemAdded.price)},${parseInt(itemAdded.stock_quantity)});`,
        (err, res) => {
            if (err) console.log(err);
            else console.log('You have added this product into the inventory')
        });
        connection.end();
    });
};

const selectionChosen = (selectView) => {
    switch (selectView) {
        case arrChoice[0]:
            return productAmount();
        case arrChoice[1]:
            return lowInventory();
        case arrChoice[2]:
            return inventoryAdded();
        case arrChoice[3]:
            return addProduct();
        default:
            console.log("Well I don't know what happened.");
    }
};

(() => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectView',
            message: 'Welcome to work, what are your task for the day?',
            choices: arrChoice
        },
    ]).then((input) => {
        selectionChosen(input.selectView)
    });
})();