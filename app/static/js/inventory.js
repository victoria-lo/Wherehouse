"use strict";

const inventoryTable = document.querySelector('#inventory-data');

function loadInventory(){
	const request = new XMLHttpRequest();

	request.open("get", "../data/inventory.json"); //request server to open json file
	
	//when the server response
	request.onload = () =>{
		try{
			const json = JSON.parse(request.responseText) //server will retrieve and responseText is the json

			//after getting the json, pass it into a different function to populate the table
			populateInventory(json); //populates the table via DOM
		}
		catch(e){
			console.warn("Cannot load");
		}
	}

	request.send(); //This sends the request
}

//function runs when page loads, json is a multi-dimensional array
function populateInventory(json){

	//clear the table HTML by removing the first child if it exists
	while (inventoryTable.firstChild){
		inventoryTable.removeChild(inventoryTable.firstChild);
	}

	//Populate table by looping through each array in the arrays
	json.forEach((row) => {
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

