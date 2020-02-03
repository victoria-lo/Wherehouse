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
class Warehouse {
	constructor(capacity) {
        this.items = [];
        this.storage // function, sum of all item.quantity

		this.capacity = capacity; //total capacity
		// set item ID
		this.warehouseId = numberOfWarehouses;
		numberOfWarehouses++;
    }
}

//initial data
itemData.push(new Item('Ice Cream', 65, 0));
itemData.push(new Item('Food', 145, 0));
itemData.push(new Item('Books', 476, 1));
itemData.push(new Item('Camera', 42, 1));
itemData.push(new Item('Pen', 300, 2));
itemData.push(new Item('Hats', 420, 2));
itemData.push(new Item('Chairs', 100, 4));

warehouseData.push(new Warehouse(450));
warehouseData.push(new Warehouse(650));
warehouseData.push(new Warehouse(500));
warehouseData.push(new Warehouse(250));
warehouseData.push(new Warehouse(1000));