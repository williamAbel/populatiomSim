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
   
   function getBaseSimulationData(data){
	   var initalPopSize = 0;
	   var averageLifeExpectancy = 0;
	   var averageFertilityRate = 0;
	   var averageFertilityFirstDeriv = 0;
	   var averageFertilitySecondDeriv = 0;
	   var popDistributionType = 0;
	   var simTime
	   
		for (let [k, v] of data.entries()) { 
			if(k.includes("base") || k.includes("simTime")){
				switch(k){
				case 'baseInitialPopSize': initalPopSize = v;
					break;
				case 'baseAverageLifeExpectancy': averageLifeExpectancy = v;
					break;
				case 'baseAverageFertilityRate': averageFertilityRate = v;
					break;
				case 'baseAverageFertilityFirstDeriv': averageFertilityFirstDeriv = v;
					break;
				case 'baseAverageFertilitySecondDeriv': averageFertilitySecondDeriv = v;
					break;
				case 'baseBroadPyramid': popDistributionType = 1;
					break;
				case 'baseNarrowPyramid': popDistributionType = 2;
					break;
				case 'baseInversePyramid': popDistributionType = 3;
					break;
				case 'baseMidBubble': popDistributionType = 4;
					break;
				case 'baseEarlyBubble': popDistributionType = 5;
					break;
				case 'baseLateBubble': popDistributionType = 6;
					break;
				case 'simTime': simTime = v;
				}
			}
		}
		
		runBaseSimulation(initalPopSize, averageLifeExpectancy, averageFertilityRate, averageFertilityFirstDeriv, averageFertilitySecondDeriv, popDistributionType, simTime);
		
		return 1;
   }
   
   function runBaseSimulation(initalPopSize, averageLifeExpectancy, averageFertilityRate, averageFertilityFirstDeriv, averageFertilitySecondDeriv, popDistributionType, simTime){
	   let populationArray = [];
	   for (let i = 0; i < initalPopSize; i++){
		var newAge = 0;
		var newGender = 2; // 0 being male and 1 being female
		var state = 1; // 0 being dead and 1 being alive
		
		if (popDistributionType == 1){
			// derivative of y = averageLifeExpectancy - x is -1 therefore the probability of being a given age declines by 1 probability value each year 
			// until the itterated total value reaches 100% at the max lifespan of this model
			var currentProb = 0;
			var highestProb = (averageLifeExpectancy * averageLifeExpectancy) - (averageLifeExpectancy * averageLifeExpectancy / 2);
			var randValue = Math.random();
			while((currentProb / highestProb) <= randValue){
				currentProb += averageLifeExpectancy - newAge;
				newAge++;
			}
			
			newGender = Math.floor(Math.random() * 2); //presuming 50/50 split
			let citizen = {id:i, age:newAge, gender:newGender, state:1};
			populationArray.push(citizen);
		}
		
		// future distribution options
	   }
	   
	   // run sim
		   for(let i = 0; i < simTime; i++){
		   //make changes to the change in fertility rate
			averageFertilityFirstDeriv = parseFloat(averageFertilitySecondDeriv) + parseFloat(averageFertilityFirstDeriv);
		   // make changes to fertility rate
		   averageFertilityRate = parseFloat(averageFertilityFirstDeriv) + parseFloat(averageFertilityRate);
		   fertilityNumber = (parseFloat(averageFertilityRate) / 40);
		   
			for(let currentCitizen = 0; currentCitizen < populationArray.length; currentCitizen++){
				//check for death
				if(populationArray[currentCitizen].state == 1){
				   // kill the old
		 		    if(populationArray[currentCitizen].age >= averageLifeExpectancy){
					 	 populationArray[currentCitizen].state = 0;
				    }
					//check for births
					if(populationArray[currentCitizen].gender == 1 && populationArray[currentCitizen].age <= 40){ //eligibility check
						if(fertilityNumber >= Math.random()){
							newGender = Math.floor(Math.random() * 2); //presuming 50/50 split
							let citizen = {id:populationArray.length + 1, age:1, gender:newGender, state:1};
							populationArray.push(citizen);
						}
			
					}
					//increment age
					populationArray[currentCitizen].age += 1
				}
			}
		
	   }
	   
	   // count how many people alive are in each age bracket
	   const malePopArray = [];
	   const femalePopArray = [];
	   for(popCounter = 0; popCounter < populationArray.length; popCounter++){
			if (populationArray[popCounter].state == 1){
				if (populationArray[popCounter].gender == 0){
					if(malePopArray[populationArray[popCounter].age] == undefined){ 
						malePopArray[populationArray[popCounter].age] = 1;
					} else{
						malePopArray[populationArray[popCounter].age] += 1;
					}
				}else{
					if(femalePopArray[populationArray[popCounter].age] == undefined){ 
						femalePopArray[populationArray[popCounter].age] = 1;
					} else{
						femalePopArray[populationArray[popCounter].age] += 1;
					}
				}
			}
	   }
	   
	   // set remaing values to zero
	   for(popCounter = 0; popCounter < malePopArray.length; popCounter++){
		if(malePopArray[popCounter] == undefined){
			malePopArray[popCounter] = 0;
		}
		
		if(femalePopArray[popCounter] == undefined){
			femalePopArray[popCounter] = 0;
		}
	   }
	   
	   console.log("hello there");
	   console.log(populationArray.length);
	   console.log(malePopArray.length);
	   console.log(femalePopArray.length);
	   console.log(malePopArray[1]);
	   
	   for(currentMaleAgeBracket = 1; currentMaleAgeBracket < malePopArray.length; currentMaleAgeBracket++){
		   document.getElementById("maleOutPutBox").innerHTML += '<p>male population of age: ' + currentMaleAgeBracket + ' is ' + malePopArray[currentMaleAgeBracket] +'</p>'
	   }
	   for(currentFemaleAgeBracket = 1; currentFemaleAgeBracket < femalePopArray.length; currentFemaleAgeBracket++){
		   document.getElementById("femaleOutPutBox").innerHTML += '<p>female population of age: ' + currentFemaleAgeBracket + ' is ' + femalePopArray[currentFemaleAgeBracket] +'</p>'
	   }
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
		<!-- keep track of the row number>
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
		
		<!-- build the next row for population inputs>
		document.getElementById(targetDiv).innerHTML += '<label for="newAge|'+targetDiv+'|'+currentRowNumb+'">age</label>	<input type="text" id="newAge'+targetDiv+'|'+currentRowNumb+'" name="newAge'+targetDiv+'|'+currentRowNumb+'" value="0">';
		document.getElementById(targetDiv).innerHTML += '<label for="malePop'+subBoxNumber+'">male population</label>	<input type="text" id="malePop'+subBoxNumber+'" name="malePop'+subBoxNumber+'" value="0">';
		document.getElementById(targetDiv).innerHTML += '<label for="femalePop'+subBoxNumber+'">female population</label>	<input type="text" id="femalePop'+subBoxNumber+'" name="femalePop'+subBoxNumber+'" value="0">';
		document.getElementById(targetDiv).innerHTML += '<input type="button" id="addNextRow" name="addNextRow" value="add next row" onclick="customDistributionInputFunc(\''+targetDiv+'\')"> <br>'
	}
	
	function addNewSubPopFunc() {
	subBoxNumber += 1;
		document.getElementById("subStats").innerHTML += '<div id="subPopBox' + subBoxNumber + '">'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="initialPopSize">initial population size*:</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="initialPopSize" name="initialPopSize" value="0"><br>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<label for="averageLifeExpectancy">average life expectancy*:</label>'
		document.getElementById("subPopBox"+subBoxNumber+"").innerHTML += '<input type="text" id="averageLifeExpectancy" name="averageLifeExpectancy" value="0"><br>'
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