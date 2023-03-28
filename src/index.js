document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", addTaskToList);

  //Assignment of the colors of priority. Can be changed from the following assignment. Orange was preferred as opposed to the specified
  //Yellow because of the visibility of the color on the list.
  const highPriorityColor   = "red";
  const mediumPriorityColor = "orange";
  const lowPriorityColor    = "green"; 


  function addTaskToList(event){
    event.preventDefault();
    const input = event.target;

    if (input["new-task-description"].value === "" || input["dueDate"].value === ""){
      alert("The task and due date are required before submission.");
      return;
    }

    const newTaskValue = input["new-task-description"].value;
    const newdueDate = input["dueDate"].value;

    //Priority list functionality, uses a switch case to check what priority the user specified.
    //Orange was chosen for medium priority instead of yellow due to visibility of the entry in the list.
    let priorityColor;
    switch (input["priority"].value){
      case "high":   priorityColor   = highPriorityColor    ; break;
      case "medium": priorityColor   = mediumPriorityColor ; break;
      case "low":    priorityColor   = lowPriorityColor  ; break;
    }
  
    const list = document.querySelector("#tasks");
  
    let appendBtnArray = [];

    const deleteBtn = createButton("X", deleteTask);
    appendBtnArray.push(deleteBtn);
    
    const editBtn = createButton("Edit", editTask);
    appendBtnArray.push(editBtn);

    const newTask = document.createElement("li");
    newTask.textContent = `${newTaskValue}: ${newdueDate} `;
    newTask.style = `color: ${priorityColor};`;

    for (const btn of appendBtnArray){
      newTask.appendChild(btn);
      btn.style = "vertical-align: middle;";
    }


    //Sorting functionality: Involves filtering the list node collection into its constituent red, yellow and green components, appending the
    //new element and then reappending them all the color arrays to the parent node after each entry as a means of sorting the list in order of priority.
    let arrayRed = (Array.from(list.childNodes).slice(1)).filter(function(element){
       if (element.style.color === highPriorityColor)
          return element;
    })
    
    let arrayYellow = (Array.from(list.childNodes).slice(1)).filter(function(element){
       if (element.style.color === mediumPriorityColor)
          return element;
    })

    let arrayGreen = (Array.from(list.childNodes).slice(1)).filter(function(element){
       if (element.style.color === lowPriorityColor)
          return element;
    })

    if (newTask.style.color === highPriorityColor){
      arrayRed.push(newTask);

    } else if (newTask.style.color === mediumPriorityColor){
      arrayYellow.push(newTask);

    } else if (newTask.style.color === lowPriorityColor){
      arrayGreen.push(newTask);

    }


    totalArray = [...arrayRed, ...arrayYellow, ...arrayGreen];

    for (let element of totalArray){
      list.append(element);
    }


    form.reset();
    
  }


  function deleteTask(event){
    event.target.parentNode.remove();
  }


  function editTask(event){
    const newChild = document.createElement("span");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = event.target.parentNode.childNodes[0].textContent;
    editInput.style.color = event.target.parentNode.style.color;
  
    
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Done";
    submitBtn.addEventListener("click", updateList);

    newChild.appendChild(editInput)
    newChild.appendChild(submitBtn);

    const list = document.querySelector("#tasks");

    replaceEntry(newChild, event, list);

  }
  

  function updateList(event){
    event.preventDefault();
    const newTaskValueAndDate = event.target.parentNode.childNodes[0].value;
    const newTaskColor = event.target.parentNode.childNodes[0].style.color;


    const updatedTask = document.createElement("li");
    updatedTask.textContent = `${newTaskValueAndDate} `;
    updatedTask.style = `color: ${newTaskColor};`;


    let appendBtnArray = [];

    const deleteBtn = createButton("X", deleteTask);
    appendBtnArray.push(deleteBtn);
    
    const editBtn = createButton("Edit", editTask);
    appendBtnArray.push(editBtn);

    for (const btn of appendBtnArray){
      updatedTask.appendChild(btn);
      btn.style = "vertical-align: middle;";
    }

    const list = document.querySelector("#tasks");

    replaceEntry(updatedTask, event, list);

  }


  function createButton(content, taskOnClick){
      const newBtn = document.createElement("button");
      newBtn.textContent = content;
      newBtn.addEventListener("click", taskOnClick);
      return newBtn;
  }

  
  function replaceEntry(newChild, event, list){
    const editIndex = (Array.from(list.childNodes)).indexOf(event.target.parentNode);

    const existingChild = list.childNodes[editIndex];
    list.insertBefore(newChild, existingChild);

    //Remove element at one past the index of the inserted element.
    const childToRemove = list.childNodes[editIndex + 1]; 
    list.removeChild(childToRemove);

  }

});

// const editIndex = (Array.from(list.childNodes)).indexOf(event.target.parentNode);

    

    // const existingChild = list.childNodes[editIndex];
    // list.insertBefore(newChild, existingChild);

    // const childToRemove = list.childNodes[editIndex + 1]; // Remove child at index 2
    // list.removeChild(childToRemove);