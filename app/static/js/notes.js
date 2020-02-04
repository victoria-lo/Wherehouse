/* Making our own JS Library - jQuery clone */
"use strict";
console.log("JS Lib");

//One way to make a lib is by making a function that returns an obj
//function to manipulate some kind of DOM element using vanilla JS
/* What we need to make a simple DOM manipulator:
1. selector
2. element
3. methods
*/
function $$$(selector){
    const _self = {}
    _self.selector = selector; //impt step

    //manipulate some kind of elem
    _self.element = document.querySelector(selector);

    //method
    _self.text = function(){
        return _self.element.innerText
    }

    _self.addClass = function(className){
        if(!_self.element.classList.contains(className)){
            _self.element.classList.add(className)
        }
        
    }

    //one method can have 2 behaviours
    _self.attr = function(name, value){
        if(!value){
            return _self.element.getAttribute(name) //get the attribute
        }else{
            _self.element.setAtrribute(name,value) //set the attribute
        }   
    }

    return _self;
}

//different way: creating an obj constructor and adding to its prototype
// making somehting using the 'new' keyword
// for jQuery, you only need 1 instance of it but sometimes you may need many instances of a library
// to do different things at once

//A Circle Generator Library

function CircleGenerator(){
    this.circles = [] 
    //use the 'this' keyword this time because we are using a constructor function. It is going to be bound to
    //the new obj we are making. So each CircleGenerator have its own circles array.

}

//use prototype so all instances of CircleGenerator will share the functions when created
CircleGenerator.prototype = {
    makeCircle: function(){
        const circle = document.createElement('div')
        circle.style = 'width: 60px; height: 60px; backgroundColor: Aqua'
        const body = document.querySelector('body');
        body.append(circle);

        this.circles.push(circle);
    },

    changeCirclesColor: function(){
        for(let i = 0; i < this.circles.length; i++){
            this.circles[i].style.backgroundColor = 'darkmagenta'
        }
    }
}

const cg = new CircleGenerator()
// cg.makeCircle() will generator a circle
//cg.changeCirclesColor will change all circles in the array to dark Magenta

//Nodejs allows us to run JS without a browser
//It is a JS runtime environment
