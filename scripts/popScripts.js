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
	
	function getFormData(){
		var data = new FormData();
		var formInputs = document.querySelectorAll("#user_form input, #user_form textarea, #user_form select");
		for (let field of all) {
			// EXCLUDE SUBMIT + BUTTONS
			if (field.type != "submit" && field.type != "button") { 
				// CHECKBOX + RADIO - MUST BE CHECKED
				if (field.type=="radio" || field.type=="checkbox") {
					if (field.checked) { data.append(field.name, field.value); }
				}
			  // OTHER FIELDS
			  else { data.append(field.name, field.value); }
			}
		 }
		 
		 return data;
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