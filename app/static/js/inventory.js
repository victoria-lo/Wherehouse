"use strict";

//initialize objects and global variables
let numberOfItems = 0;
let numberOfWarehouses = 0; 
const itemData = [];
const warehouseData = [];

//Item
class Item {
	constructor(name, quantity, warehouse) {
		this.name = name;
		this.quantity = quantity;
		this.warehouse = warehouse; //warehouse object
		// set item ID
		this.itemId = numberOfItems;
		numberOfItems++;
    }
}
//Warehouse
function Warehouse(capacity) {
	this.items = [];
	this.capacity = capacity; //total capacity
	
	//storage = sum of all item quantity, init as 0
	this.storage = 0;

	this.warehouseId = numberOfWarehouses;
	numberOfWarehouses++;
}

//calculates the total storage used in the warehouse
Warehouse.prototype = {
	getStorage: function(){
		for(let i = 0; i < this.items.length; i++){
			this.storage += this.items[i].quantity;
		}
		return this.storage;
	}
}
//To get the storage of a warehouse, warehouseData[0].getStorage()

//initial data item[0]
function init(e){
	if(itemData.length < 1){
		itemData.push(new Item('Ice Cream', 65, 0));
	
		warehouseData.push(new Warehouse(450)); //warehouse 0
		warehouseData.push(new Warehouse(650)); //warehouse 1
		warehouseData.push(new Warehouse(500)); //warehouse 2
		warehouseData.push(new Warehouse(250)); //warehouse 3
		warehouseData.push(new Warehouse(1000)); //warehouse 4
	
		warehouseData[0].items.push(itemData[0]); // push item[0] to items list in warehouse 0
	}

}



