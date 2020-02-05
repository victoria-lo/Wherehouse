"use strict";

function init(e){
    const addItem = document.querySelector('#addNewItem');
    addItem.addEventListener('click', addInventory);
}


//Adds inventory the itemData and push item to warehouseData
function addInventory(e){
    e.preventDefault();
	const itemName = document.getElementById("itemName").value;
	const itemQty = document.getElementById("itemQty").value;
	const itemWarehouse = document.getElementById("warehouse").value;

	//const newItem = new Item(itemName, itemQty, itemWarehouse);
	//itemData.push(newItem);
	console.log("Added "+ itemQty+ " "+ itemName +" into warehouse " + itemWarehouse);

}

document.addEventListener('DOMContentLoaded', init);