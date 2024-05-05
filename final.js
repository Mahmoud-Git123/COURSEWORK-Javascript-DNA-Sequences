"use strict";

const testlib = require( './testlib.js' );

 let dataVariable = [];
 let patternsObject = {};

 //Used a dictionairy object to map all the DNA nucleotides equivalences
const equivalences = {
	'A': 'A',
	'C': 'C',
	'T': 'T',
	'G': 'G',
    'R': ['R', 'A', 'G'],
    'Y': ['Y', 'T', 'C'],
    'K': ['K', 'G', 'T'],
    'M': ['M', 'A', 'C'],
    'S': ['S', 'G', 'C'],
    'W': ['W', 'A', 'T'],
    'B': ['B', 'G', 'T', 'C'],
    'D': ['D', 'G', 'T', 'A'],
    'H': ['H', 'A', 'T', 'C'],
    'V': ['V', 'G', 'A', 'C'],
    'N': ['N', 'A', 'G', 'T', 'C']
};


testlib.on( 'ready', function(patterns) {
	patternsObject = patterns; //setting patternObject to have all the patterns input
	testlib.runTests();
});

testlib.on( 'data', function( data ) {
	 dataVariable.push(data); //pushing all the data input into an array (datavariable)
});

testlib.on('reset', function(){
    tasks(); //calling function
});

testlib.on('end', function(){
    tasks(); //calling function
});

function tasks(){
	const patternCounter = {}; //counter to count matches found
	Object.values(patternsObject).forEach(patternElement => {
		patternCounter[patternElement] = 0;
	});

	let count = 0;
	let combinationFromData = "";
	let dataCount = 0;

	dataVariable.forEach((dataCharacter, index) => {
        if (index < (dataVariable.length - 1) ){
            Object.values(patternsObject).forEach(patternElement => { //goes through the patterns object (loops for every pattern)
                let letterCount=0;
                let temp = index;
                Object.values(patternElement).forEach(letter => { //goes through each letter in each pattern
                    let length = patternElement.length;
                    if (equivalences[dataVariable[temp]] && equivalences[letter].includes(dataVariable[temp])){ //checks letter by letter if data letter matches pattern letter
                        letterCount++;

                        if(letterCount === patternElement.length){ //check if all the letters matched , match a pattern
                            testlib.foundMatch(patternElement, index); //TASK 2
                            patternCounter[patternElement]++;								
                            return;
                        } 
                        else if(letterCount > patternElement.length){ //if the number of letters is higher than the pattern length then return
                            return;
                        }
                        else{
                            temp++
                        }
                    }
                    else{
                        return;
                    }

                });
            });
        }
	});
			
	
	testlib.frequencyTable(patternCounter); //TASK 1
	dataVariable = [];
}

testlib.setup(3);
