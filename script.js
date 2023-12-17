

const greetingMessage = document.querySelector(".greetingMessage");
const subMessage = document.querySelector(".subMessage");

const addButton = document.querySelector(".addButton");
const configFolderPopup = document.querySelector(".configFolderPopup");
const addFolderButton = document.querySelector(".addFolderButton");
const cancelFolderButton = document.querySelector(".cancelFolderButton");
const folderSection = document.querySelector(".folderSection");
const folderTextField = document.querySelector(".folderName");

var numFolders = 0;





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
    
    
    folderTextField.value = "";
}

function cancelFolder() {
    configFolderPopup.style.visibility = "hidden";
}

setGreetingMessage();
setInterval(setGreetingMessage, 1000);




