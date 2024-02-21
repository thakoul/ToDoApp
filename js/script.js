"use strict";
const todoList = document.querySelector(".todo-list");
const todoText = document.querySelector("#new-item-input");
const btnAdd = document.querySelector("#new-item-btn");
const completedPercentage = document.querySelector(".completed-percentage");

function checkPercentage() {
  const totalListItems = document.querySelectorAll(".todo-list li").length;
  const listItemsChecked = document.querySelectorAll(
    "input[type='checkbox']:checked"
  ).length;

  // Calculates the percentage of checked todos
  const percentage =
    totalListItems > 0
      ? Math.floor((listItemsChecked / totalListItems) * 100)
      : 0;

  // Displays the percentage
  percentage > 0
    ? (completedPercentage.textContent = `${percentage}% of your todos have been completed.`)
    : (completedPercentage.textContent = `No todos have been completed.`);
}

addEventListener("DOMContentLoaded", () => {
  checkPercentage();
});

btnAdd.addEventListener("click", function (e) {
  // Prevents default action
  e.preventDefault();

  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const btnDelete = document.createElement("button");
  const text = todoText.value;

  // Guard clause - trims whitespace and if text is empty it exits the event listener
  if (text.trim() === "") {
    return;
  }

  // a class is added to the li and then the li is added to the list
  listItem.classList.add("todo-list-item");
  todoList.appendChild(listItem);

  // Input type is set to checkbox and its default check value is set to false
  input.type = "checkbox";
  input.checked = false;

  // The checkbox is added inside the label and then the todo text
  label.appendChild(input);
  label.appendChild(document.createTextNode(text));

  // Text and classes are added to the delete button
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("btn", "btn-delete");

  // The label and the button are added inside the list item
  listItem.appendChild(label);
  listItem.appendChild(btnDelete);

  checkPercentage();

  // Empties text
  // todoText.value = "";

  input.addEventListener("change", function (e) {
    checkPercentage();

    // Class is added or removed from the label depending on whether the checkbox is checked.
    e.target.checked
      ? label.classList.add("strikethrough")
      : label.classList.remove("strikethrough");
  });

  btnDelete.addEventListener("click", function (e) {
    // Deletes the parent element of the button that was clicked
    e.target.parentElement.remove();

    checkPercentage();
  });
});
