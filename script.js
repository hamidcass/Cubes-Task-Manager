

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
var allFolderNames = [];

/*

const getFolders = () => {
    let folders;
    if(localStorage.getItem !== null) {
        folders = JSON.parse(localStorage.getItem('folders'));
        return folders;
    } else {
        folders = [];
    }
}

*/



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

    numFolders++;
  
    
    configFolderPopup.style.visibility = "hidden"; //hide the folder name pop up menu

    var newFolder = document.createElement("div");  //create the new folder
    newFolder.classList.add("newFolder");

    var name = document.createElement("h4");  //add name of folder
    name.classList.add("folderNames")
    name.textContent = folderTextField.value;

    var addTaskButton = document.createElement("button");
    addTaskButton.classList.add("addTaskButton");
    addTaskButton.textContent = "+";

    addTaskButton.addEventListener("click", function() {
        var newTask = document.createElement("input");
        newTask.classList.add("task");
        newTask.placeholder = "Type task here";

        
                

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("checkBox");
        newFolder.appendChild(checkBox);
        newFolder.appendChild(newTask);

        checkBox.addEventListener("change", function() {
            newTask.remove();
            checkBox.remove();
        });

        document.onkeydown = (event) => {
            if(event.key == "Enter"){
    
                if(newTask.value !== ""){
                    console.log();
                
                    newTask.blur();
                    
                }
            }
        }
        
    });


    newFolder.appendChild(name);
    newFolder.appendChild(addTaskButton);
    folderSection.append(newFolder);
    
   // localStorage.setItem("numFolders", numFolders);

    
    allFolders.push(newFolder);
    allFolderNames.push(name.textContent);

    jsonNumFolders = JSON.stringify(numFolders);
    jsonAllFolders = JSON.stringify(allFolders);
    jsonAllFolderNames = JSON.stringify(allFolderNames);

    localStorage.setItem("numFolders", jsonNumFolders);
    localStorage.setItem("allFolders", jsonAllFolders);
    localStorage.setItem("allFolderNames", jsonAllFolderNames);
    
    folderTextField.value = "";
}

function cancelFolder() {
    configFolderPopup.style.visibility = "hidden";
}

setGreetingMessage();
setInterval(setGreetingMessage, 1000);
loadData();



function showLoadedFolders() {

    let num = localStorage.getItem("numFolders");
    let folderNames = JSON.parse(localStorage.getItem("allFolderNames"));

    for (let i=0; i<num; i++) {

        numFolders++;
        let newFolder = document.createElement("div");  //create the new folder
        newFolder.classList.add("newFolder");

        let name = document.createElement("h4");  //add name of folder
        name.classList.add("folderNames")
        console.log(JSON.stringify(folderNames[i]))
        name.textContent = folderNames[i]; //gets the correct name based off position in array

        let addTaskButton = document.createElement("button");
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.textContent = "+";
    
        addTaskButton.addEventListener("click", function() {
            let newTask = document.createElement("input");
            newTask.classList.add("task");
            newTask.placeholder = "Type task here";
    
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("checkBox");
            newFolder.appendChild(checkBox);
            newFolder.appendChild(newTask);
    
            checkBox.addEventListener("change", function() {
                newTask.remove();
                checkBox.remove();
            });
    
            document.onkeydown = (event) => {
                if(event.key == "Enter"){
        
                    if(newTask.value !== ""){
                        console.log();
                    
                        newTask.blur();
                        
                    }
                }
            }
            
        });

        newFolder.appendChild(name);
        newFolder.appendChild(addTaskButton);
        folderSection.append(newFolder);

        allFolders.push(newFolder);
        allFolderNames.push(name.textContent);

        jsonNumFolders = JSON.stringify(numFolders);
        jsonAllFolders = JSON.stringify(allFolders);
        jsonAllFolderNames = JSON.stringify(allFolderNames);

        localStorage.setItem("numFolders", jsonNumFolders);
        localStorage.setItem("allFolders", jsonAllFolders);
        localStorage.setItem("allFolderNames", jsonAllFolderNames);
    }



    

   
}


function loadData () {
    const folderData = JSON.parse(localStorage.getItem('allFolders'));
    //localStorage.clear();
    //console.log(folderData)

    
    if(folderData !== null) {
        showLoadedFolders();
        

    } else {

        console.log("it is null")

    }
}

//localStorage.clear();