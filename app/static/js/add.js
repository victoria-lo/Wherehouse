'use strict';

var items = new Array();

function loadInventory(){
	var str = localStorage.getItem('data');
	if(str!=null){
		items = JSON.parse(str);
		console.log(items);
	}
}

function init(e){
	e.preventDefault();
    const addItem = document.querySelector('#addNewItem');
	addItem.addEventListener('click', addInventory);
	loadInventory();
}


//Adds inventory the itemData and push item to warehouseData
function addInventory(e){
	e.preventDefault();
	
	const itemName = document.getElementById("itemName").value;
	const itemQty = document.getElementById("itemQty").value;
	const itemWarehouse = document.getElementById("warehouse").value;
	const data = [items.length+1, itemName, parseInt(itemQty), itemWarehouse];
	
	items.push(data);
	console.log(items);
	localStorage.setItem('data', JSON.stringify(items));

	document.getElementById("addForm").reset();

}

document.addEventListener('DOMContentLoaded', init);