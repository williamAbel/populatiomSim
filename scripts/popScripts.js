   var subBoxNumber = 0;
   var basePopRowNumber = 0;
   var subPop1RowNumber = 0;
   var subPop2RowNumber = 0;
   var subPop3RowNumber = 0;
   var subPop4RowNumber = 0;
   var subPop5RowNumber = 0;
   var subPop6RowNumber = 0;
   var subPop7RowNumber = 0;
   var subPop8RowNumber = 0;
   var subPop9RowNumber = 0;

class Population { 
	averageFertilityRate;
  constructor(averageFertilityRate, averageFertilityRateFirstDeriv, averageFertilityRateSecondDeriv, malePopulationArray, femalePopulationArray, deathProbabilityArray) {
    this.averageFertilityRate = averageFertilityRate;
    this.averageFertilityRateFirstDeriv = averageFertilityRateFirstDeriv;
    this.averageFertilityRateSecondDeriv = averageFertilityRateSecondDeriv;
    this.malePopulationArray = malePopulationArray;
    this.femalePopulationArray = femalePopulationArray;
    this.deathProbabilityArray = deathProbabilityArray;
  }
}
   
function getBaseSimulationData(data){
	var averageFertilityRate = 0;
	var averageFertilityFirstDeriv = 0;
	var averageFertilitySecondDeriv = 0;
	let simTime = 0;
	let malePopulationArray = [];
	let femalePopulationArray = [];
	let deathProbabilityArray = [];
   
	for (let [k, v] of data.entries()) { 
		if(k.includes("base") || k.includes("simTime")){
			switch(k){
				case 'baseAverageFertilityRate': averageFertilityRate = v;
					break;
				case 'baseAverageFertilityFirstDeriv': averageFertilityRateFirstDeriv = v;
					break;
				case 'baseAverageFertilitySecondDeriv': averageFertilityRateSecondDeriv = v;
					break;
				case 'simTime': simTime = v;
			}
		}else if(k.includes("female")){
			femalePopulationArray.push(v);
		}else if(k.includes("male")){
			malePopulationArray.push(v);
		}else if(k.includes("death")){
			deathProbabilityArray.push(v);
		}
	}
	const newPop = new Population(averageFertilityRate, averageFertilityRateFirstDeriv, averageFertilityRateSecondDeriv, malePopulationArray, femalePopulationArray, deathProbabilityArray);
	
	runBaseSimulation(newPop, simTime);
	
	console.log(malePopulationArray)
	console.log(femalePopulationArray)
	
	
	return 1;
}

function clearOldResults(){
	document.getElementById("maleOutPutBox").innerHTML = "";
	document.getElementById("femaleOutPutBox").innerHTML = "";
	document.getElementById("combinedOutPutBox").innerHTML = "";
}

function passYear(newPop){
	//make changes to the change in fertility rate
	newPop.averageFertilityRateFirstDeriv = parseFloat(newPop.averageFertilityRateFirstDeriv) + parseFloat(newPop.averageFertilityRateSecondDeriv);
	// make changes to fertility rate
	newPop.averageFertilityRate = parseFloat(newPop.averageFertilityRate) + parseFloat(newPop.averageFertilityRateFirstDeriv);
	fertilityNumber = (parseFloat(newPop.averageFertilityRate) / 40);
		   
	//male array from oldest to youngest
	for(let arrayPosition = (newPop.malePopulationArray.length - 1); arrayPosition >= 0; arrayPosition--){
		//check deaths
		let numberOfDeaths = 0;
		if(arrayPosition > newPop.deathProbabilityArray.length){
			for(let currentPerson = 0; currentPerson < newPop.malePopulationArray[arrayPosition]; currentPerson++){
				if(Math.random() < newPop.deathProbabilityArray[(newPop.deathProbabilityArray.length - 1)]){
					numberOfDeaths += 1;
				}
			}
		}else{
			for(let currentPerson = 0; currentPerson < newPop.malePopulationArray[arrayPosition]; currentPerson++){
				if(Math.random() < newPop.deathProbabilityArray[arrayPosition]){
					numberOfDeaths += 1;
				}
			}
		}
		newPop.malePopulationArray[arrayPosition] -= numberOfDeaths; 
			
		//increment age
		console.log(newPop.malePopulationArray[arrayPosition+1])
		newPop.malePopulationArray[arrayPosition+1] = newPop.malePopulationArray[arrayPosition];
		console.log(newPop.malePopulationArray[arrayPosition+1]);
	}
	
				
	let numberOfBirths = 0;
	//female array from oldest to youngest
	for(let arrayPosition = (newPop.femalePopulationArray.length - 1); arrayPosition >= 0; arrayPosition--){
		console.log(newPop.femalePopulationArray.length);
		console.log(arrayPosition);
		//check births
		for(let currentPerson = 0; currentPerson < newPop.femalePopulationArray[arrayPosition]; currentPerson++){
			if(Math.random() < fertilityNumber && arrayPosition <= 40){
				numberOfBirths = numberOfBirths + 1;
			}
		}
			
		//check deaths
		let numberOfDeaths = 0;
		if(arrayPosition > newPop.deathProbabilityArray.length){
			for(let currentPerson = 0; currentPerson < newPop.femalePopulationArray[arrayPosition]; currentPerson++){
				if(Math.random() < newPop.deathProbabilityArray[(newPop.deathProbabilityArray.length - 1)]){
					numberOfDeaths += 1;
				}
			}
		}else{
			for(let currentPerson = 0; currentPerson < newPop.femalePopulationArray[arrayPosition]; currentPerson++){
				if(Math.random() < newPop.deathProbabilityArray[arrayPosition]){
					numberOfDeaths += 1;
				}
			}
		}
		newPop.femalePopulationArray[arrayPosition] -= numberOfDeaths; 
			//increment age
		newPop.femalePopulationArray[arrayPosition+1] = newPop.femalePopulationArray[arrayPosition];
	}
	console.log(numberOfBirths)
	newPop.malePopulationArray[0] = numberOfBirths / 2;
	newPop.femalePopulationArray[0] = numberOfBirths / 2;
}
   
function runBaseSimulation(newPop, simTime){
	//clear old run results
	clearOldResults();
	   
	// run sim
	for(let i = 0; i < simTime; i++){
		passYear(newPop);
	}

   displayResults(newPop);
	   
}
	
function displayResults(newPop){
	var totalLivingMales = 0;
	var totalLivingFemales = 0;
	  
	for(currentMaleAgeBracket = 0; currentMaleAgeBracket < newPop.malePopulationArray.length; currentMaleAgeBracket++){
		document.getElementById("maleOutPutBox").innerHTML += '<p>male population of age ' + (currentMaleAgeBracket+1) + ': is ' + newPop.malePopulationArray[currentMaleAgeBracket] +'</p>';
		totalLivingMales += parseFloat(newPop.malePopulationArray[currentMaleAgeBracket]);
	}
	for(currentFemaleAgeBracket = 0; currentFemaleAgeBracket < newPop.femalePopulationArray.length; currentFemaleAgeBracket++){
	    document.getElementById("femaleOutPutBox").innerHTML += '<p>female population of age ' + (currentFemaleAgeBracket+1) + ': is ' + newPop.femalePopulationArray[currentFemaleAgeBracket] +'</p>';
		totalLivingFemales += parseFloat(newPop.femalePopulationArray[currentFemaleAgeBracket]);
	 }
	   
	   var totalLivingPop = parseFloat(totalLivingFemales) + parseFloat(totalLivingMales);
	document.getElementById("maleOutPutBox").innerHTML += '<p>total male population: ' + totalLivingMales +'</p>';
	document.getElementById("femaleOutPutBox").innerHTML += '<p>total female population: ' + totalLivingFemales +'</p>';
	document.getElementById("combinedOutPutBox").innerHTML += '<p>total population: ' + totalLivingPop +'</p>';
	document.getElementById("combinedOutPutBox").innerHTML += '<p>end fertility rate: ' + newPop.averageFertilityRate +'</p>';
	document.getElementById("combinedOutPutBox").innerHTML += '<p>end fertility rate first div: ' + newPop.averageFertilityRateFirstDeriv +'</p>';
}
	
	function getFormData(){
		var data = new FormData();
		var formInputs = document.querySelectorAll("#inputForm input, #inputForm textarea");
		for (let field of formInputs) {
			// EXCLUDE SUBMIT + BUTTONS
			if (field.type != "submit" && field.type != "button") { 
				// CHECKBOX + RADIO - MUST BE CHECKED
				if (field.type=="radio" || field.type=="checkbox") {
					if (field.checked) { data.append(field.id, field.value); }
				}
			  // OTHER FIELDS
			  else { data.append(field.id, field.value); }
			}
		 }
		 
		 getBaseSimulationData(data);
		 return 2;
	}
	
	function customDistributionInputFunc(targetDiv) {
		//<!-- keep track of the row number>
		var currentRowNumb = 0;
		if (targetDiv == "customDistributionInput"){
		basePopRowNumber += 1;
		currentRowNumb = basePopRowNumber;
		} else if(targetDiv == "subPopBoxDistBox1"){
		subPop1RowNumber += 1;
		currentRowNumb = subPop1RowNumber;
		}else if(targetDiv == "subPopBoxDistBox2"){
		subPop2RowNumber += 1;
		currentRowNumb = subPop2RowNumber;
		} else if(targetDiv == "subPopBoxDistBox2"){
		subPop2RowNumber += 1;
		currentRowNumb = subPop2RowNumber;
		} else if(targetDiv == "subPopBoxDistBox3"){
		subPop3RowNumber += 1;
		currentRowNumb = subPop3RowNumber;
		} else if(targetDiv == "subPopBoxDistBox4"){
		subPop4RowNumber += 1;
		currentRowNumb = subPop4RowNumber;
		}else if(targetDiv == "subPopBoxDistBox5"){
		subPop5RowNumber += 1;
		currentRowNumb = subPop5RowNumber;
		}else if(targetDiv == "subPopBoxDistBox6"){
		subPop6RowNumber += 1;
		currentRowNumb = subPop6RowNumber;
		}else if(targetDiv == "subPopBoxDistBox7"){
		subPop7RowNumber += 1;
		currentRowNumb = subPop7RowNumber;
		}else if(targetDiv == "subPopBoxDistBox8"){
		subPop8RowNumber += 1;
		currentRowNumb = subPop8RowNumber;
		}else if(targetDiv == "subPopBoxDistBox9"){
		subPop9RowNumber += 1;
		currentRowNumb = subPop9RowNumber;
		}
		
		//<!-- build the next row for population inputs>
		document.getElementById(targetDiv).innerHTML += "<div id=row" + currentRowNumb + ">";
		document.getElementById(targetDiv).innerHTML += "</div>";
		fillInputRow("row" + currentRowNumb, currentRowNumb)
	}
	
	function fillInputRow(targetDiv, currentRowNumb){
		document.getElementById(targetDiv).innerHTML += "age " + currentRowNumb + ": ";
		document.getElementById(targetDiv).innerHTML += '<label for="malePop|'+targetDiv+'|'+currentRowNumb+'">male population</label>	<input type="text" id="malePop|'+targetDiv+'|'+currentRowNumb+'" name="malePop|'+targetDiv+'|'+currentRowNumb+'" value="0">';
		document.getElementById(targetDiv).innerHTML += '<label for="femalePop|'+targetDiv+'|'+currentRowNumb+'">female population</label>	<input type="text" id="femalePop|'+targetDiv+'|'+currentRowNumb+'" name="femalePop|'+targetDiv+'|'+currentRowNumb+'" value="0">';
		document.getElementById(targetDiv).innerHTML += '<label for="deathProbability|'+targetDiv+'|'+currentRowNumb+'">death Probability</label>	<input type="text" id="deathProbability|'+targetDiv+'|'+currentRowNumb+'" name="deathProbability|'+targetDiv+'|'+currentRowNumb+'" value="0">';
	}
	
	function addNewSubPopFunc() {
	subBoxNumber += 1;
		document.getElementById("subStats").innerHTML += '<div id="subPopBox' + subBoxNumber + '">'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="initialPopSize">initial population size*:</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="initialPopSize" name="initialPopSize" value="0"><br>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="averageFertilityRate">average fertility rate*:</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="averageFertilityRate" name="averageFertilityRate" value="0"><br>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="averageFertilityFirstDeriv">fertility rate first derivative :</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="averageFertilityFirstDeriv" name="averageFertilityFirstDeriv" value="0"><br>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="averageFertilitySecondDeriv">fertility rate second derivative :</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="averageFertilitySecondDeriv" name="averageFertilitySecondDeriv" value="0"><br>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<p>population distribution:</p>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="button" id="customInput" name="distributionPreset" value="customInput" onclick="customDistributionInputFunc(\'subPopBoxDistBox' + subBoxNumber + '\')"> <br> <div id="subPopBoxDistBox' + subBoxNumber + '\""></div>'
		document.getElementById("subStats").innerHTML += '</div>'
	}