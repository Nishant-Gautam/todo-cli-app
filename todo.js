var fs = require('fs');
const { clearScreenDown } = require('readline');

init1();
init2();
function init1(){
    if(!fs.existsSync(`${process.cwd()}/todo.txt`)){
        fs.openSync(`${process.cwd()}/todo.txt`, 'w');
    }
}

function init2(){
    if(!fs.existsSync(`${process.cwd()}/done.txt`)){
        fs.openSync(`${process.cwd()}/done.txt`, 'w');
    }
}

// code for help section
function helpSection(){
    console.log("Usage :-");
    console.log("$ ./todo add \"todo item\"  # Add a new todo");
    console.log("$ ./todo ls               # Show remaining todos");
    console.log("$ ./todo del NUMBER       # Delete a todo");
    console.log("$ ./todo done NUMBER      # Complete a todo");
    console.log("$ ./todo help             # Show usage");
    console.log("$ ./todo report           # Statistics");
}

function addSection(newTodo){
    if(newTodo !== undefined){
            fs.appendFile(`${process.cwd()}/todo.txt`, `${newTodo}\n`, (err) => {
                if (err) throw err;
                console.log("Added todo: \"" + newTodo + "\"");
            });
    }
    else {
        console.log("\"Error: Missing todo string. Nothing added!\"");
    }
}


function listSection(){
    var contents = fs.readFileSync(`${process.cwd()}/todo.txt`, "utf-8");
    var linedContents = contents.split('\n');
    if(linedContents[0] !== "") {
        for(var i=linedContents.length-1; i>0; i--){
            console.log("[" + i + "] " + linedContents[i-1])
            
        }
    }
    else{
        console.log("\"There are no pending todos!\"");
    }
    
}


// code for del command
function deleteSection(num){

    var contents = fs.readFileSync(`${process.cwd()}/todo.txt`, "utf-8");
    var linedContents = contents.split('\n'); 

    var checkNum = parseInt(num); // convert string to a number
    if(Number.isNaN(checkNum)){
        console.log("Error: Missing NUMBER for deleting todo.");
    }

    else if(checkNum > linedContents.length-1 || checkNum === 0){
        console.log("Error: todo #" + checkNum + " does not exist. Nothing deleted.");
    }

    else{
        var deletedItem = linedContents.splice(checkNum-1,1);
        console.log("Deleted todo #" + checkNum);
        var text = linedContents.join('\n');
        fs.writeFileSync(`${process.cwd()}/todo.txt`, text, "utf8");
    }
}

// code for done section
function doneSection(num){
    var contents = fs.readFileSync(`${process.cwd()}/todo.txt`, "utf-8");
    var linedContents = contents.split('\n');

    var checkNum = parseInt(num);
    if(Number.isNaN(checkNum)){
        console.log("Error: Missing NUMBER for marking todo as done.");
    }

    else if(checkNum > linedContents.length-1 || checkNum === 0){
        console.log("Error: todo #" + checkNum + " does not exist.");
        // console.log("y");
    }
    
    else{
        var deletedItem = linedContents.splice(checkNum-1,1);
        console.log("Marked todo #" + checkNum + " as done.");
        var text = linedContents.join('\n');

        var date = new Date().toISOString().slice(0,10)

        fs.writeFileSync(`${process.cwd()}/todo.txt`, text, "utf8");
        fs.appendFileSync(`${process.cwd()}/done.txt`, `x ${date} ${deletedItem[0]}\n`, "utf8");
    }
}

// code for report command
function reportSection(){
    var contentsTodo = fs.readFileSync(`${process.cwd()}/todo.txt`, "utf-8");
    var reportTodo = contentsTodo.split('\n');
    var pending = reportTodo.length-1;

    var contentsDone = fs.readFileSync(`${process.cwd()}/done.txt`, "utf-8");
    var reportDone = contentsDone.split('\n');

    var date = new Date().toISOString().slice(0,10)

    var completed = reportDone.length-1;
    console.log(`${date} Pending : ${pending} Completed : ${completed}`)

}


const usage = process.argv[2]; //which command to execute

const argument = process.argv[3]; // argument for del , done


// running code according to user's command
switch(usage){
    case "help":
        helpSection();
        break;

    case "add":
        addSection(argument);
        break;

    case "ls":
        listSection();
        break;

    case "del":
        deleteSection(argument);
        break;

    case "done":
        doneSection(argument);
        break;

    case "report":
        reportSection();
        break;

    default:
        helpSection();
        break;
        
}