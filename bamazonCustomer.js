require ('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
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
            if (res[0].stock_quanity > orderObject.quantity) {
            quanityCheck(orderObject,res[0])
        }else console.log('Sorry we have to give you a raincheck');