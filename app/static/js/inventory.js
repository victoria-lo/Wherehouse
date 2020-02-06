"use strict";

var items = new Array();
const inventoryTable = document.querySelector('#inventory-data');

function loadInventory(){
	var str = localStorage.getItem('data');
	if(str!=null){
		items = JSON.parse(str);
		console.log(items);
		populateInventory(items);
	}
}

//function runs when page loads, json is a multi-dimensional array
function populateInventory(items){

	//clear the table HTML by removing the first child if it exists
	while (inventoryTable.firstChild){
		inventoryTable.removeChild(inventoryTable.firstChild);
	}

	//Populate table by looping through each array in the arrays
	items.forEach((row) => {
		const tr = document.createElement("tr"); //create a new row for each row

		row.forEach((cell)=>{
			const td = document.createElement("td"); //create a new cell
			td.textContent = cell;
			tr.appendChild(td); //append each cell to the row
		});

		inventoryTable.appendChild(tr); //append each row to the tbody
	});
}

document.addEventListener('DOMContentLoaded', () => {loadInventory();});

