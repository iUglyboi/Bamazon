// require ('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Jamaica1998!",
	database: "bamazon_db"
});
    connection.query('Select * FROM products', (err,res) =>{
    if (err) console.log(err);
    else{
        console.table(res);
        propmtUserChoice();
    }
});

const orderAdded = (orderObject, itemQuery) => {
    connection.query(`
    UPDATE products 
    SET stock_quantity = stock_quantity - ${Math.abs(orderObject.quantity)}
    WHERE item_id = ${orderObject.itemID}`,
    (err, res) => {
        if (err) console.log(err);
        else{
            console.log(
                'You have now made a purchase!'
            );
            connnection.end();

        }
    });
};

const quanityCheck = (orderObject) => {
    connection.query(`
        SELECT * FROM products
        WHERE item_id = ${orderObject.itemID}`,
    (err, res) => {
        if (err) console.log(err);
        else if (res.length > 0){
            if (res[0].stock_quantity > orderObject.quantity) {
            orderAdded(orderObject,res[0]);
        }else console.log('Sorry we have to give you a raincheck?');
    }
    });
};

const userPurchased = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Enter product id that you would like to buy today, please!',
            validate: function (input){
                if (!isNaN(input) && input.length > 0){
                    return true;
                } else{
                    console.log('You have to put the right item id, please.')
                    return false;
               } 
            }
        },
         {
            type: 'input',
            name: 'quantity',
            message: "Please enter how many you would like you to buy.",
            validate: (input) => {
                if (!isNaN(input) && input.length > 0){
                    return true;   
            } else{
                console.log('You have to put the a valid amount')
                return false;
            }
        }
    }
    ])
     .then(
         (validInput) => quanityCheck(validInput)
    );
