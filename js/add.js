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

	if(itemName !== ""  && itemQty !=="" && itemWarehouse !==""){
		const data = [items.length+1, itemName, itemQty, itemWarehouse];
		items.push(data);
		console.log("Added "+data);
		localStorage.setItem('data', JSON.stringify(items));
	}
	else{
		console.log("Missing Values");
	}
	
	document.getElementById("addForm").reset();

}

document.addEventListener('DOMContentLoaded', init);