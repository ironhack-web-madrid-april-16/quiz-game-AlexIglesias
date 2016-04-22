var read = require('read');
var fs = require('fs');
var count = 0;
var score = 0;
var attemps = 5;
fs.readFile("./questions.json", 'utf8', Questions);
function Questions (error, file) {
    if (error) {
        throw error;
    } else {
		var questionList = JSON.parse(file);
		if(questionList[count] === undefined) {
				console.log("#####################\n");
	    		console.log("You WIN!!!");
	    		console.log("Your total score is: "+ score);
	    		return;
	   	} else {
			options = {
			   	prompt: questionList[count].question + "\n>"
			}
		}
		function displayAnswer (error, answer){
	    	var user = answer.toLowerCase();	
	    	if(user == questionList[count].answer) {
	    		console.log("\nOuh Yeah!!!.\n");
	    		count ++;
	    		score += 5;
	    		console.log("Your score now is: " + score + "\n");
	    		fs.readFile("./questions.json", 'utf8', Questions);
			} else {
				console.log("Meeeck!!! Try again looser.");
				score -= 5;
				attemps -=1;
				if (attemps > 0) {
					console.log("Your score now is: " + score + "\n");
					console.log("Maybe this hint help you: "+questionList[count].hint);
					read(options, displayAnswer);
				} else {
					console.log("Muahaha!!!! You are a loooooooooooser!!\n");
					console.log("No more attemps. Your final score is: " + score);
				}

			};
		};
		read(options, displayAnswer);
	};
};