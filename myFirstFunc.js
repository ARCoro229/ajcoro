
//import "js-regression";
const { Matrix } = require('ml-matrix');
var jsregression = require('js-regression');

var resulMain = null; //main table
//var x_arrMain = null; //x values
//var y_arrMain = null; //y values

function Upload() {												//MAIN FUNCTION: for uploading csv to arrays
	var fileUpload = document.getElementById("fileUpload");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {			//check if csv file
		if (typeof (FileReader) != "undefined") {				//check if browser supports HTML5
			var reader = new FileReader();
			reader.onload = function (e) {
				var lines = e.target.result.split("\n");		//split lines from each other line-by-line
				var resul = [];							
				//var x_arr = [];
				//var y_arr = [];
				var headers = lines[0].split(",");
				for (var i = 1; i < lines.length-1; i++) {		//set i=1 to remove headers
					var currentline = lines[i].split(",");		//separate values via comma (do NOT write numbers separated in 1000's like 12,567 or 100,000,000)
					resul.push(currentline);
				}
				addTable(headers, resul);
				resulMain = resul;								//place to global table variable
				//printArray2(resulMain);							//TEST FUNCTION: print out all values of main table
				//x_arrMain = getX_values(resul);					//place to global x values
				//printArray2(x_arrMain);							//TEST FUNCTION: print out all x values
				//y_arrMain = getY_values(resul);					//place to global y values
				//printArray(y_arrMain);							//TEST FUNCTION: print out all y values
				//return resul;
				return;
			}
			reader.readAsText(fileUpload.files[0]);
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid CSV file.");
	}
}

function clearField() {
	document.getElementById("array").innerHTML = ("");
	document.getElementById("table").innerHTML = ("");
	document.getElementById("tab").innerHTML = ("");
	document.getElementById("tester").innerHTML = ("");
	document.getElementById("Test_Field").innerHTML = ("");
	resulMain = null;
}

function printArray(array) {						//TEST FUNCTION: print out 1D array to see if values placed properly
	for (var i = 0; i < array.length; i++) {
		document.getElementById("tester").innerHTML += (i + " [ " + array[i] + " ]" + "<br>");
	}
	//getIndexTest(array,20)
}


function printArray2(array) {						//TEST FUNCTION: print out 2D array to see if values placed properly
	for (var i = 0; i < array.length; i++) {
		document.getElementById("tester").innerHTML += ("[");
		for (var j = 0; j < array[i].length; j++) {
			document.getElementById("tester").innerHTML += (" &nbsp " + array[i][j] + " &nbsp ");
		}
		document.getElementById("tester").innerHTML += ("]" + "<br>");
		//document.write(" " + resul.join());
	}
	//getIndexTest(array,20)
}


function getIndexTest(array, indexPairs) {			//TEST FUNCTION: test if indexing is working properly
	document.getElementById("tab").innerHTML += ("Line index [0][0] is:" + array[0][0] + "<br>");
	for (var i = 0; i < indexPairs; i++) {
		var randIndex_1 = getRandomInt(array.length);
		var randIndex_2 = getRandomInt(array[randIndex_1].length);
		document.getElementById("tab").innerHTML += ("#" + (i+1) + " Line index [" + randIndex_1 + "][" + randIndex_2 + "] is: " + array[randIndex_1][randIndex_2] + "<br>");
	}
}


function addTable(columnNames, dataArray) {			//MAIN FUNCTION: print out table
	document.getElementById("table").innerHTML = ("");
	var x = document.createElement("TABLE");
	document.getElementById("table").appendChild(x);
	var y = document.createElement("TR");
	x.appendChild(y);
	for (i = 0; i < columnNames.length; i++) {		//add column names or headers
		var th = document.createElement("TH");
		var columns = document.createTextNode(columnNames[i]);
		th.appendChild(columns);
		y.appendChild(th);
	}
	for(i = 0 ; i < dataArray.length ; i++) {		//add rest of data
		var row= dataArray[i];
		var y2 = document.createElement("TR");
		for(j = 0 ; j < row.length ; j++) {
			x.appendChild(y2);
			var th2 = document.createElement("TD");
			var date2 = document.createTextNode(row[j]);
			th2.appendChild(date2);
			y2.appendChild(th2);
		}
	}
}


function getX_values(array) {			//MAIN FUNCTION: get elements up to 2nd last end of 2d array
	var x_arr = [];
	for (var i = 0; i < array.length; i++) {
		var x_temp = []
		for (var j = 0; j < array[i].length-1; j++) {
			x_temp.push(array[i][j]);	//push values except last into temp array
		}
		//x_temp.unshift(1);				//add 1 to head of array
		x_arr.push(x_temp);				//push temp array into total array
	}
	//printArray2(x_arr);
	return x_arr;
}


function getY_values(array) {				//MAIN FUNCTION: get elements at end of 2d array
	var y_arr = [];
	var y_index = array[0].length-1;		// length of column
	for (var i = 0; i < array.length; i++) {
		y_arr.push(array[i][y_index]);		//push values into array
	}
	//printArray(y_arr);
	return y_arr;
}


function getRandomInt(max) {				//SUPPORT FUNCTION: get random integer from range 0 - max
	return Math.floor(Math.random() * Math.floor(max));
}

function MatMult_M1(A, B, input) {					//SUPPORT FUNCTION: multiply matrices of (n x m) and (m x 1) size
	var temp_val = 0;
	//var arr_result = new Array(A.length);
	//var arr_result = [];
	for (var i = 0; i < A.length; i++) {		//Matrix Multiplication
		temp_val = 0;
		for (var j = 0; j < A[0].length; j++) {
			temp_val = ( A[i][j] * B[j] ) + temp_val;
		}
		//arr_result[i] = temp_val;
		input[i] = temp_val;
	}
	return;
}

function fillZero(array, length){
	for (var i = 0; i < length; i++) {		
		array.push(0);
	}
}

function fillRandomFloat(array){
	for (var i = 0; i < array.length; i++) {		
		array[i] = Math.random();
	}
}

function loss(A, Y, X) {
	var x_array = new Array(X[0].length).fill(0);
	MatMult_M1(A,X,x_array);
	//Summation (Y_i - (AX)_i)^2
	var Sub_1 = 0;
	var summ = 0;
	for (var i = 0; i < x_array[0].length; i++) {
		summ = Y[i] - x_array[i];
		Sub_1 = Math.pow(summ, 2) + Sub_1;
	}
	return Sub_1;
}


function GradientDescent() {
	if (resulMain != null) {
		document.getElementById("Test_Field").innerHTML = ("");
		document.getElementById("Test_Field").innerHTML += ("You chose Gradient Descent!" + "<br>");
		//main_array, x_array, y_array, maxIter, alpha
		var maxIter = 1e5;								//maximum number of iterations allowed before convergence is considered null
		var x_array = getX_values(resulMain);
		var y_array = getY_values(resulMain);
		var ROW_LEN = x_array.length;						//m in (m x n)
		//document.getElementById("tester").innerHTML += ("ROW_LEN = " + ROW_LEN + "<br>");
		var COL_LEN = x_array[0].length;						//n in (m x n)
		//document.getElementById("tester").innerHTML += ("COL_LEN = " + COL_LEN + "<br>");
		var iter = 0;
		var alpha = 0.001;
		var epsilon = 0.0001;
		var beta = new Array(COL_LEN).fill(0);
		fillRandomFloat(beta);
		var beta_new = new Array(COL_LEN).fill(0);
		
		var Grad_L = new Array(ROW_LEN).fill(0);
		var temp_val = 0;
		var XB = new Array(ROW_LEN).fill(0);
		var partial_deriv = 0;
		//printArray2(x_array);
		//printArray(y_array);
		//loss(x_array, y_array, )

		var check = true;
		while (check == true) {
			iter += 1;										//check number of iterations
			//document.getElementById("tester").innerHTML += ("Iterating... " + iter + " times <br>");
			var beta_test = new Array(ROW_LEN).fill(0);	//values of beta - beta_new that are reset with every iteration
			
			if (iter > maxIter) {
				document.getElementById("Test_Field").innerHTML += ("Did not converge :( <br>");
				return;
				break;
			}
			MatMult_M1(x_array, beta, XB);					//matrix multiplication of x values and beta
			
			//printArray(XB);	
			for (var k = 0; k < ROW_LEN; k++) {				//dL/dBi
				partial_deriv = 0;
				for (var j = 0; j < ROW_LEN; j++) {
					partial_deriv = ( y_array[j] - XB[j] ) * -( x_array[j][k] ) + partial_deriv;
				}
				Grad_L[k] = 2 * partial_deriv;	
			}
			//printArray(Grad_L);
			var count = 0;
			for (var m = 0; m < ROW_LEN; m++) {						//compute new beta values
				beta_new[m] = beta[m] - alpha * Grad_L[m]; 
				beta_test[m] = Math.abs(beta[m] - beta_new[m]); 	//append beta - beta_new to find maximum difference value 
				if (Math.abs(beta[m] - beta_new[m]) < epsilon) { 	//compare new beta with previous beta
					count += 1;
					if (count > ROW_LEN-1) {						//if all values less than epsilon and at the end of the array (dependent on max row index), stop loop
						check = false;
						document.getElementById("Test_Field").innerHTML += ("Iterations: " + iter + "<br>");
						for (var n = 0; n < ROW_LEN; n++) {
							document.getElementById("Test_Field").innerHTML += ("Beta[" + n + "] = " + beta[n] + "<br>");
						}
						return beta;
					}
				}
				beta[m] = beta_new[m];	
			}


		}
	} else {
		alert("You have not uploaded a CSV file.");
	}
}

function LinRegression() {
	if (resulMain != null) {
		//var jsregression = require('js-regression');
		document.getElementById("Test_Field").innerHTML = ("");
		// var jsregression = require('js-regression');
		document.getElementById("Test_Field").innerHTML += ("You chose Linear Regression!" + "<br>");
		// === training data generated from y = 2.0 + 5.0 * x + 2.0 * x^2 === //
		var data = [];
		for(var x = 1.0; x < 100.0; x += 1.0) {
			var y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
			data.push([x, x * x, y]); // Note that the last column should be y the output
		}
	 	//document.getElementById("Test_Field").innerHTML += (data + "<br>");
	 	//printArray2(data);
		// === Create the linear regression === //
		var regression = new jsregression.LinearRegression({
			alpha: 0.001, // 
			iterations: 300,
			lambda: 0.0
		});
		// can also use default configuration: 
		//var regression = new jsregression.LinearRegression(); 
	 	document.getElementById("Test_Field").innerHTML += ("Training!" + "<br>");
		// === Train the linear regression === //
		var model = regression.fit(data);
	 
		// === Print the trained model === //
		document.getElementById("Test_Field").innerHTML += (model + "<br>");
	 
		// === Testing the trained linear regression === //
		var testingData = [];
		for(var x = 1.0; x < 100.0; x += 1.0) {
			var actual_y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
			var predicted_y = regression.transform([x, x * x]);
			document.getElementById("Test_Field").innerHTML += ("actual: " + actual_y + " predicted: " + predicted_y + "<br>");
		}
	} else {
		alert("You have not uploaded a CSV file.");
	}
}

// Leftover codes you might want to try and test out:
//var x_arr = new Matrix(getX_values(resul));	
//document.write(" " + resul.join());
//document.getElementById("tab").innerHTML += (" Line length is: " + y_index + "<br>");