"use strict";

var items = new Array();
const warehouseTable = document.querySelector('#warehouse-data');

function loadInventory(){
	var str = localStorage.getItem('data');
	if(str!=null){
		items = JSON.parse(str);
		console.log(items);
	}
}

function init(e){
	e.preventDefault();
    const getWarehouse = document.querySelector('#warehouseLookup');
	getWarehouse.addEventListener('click', getInfo);
	loadInventory();
}

function getInfo(e){
    e.preventDefault();
	
    const warehouseId = document.getElementById("warehouseId").value;
    
    //show items data where warehouseID = user input warehouseID
    const showItems = [];
    for(let i = 0 ; i < items.length ; i++){
        if(items[i][3]== warehouseId){
            showItems.push(items[i]);
        }
    }
    
    console.log(showItems);
    //clear the table HTML by removing the first child if it exists
	while (warehouseTable.firstChild){
		warehouseTable.removeChild(warehouseTable.firstChild);
	}

    let storage = 0;
	//Populate table by looping through each array in the arrays
	for(let j = 0; j<showItems.length; j++){
		const tr = document.createElement("tr"); //create a new row for each row
        for(let i = 0; i< showItems[j].length-1; i++){
            if(i ==2){
                storage += parseInt(showItems[j][i]); // calculate storage used
            }
            const td = document.createElement("td"); //create a new cell
            td.textContent = showItems[j][i];
			tr.appendChild(td); //append each cell to the row
        }
		warehouseTable.appendChild(tr); //append each row to the tbody
    };
    
    let available = 1000 - storage;
    if(storage > 1000){ //if storage is greater than capacity
        available = "<strong>Overstocked!</strong>"
    }

    document.getElementById('storage').innerHTML = "Storage Used: " + storage;
    document.getElementById('available').innerHTML = "Storage Remaining: " + available;

}   
    

document.addEventListener('DOMContentLoaded', init);