let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function deleteTodo(deleteItemID) {
  let x;
  const list = document.getElementById("display-item");
  //   console.log("inside deleteTodo..");
  console.log(todoItems);
  //   console.log("entering FOR LOOP");

  for (let i = 0; i < todoItems.length; i++) {
    // console.log("entered for loop");
    // console.log(todoItems);
    // console.log(todoItems[i].id);
    // console.log(deleteItemID);
    let a = todoItems[i].id === Number(deleteItemID) ? "true" : "false;";
    console.log(a);
    if (todoItems[i].id === Number(deleteItemID)) {
      console.log("INSIDE FOR LOOP");
      x = todoItems.splice(i, i);
      console.log(list.children[i]);
      list.children[i].classList.add("hideElement");
      break;
    }
  }
  console.log("END FOR LOOP");
  console.log(x);
}

const form = document.getElementById("todo-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.getElementById("input-box");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

function renderTodo(todo) {
  const list = document.getElementById("display-item");
  const node = document.createElement("li");

  node.innerHTML = `
  <div class="row">
  <div class="col">
  <span class="pending-task">${todo.text}</span>
  </div>
  <div class ="col">
  <button class="delete-todo ">
  <span class="${todo.id}"><i class="bi bi-x-circle-fill deleteItem"></i>
  </span>
  </button>
  </div>
  </div>
 
  `;
  list.append(node);
}

const list = document.getElementById("display-item");
list.addEventListener("click", (event) => {
  console.log("entered click listener");
  console.log(todoItems);
  console.log("this is the target");
  console.log(event.target.classList);

  if (event.target.classList.contains("pending-task")) {
    // console.log("click2");
    event.target.classList.remove("pending-task");
    event.target.classList.add("completed-task");
    // console.log(event.target.classList);
  } else if (event.target.classList.contains("completed-task")) {
    // console.log("click3");
    event.target.classList.remove("completed-task");
    event.target.classList.add("pending-task");
    // console.log(event.target.classList);
  }

  if (event.target.classList.contains("deleteItem")) {
    console.log("calling deleteTodo..");
    console.log(event.target.parentElement.classList.value);
    deleteTodo(event.target.parentElement.classList.value);
  }
});
