let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodoList(todo);
}

// function deleteTodo(deleteItemID) {
//   let x;
//   const list = document.getElementById("display-item");
//   //   console.log("inside deleteTodo..");
//   console.log(todoItems);
//   //   console.log("entering FOR LOOP");

//   for (let i = 0; i < todoItems.length; i++) {
//     // console.log("entered for loop");
//     // console.log(todoItems);
//     // console.log(todoItems[i].id);
//     // console.log(deleteItemID);
//     // let a = todoItems[i].id === Number(deleteItemID) ? "true" : "false;";
//     //console.log(a);
//     if (todoItems[i].id === Number(deleteItemID)) {
//       console.log("INSIDE FOR LOOP");
//       x = todoItems.splice(i, i);
//       console.log(list.children[i]);
//       list.children[i].classList.add("hideElement");
//       break;
//     }
//   }
//   console.log("END FOR LOOP");
//   console.log(x);
// }

function deleteTodo(deleteItemID) {
  todoItems = todoItems.filter((todo) => todo.id !== Number(deleteItemID));
  renderTodoList();
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

function editTodo(editItemID, newText) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === Number(editItemID)) {
      todoItems[i].text = newText;
      renderTodoList();
      break;
    }
  }
}

function toggleCompleted(todoID) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === Number(todoID)) {
      todoItems[i].checked = !todoItems[i].checked;
      renderTodoList();
      break;
    }
  }
}

function renderTodoList() {
  const list = document.getElementById("display-item");
  list.innerHTML = "";

  todoItems.forEach((todo) => {
    const node = document.createElement("li");
    node.innerHTML = `
      <div class="row align-items-center">
        <div class="col">
          <span class="todo-text ${
            todo.checked ? "completed-task" : "pending-task"
          }">${todo.text}</span>
          <input type="text" class="edit-input form-control hideElement" value="${
            todo.text
          }">
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-primary edit-todo" data-id="${
            todo.id
          }">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-danger delete-todo" data-id="${
            todo.id
          }">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    `;

    const editButton = node.querySelector(".edit-todo");
    const deleteButton = node.querySelector(".delete-todo");
    const todoText = node.querySelector(".todo-text");
    const editInput = node.querySelector(".edit-input");

    editButton.addEventListener("click", () => {
      todoText.classList.toggle("hideElement");
      editInput.classList.toggle("hideElement");
      editInput.value = todoText.textContent.trim();
    });

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newText = editInput.value.trim();
        if (newText !== "") {
          editTodo(todo.id, newText);
        }
      }
    });

    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    todoText.addEventListener("click", () => {
      toggleCompleted(todo.id);
    });

    list.appendChild(node);
  });
}

const list = document.getElementById("display-item");
renderTodoList();
