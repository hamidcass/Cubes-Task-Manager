

const greetingMessage = document.querySelector(".greetingMessage");
const subMessage = document.querySelector(".subMessage");

const addButton = document.querySelector(".addButton");
const configFolderPopup = document.querySelector(".configFolderPopup");
const addFolderButton = document.querySelector(".addFolderButton");
const cancelFolderButton = document.querySelector(".cancelFolderButton");
const folderSection = document.querySelector(".folderSection");
const folderTextField = document.querySelector(".folderName");

var numFolders = 0;
var allFolders = [];
var allFolderNames = []; //not needed anymore


var noTaskPromptDiv = document.createElement("div");
noTaskPromptDiv.classList.add("noTaskPromptDiv");

var prompt = document.createElement("h4");
prompt.classList.add("prompt");
prompt.textContent = "Looks like you have no tasks left!";




addButton.addEventListener("click", configFolder);

function setGreetingMessage() {

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentTime = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const currentDayOfWeek = currentDate.toLocaleDateString('en', {weekday: "long"});

    if (currentHour < 12) {
        greetingMessage.textContent = "Good Morning!";
    }
    else if (currentHour < 19) {
        greetingMessage.textContent = "Good Afternoon!";
    } else {
        greetingMessage.textContent = "Good Evening!";
    }

    greetingMessage.append(" Welcome to Cubes.");
    subMessage.textContent = currentDayOfWeek.toString() + " | " + currentTime.toString();
}

function configFolder() {
    
    configFolderPopup.style.visibility = "visible";

    folderTextField.focus();
    addFolderButton.addEventListener("click", addFolder);
    cancelFolderButton.addEventListener("click", cancelFolder);

    document.onkeydown = (event) => {
        if(event.key == "Enter"){

            if(folderTextField.value !== ""){
            
                addFolder();
                document.onkeydown = null;  //disabling the event listener now that menu is gone
            }
        }
    }
    
    
}

function addFolder() {
    
    //remove emptyDivPrompt
    noTaskPromptDiv.style.visibility = "hidden";
    noTaskPromptDiv.style.width = "0px";
    noTaskPromptDiv.style.height = "0px";



    numFolders++;
 
    let thisFolder = numFolders-1; //used to identify which folder to update in local storage. This value doesn't change
    let allTasks = [];
    let numTasks = 0;
    
    configFolderPopup.style.visibility = "hidden"; //hide the folder name pop up menu

    var newFolder = document.createElement("div");  //create the new folder
    newFolder.classList.add("newFolder");

    var name = document.createElement("h4");  //add name of folder
    name.classList.add("folderNames")
    name.textContent = folderTextField.value;

    var addTaskButton = document.createElement("button");
    addTaskButton.classList.add("addTaskButton");
    addTaskButton.textContent = "+";

    var deleteFolderButton = document.createElement("button");
    deleteFolderButton.classList.add("deleteFolderButton");
    deleteFolderButton.textContent = "-";

    addTaskButton.addEventListener("click", function() {
        var newTask = document.createElement("input");
        newTask.classList.add("task");
        newTask.placeholder = "Type task here";

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("checkBox");
        newFolder.appendChild(checkBox);
        newFolder.appendChild(newTask);

        numTasks++;

        allTasks.push(newTask.value); //this will be empty.

        let oldTaskValue = newTask.value;
       


        newTask.addEventListener("input", function() {

            
            let newTaskValue = newTask.value;
            let index = allTasks.indexOf(oldTaskValue);
            //console.log("Value: [" + newTask.value + "] Index: " + index)
            oldTaskValue = newTaskValue;
            

            if(index !== -1) {
                
                allTasks[index] = newTaskValue;
            } else {
                allTasks.push(newTaskValue);
                
            }

            folderItems = {
                folder: newFolder, //div of the folder
                folderName: name.textContent,  //folder name
                numOfTasks: numTasks,
                taskList: allTasks
            }

            console.log("Hi");

            allFolders[thisFolder] = folderItems;
            let jsonAllFolders = JSON.stringify(allFolders);
            localStorage.setItem("allFolders", jsonAllFolders);

        });


        
        checkBox.addEventListener("change", function() {
            newTask.remove();
            checkBox.remove();

            let i = allTasks.indexOf(newTask.value);
            console.log(newTask.value)
            console.log("Index: " + i)
            allTasks.splice(i,1);

            folderItems = {
                folder: newFolder, //div of the folder
                folderName: name.textContent,  //folder name
                numOfTasks: numTasks-1,
                taskList: allTasks
            }

            console.log("NumTasks: " + folderItems.numOfTasks);

            

            allFolders[thisFolder] = folderItems;
            let jsonAllFolders = JSON.stringify(allFolders);
            localStorage.setItem("allFolders", jsonAllFolders);

        });

        //TODO: Not working in some instances, fix
        document.onkeydown = (event) => {
            if(event.key == "Enter"){
    
                if(newTask.value !== ""){
                                    
                    newTask.blur();
                    
                }
            }
        }

        
        
    });

    deleteFolderButton.addEventListener("click", function() {
        //remove folder from page and local memory
        numFolders--;
        let index = allFolders.indexOf(folderItems);
        
        if (index !== -1) {
            allFolders.splice(index, 1);
            folderSection.removeChild(newFolder);

            jsonNumFolders = JSON.stringify(numFolders);
            jsonAllFolders = JSON.stringify(allFolders);

            localStorage.setItem("numFolders", jsonNumFolders);
            localStorage.setItem("allFolders", jsonAllFolders);

            //make prompt visible if no folders exist
            if(allFolders.length === 0) {

                noTaskPromptDiv.style.visibility = "visible";
                noTaskPromptDiv.style.width = "554px";
                noTaskPromptDiv.style.height = "70px";

            }

        }

        

    });

    newFolder.append(name);
    newFolder.append(addTaskButton);
    newFolder.append(deleteFolderButton);
    folderSection.append(newFolder);
    
    let folderItems = {
        folder: newFolder, //div of the folder
        folderName: name.textContent,  //folder name
        numOfTasks: numTasks, //amount of tasks
        taskList: allTasks  //list of all values of each input field (tasks)
    }

    allFolders.push(folderItems);
    
 
    let jsonNumFolders = JSON.stringify(numFolders);
    let jsonAllFolders = JSON.stringify(allFolders);

    localStorage.setItem("numFolders", jsonNumFolders);
    localStorage.setItem("allFolders", jsonAllFolders);

    

    
     
    folderTextField.value = "";
}

function cancelFolder() {
    configFolderPopup.style.visibility = "hidden";
}

setGreetingMessage();
setInterval(setGreetingMessage, 1000);
loadData();

//if folder container is not empty
if(allFolders.length === 0) {
    console.log("All folders is empty")
    noTaskPromptDiv.append(prompt);
    folderSection.append(noTaskPromptDiv);


    //clearFolders = document.body.createElement("h3");

} else {
    console.log(allFolders)
    //TODO: create remove all tasks button
}



function showLoadedFolders() {

    numFolders = 0;
    
   
    let num = localStorage.getItem("numFolders"); //retrieve stored amount of folders from local storage
    allFolders = JSON.parse(localStorage.getItem("allFolders")); //retrive the saved data to be added to screen
       
    //add each folder to the page
    for (let i=0; i<num; i++) {
        
        let folderPos = i; //holds index of folder in allFolder to manage deletion
        numFolders++;
        let thisFolder = numFolders-1; //used to identify which folder to update in local storage. This value doesn't change
        let allTasks = [];
        let numTasks = 0;
        
        let newFolder = document.createElement("div");  //create the new folder
        newFolder.classList.add("newFolder");

        let name = document.createElement("h4");  //add name of folder
        name.classList.add("folderNames")
        console.log(JSON.stringify(allFolders[i].folderName))
        name.textContent = allFolders[i].folderName; //gets the correct name based off position in array

        let addTaskButton = document.createElement("button");
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.textContent = "+";

        var deleteFolderButton = document.createElement("button");
        deleteFolderButton.classList.add("deleteFolderButton");
        deleteFolderButton.textContent = "-";

        newFolder.append(name);
        newFolder.append(addTaskButton);
        newFolder.append(deleteFolderButton);

        //Adding already made tasks from local memory       
        for(let j = 0; j < allFolders[i].numOfTasks; j++) {
            
         
            let newTask = document.createElement("input");
            newTask.classList.add("task");
            newTask.placeholder = "Type task here";
            newTask.value = allFolders[i].taskList[j];

            
    
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("checkBox");

            newFolder.appendChild(checkBox);
            newFolder.appendChild(newTask);

            numTasks++;
            allTasks.push(newTask.value); //this will be empty.
            let oldTaskValue = newTask.value;

            newTask.addEventListener("input", function() {

            
                let newTaskValue = newTask.value;
                let index = allTasks.indexOf(oldTaskValue);
                console.log("Value: [" + newTask.value + "] Index: " + index)
                oldTaskValue = newTaskValue;
                
    
                if(index !== -1) {
                    
                    allTasks[index] = newTaskValue;
                } else {
                    allTasks.push(newTaskValue);
                    
                }
    
                folderItems = {
                    folder: newFolder, //div of the folder
                    folderName: name.textContent,  //folder name
                    numOfTasks: numTasks,
                    taskList: allTasks
                };
    
                allFolders[thisFolder] = folderItems;
                let jsonAllFolders = JSON.stringify(allFolders);
                localStorage.setItem("allFolders", jsonAllFolders);
    
            });
    

    
            checkBox.addEventListener("change", function() {
                newTask.remove();
                checkBox.remove();

                let i = allTasks.indexOf(newTask.value);
                console.log(newTask.value)
                console.log("Index: " + i)
                allTasks.splice(i,1);

                folderItems = {
                    folder: newFolder, //div of the folder
                    folderName: name.textContent,  //folder name
                    numOfTasks: numTasks-1,
                    taskList: allTasks

                
            }

            console.log("NumTasks: " + folderItems.numOfTasks);

            
            allFolders[thisFolder] = folderItems;
            let jsonAllFolders = JSON.stringify(allFolders);
            localStorage.setItem("allFolders", jsonAllFolders);
            

                

            });
    
            document.onkeydown = (event) => {
                if(event.key == "Enter"){
        
                    if(newTask.value !== ""){
                        console.log();
                    
                        newTask.blur();
                        
                    }
                }
            }
            

        }
    
        //adds new tasks that were not originally in memory
        addTaskButton.addEventListener("click", function() {
            
                var newTask = document.createElement("input");
                newTask.classList.add("task");
                newTask.placeholder = "Type task here";
        
                var checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.classList.add("checkBox");
                newFolder.appendChild(checkBox);
                newFolder.appendChild(newTask);
        
                numTasks++;
        
                allTasks.push(newTask.value); //this will be empty.
        
                let oldTaskValue = newTask.value;
               
        
        
                newTask.addEventListener("input", function() {
        
                    
                    let newTaskValue = newTask.value;
                    let index = allTasks.indexOf(oldTaskValue);
                    console.log("Value: [" + newTask.value + "] Index: " + index)
                    oldTaskValue = newTaskValue;
                    
        
                    if(index !== -1) {
                        
                        allTasks[index] = newTaskValue;
                    } else {
                        allTasks.push(newTaskValue);
                        
                    }
        
                    folderItems = {
                        folder: newFolder, //div of the folder
                        folderName: name.textContent,  //folder name
                        numOfTasks: numTasks,
                        taskList: allTasks
                    };
        
                    allFolders[thisFolder] = folderItems;
                    let jsonAllFolders = JSON.stringify(allFolders);
                    localStorage.setItem("allFolders", jsonAllFolders);
        
                });
        
        
        
                //allTasks.push(newTask.value);
                //console.log(allTasks)
        
                //TODO: Remove from local memory
                checkBox.addEventListener("change", function() {
                    newTask.remove();
                    checkBox.remove();

                    let i = allTasks.indexOf(newTask.value);
                    console.log(newTask.value)
                    console.log("Index: " + i)
                    allTasks.splice(i,1);

                folderItems = {
                    folder: newFolder, //div of the folder
                    folderName: name.textContent,  //folder name
                    numOfTasks: numTasks-1,
                    taskList: allTasks

                
                }

                console.log("NumTasks: " + folderItems.numOfTasks);

            

                allFolders[thisFolder] = folderItems;
                let jsonAllFolders = JSON.stringify(allFolders);
                localStorage.setItem("allFolders", jsonAllFolders);

            });

        
                //TODO: Not working in some instances, fix
                document.onkeydown = (event) => {
                    if(event.key == "Enter"){
            
                        if(newTask.value !== ""){
                                            
                            newTask.blur();
                            
                        }
                    }
                }
                
        });

        deleteFolderButton.addEventListener("click", function() {

            let index = allFolders.indexOf(folderPos);
            //remove folder from page and local memory
            allFolders.splice(index, 1);
            folderSection.removeChild(newFolder);
            numFolders--;

            let jsonNumFolders = JSON.stringify(numFolders);
            let jsonAllFolders = JSON.stringify(allFolders);

            localStorage.setItem("numFolders", jsonNumFolders);
            localStorage.setItem("allFolders", jsonAllFolders);
            
            //make prompt visible if no folders exist
            if(allFolders.length === 0) {
    
                noTaskPromptDiv.style.visibility = "visible";
                noTaskPromptDiv.style.width = "554px";
                noTaskPromptDiv.style.height = "70px";
                noTaskPromptDiv.append(prompt);
                folderSection.append(noTaskPromptDiv);
    
            }
    
        
    
            
    
        });
        

        
        folderSection.append(newFolder);
    }

}


function loadData () {
    let folderData = JSON.parse(localStorage.getItem('allFolders'));
    
    //this will reset local storage after every refresh. If this is not commented out it's being used for testing purposes only
    //localStorage.clear();
    
    if(folderData !== null) {
        showLoadedFolders();
        
    } else {
        console.log("it is null")
    }
}


