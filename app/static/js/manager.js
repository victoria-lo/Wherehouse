/* manager.js - Theatre blocking JavaScript */
"use strict";
console.log('manager.js')  // log to the JavaScript console.

// Function to remove all blocking parts from current window
function removeAllBlocks() {
	blocks.innerHTML = '';
}

function getBlockingDetailsOnScreen() {

	// this array will hold
	const allBlocks = []

	// go through all of the script parts and scrape the blocking informatio on the screen
	for (let i = 0; i < blocks.children.length; i++) {
		const block = {};  const blockElement = blocks.children[i]
		block.part = i + 1;
		block.text = blockElement.children[1].textContent;
		block.actors = []
		const actors = blockElement.children[2].children
		for (let j = 0; j < actors.length; j++) {
			block.actors.push([actors[j].textContent, actors[j].children[0].value])
		}
		allBlocks.push(block)
	}

	// Look in the JavaScript console to see the result of calling this function
	return allBlocks;
}

function addCastingToScreen(roles, casts) {

    const html = `<h4>Castings</h4>
      <div class='actors'></div>`

    const block = document.createElement('div')
    block.className = 'col-lg-12'
    block.innerHTML = html;
    for (let j = 0; j < roles.length; j++) {
    	const actorHtml = `${roles[j]}: <input id='scriptText' style="width: 100px;" type="text" name="" value="${casts[j]}">`
    	const actorContainer = document.createElement('p');
    	actorContainer.innerHTML = actorHtml;
    	block.children[1].appendChild(actorContainer)
	}
    console.log(block)
    blocks.appendChild(block)
}

function addSoundBlock(scriptText, startChar, endChar, sfx) {
    const scriptPartText = scriptText.slice(startChar, endChar + 1);
	const part = blocks.children.length + 1

	let html = `<h4>Part ${part}</h4>
          <p><em>"${scriptPartText}"</em></p>
		  <p>Background Sound/Music: <input id='scriptText' style="width: 100px;" type="text" name="" value="${sfx}"></p>` 

    const block = document.createElement('div'); block.className = 'col-lg-12';
    block.innerHTML = html;
    blocks.appendChild(block)
}

function getCasting() {
    removeAllBlocks();
	const scriptNumber = scriptNumText.value;
	console.log(`Get casting for script number ${scriptNumber}`)

    const url = '/script/' + scriptNumber;
    return fetch(url)
		.then((res) => {
			return res.json()
		})
		.then((jsonResult) => {
			console.log('Result:', jsonResult)
			const parts = jsonResult['parts'];
            const actors = jsonResult['actors'];

            const castings = [];
            const roles = [];
            const casts = [];
			for (let i = 0; i < parts.length; i++){
                const positions = jsonResult['blocking'][i];
				for (const [key, value] of Object.entries(positions)){
                    if (!castings.includes(actors[key])) {
                        castings.push(actors[key])
                        roles.push(actors[key][0])
                        casts.push(actors[key][1])
                    }
				}
            }
            addCastingToScreen(roles, casts);
		}).catch((error)=> {
			console.log("An error occurred with fetch:", error)
		})

}

function getSound() {
    removeAllBlocks();

	// Get the script and actor numbers from the text box.
    const scriptNumber = scriptNumText.value;
    
	console.log(`Get blocking for script number ${scriptNumber}`)
	/* Add code below to get JSON from the server and display it appropriately. */
    const url = "/script/" + scriptNumber;
    
	console.log(url)
	// A 'fetch' AJAX call to the server.
	return fetch(url)
		.then((res) => {
			//// Do not write any code here
			return res.json()
			//// Do not write any code here
		})
		.then((jsonResult) => {
			// This is where the JSON result (jsonResult) from the server can be accessed and used.
			console.log('Result:', jsonResult)
			// Use the JSON to add a script part
			const scriptText = jsonResult['script'] // the script
			const parts = jsonResult['parts'] // a list: each element is a list [startChar, endChar]
			const sound = jsonResult['sound']
			
			for (let i = 0; i < parts.length; i++) {
				const sfx = sound[i]
				const startChar = parts[i][0]
				const endChar = parts[i][1]
				addSoundBlock(scriptText, startChar, endChar, sfx)
			}
		}).catch((error) => {
			// if an error occured it will be logged to the JavaScript console here.
			console.log("An error occured with fetch:", error)
		})
}

function updateValues() {
	const url = "/script";
	const screen_info = getBlockingDetailsOnScreen();

}