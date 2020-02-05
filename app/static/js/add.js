//Adds inventory the itemData and push item to warehouseData
function addInventory(){

	var itemName = document.getElementById("itemName").value;
	var itemQty = document.getElementById("itemQty").value;
	var itemWarehouse = document.getElementById("warehouse").value;

	var newItem = new Item(itemName, itemQty, itemWarehouse);
	itemData.push(newItem);
	console.log("Added "+ itemQty+ " "+ itemName +" into warehouse " + itemWarehouse);

}