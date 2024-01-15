const todoItemsContainer = document.querySelector(".todo-items-container");
const addTodoBtn = document.querySelector(".add-todo-btn");
const addTodoInput = document.querySelector(".add-todo-input");
const todoItems = document.querySelectorAll(".todo-items-container .item");
const taskDoneBtn = document.querySelector(".task-done-btn");
const taskDoneBtnAll = document.querySelectorAll(".task-done-btn");
const showCheckIcon = document.querySelector(".show-check-icon");
const itemsLeft = document.querySelector(".items-left");
const allBtn = document.querySelector(".all-button");
const activeBtn = document.querySelector(".active-button");
const completedBtn = document.querySelector(".completed-button");
const clearCompletedBtn = document.querySelector(".clear-completed-button");
const todoContent = document.querySelectorAll("#todo-content");
const darkLightToggle = document.querySelector(".dark-light-toggle-button");
const themeStyle = document.getElementById("theme-style");
const backgroundImage = document.querySelector(".background-image");
const allBtnMobile = document.querySelector(".all-button-mobile");
const activeBtnMobile = document.querySelector(".active-button-mobile");
const completedBtnMobile = document.querySelector(".completed-button-mobile");

document.addEventListener("DOMContentLoaded", function () {
  // items left counter
  let itemsLeftCount = 0;
  console.log(itemsLeftCount);
  taskDoneBtnAll.forEach(function (element) {
    // Check if the element's display property is set to flex
    let computedStyle = window.getComputedStyle(element);
    if (computedStyle.getPropertyValue("display") === "none") {
      itemsLeftCount--;
    }
  });

  // Hide todo item
  todoItems.forEach((item) => {
    item.style.display = "none";
  });

  function addItemCount() {
    itemsLeftCount += 1;
  }

  function subtractItemCount() {
    itemsLeftCount -= 1;
  }

  // Add todo
  addTodoBtn.addEventListener("click", () => {
    const newTodoValue = addTodoInput.value.trim();

    if (newTodoValue === "") {
      alert("Please add a todo item...");
      return;
    }

    const hiddenTodoItem = Array.from(todoItems).find(
      (item) => item.style.display === "none"
    );

    if (hiddenTodoItem) {
      hiddenTodoItem.style.display = "flex";
      hiddenTodoItem.querySelector("p").innerText = newTodoValue;
    }

    addTodoInput.value = "";
    addTodoBtn.checked = false;

    addItemCount();

    if (itemsLeftCount > 6) {
      itemsLeftCount = 6;
    }

    itemsLeft.textContent = `${itemsLeftCount} Items left`;

    console.log(itemsLeftCount);
  });

  // Complete/Check todo
  todoItemsContainer.addEventListener("click", (event) => {
    const checkTodo = event.target.closest(".task-done-btn");

    if (checkTodo) {
      const todoItemContent = checkTodo.closest(".todo-items-content");
      const todoItemText = todoItemContent.querySelector("p");
      const showCheckIcon = todoItemContent.querySelector(".show-check-icon");

      todoItemText.style.textDecoration = "line-through";
      todoItemText.classList.add("line-through-style");
      checkTodo.style.display = "none";
      showCheckIcon.style.display = "flex";
      subtractItemCount();
    }

    itemsLeft.textContent = `${itemsLeftCount} Items left`;
    console.log(itemsLeftCount);
  });

  // Delete todo
  todoItemsContainer.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-button");
    if (deleteBtn) {
      const todoItem = deleteBtn.closest(".item");
      todoItem.style.display = "none";
    }
  });

  // Show all items
  allBtn.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const emptyText = item.querySelector("p");

      item.style.display = "flex";

      if (emptyText.textContent === "") {
        item.style.display = "none";
      }
    });
  });

  allBtnMobile.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const emptyText = item.querySelector("p");

      item.style.display = "flex";

      if (emptyText.textContent === "") {
        item.style.display = "none";
      }
    });
  });

  // Show active items
  activeBtn.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const todoItemText = item.querySelector("p");
      const isCompleted = todoItemText.style.textDecoration === "line-through";
      const withText = todoItemText.textContent === "";

      if (!isCompleted && !withText) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  activeBtnMobile.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const todoItemText = item.querySelector("p");
      const isCompleted = todoItemText.style.textDecoration === "line-through";
      const withText = todoItemText.textContent === "";

      if (!isCompleted && !withText) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Show completed
  completedBtn.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const todoItemText = item.querySelector(".todo-items-content p");
      const isCompleted = todoItemText.style.textDecoration === "line-through";

      if (isCompleted) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  completedBtnMobile.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const todoItemText = item.querySelector(".todo-items-content p");
      const isCompleted = todoItemText.style.textDecoration === "line-through";

      if (isCompleted) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Clear completed
  clearCompletedBtn.addEventListener("click", () => {
    todoItems.forEach((item) => {
      const todoItemText = item.querySelector(".todo-items-content p");
      const checkIcon = item.querySelector(".show-check-icon");
      const paragraphText = item.querySelector("p");
      const taskDoneBtn = item.querySelector(".task-done-btn");

      const isCompleted = todoItemText.style.textDecoration === "line-through";

      if (isCompleted) {
        item.style.display = "none";
        checkIcon.style.display = "none";
        paragraphText.textContent = "";
        paragraphText.style.textDecoration = "none";
        taskDoneBtn.style.display = "flex";
      }
    });
  });
});

// Change color of status to bright blue
function selectStatus(button) {
  // Remove the 'selected' class from all buttons
  let buttons = document.querySelectorAll(".status-button");

  buttons.forEach((btn) => {
    btn.classList.remove("selected-status");
  });

  // Add the 'selected' class to the clicked button
  button.classList.add("selected-status");
}

// Dark/Light Toggle
darkLightToggle.addEventListener("click", () => {
  if (
    themeStyle.href.includes("darkmode") &&
    backgroundImage.src.includes("dark") &&
    darkLightToggle.src.includes("sun")
  ) {
    themeStyle.href = "lightmode.css";
    backgroundImage.src = "./images/bg-desktop-light.jpg";
    darkLightToggle.src = "./images/icon-moon.svg";
  } else {
    themeStyle.href = "darkmode.css";
    backgroundImage.src = "./images/bg-desktop-dark.jpg";
    darkLightToggle.src = "./images/icon-sun.svg";
  }
});
