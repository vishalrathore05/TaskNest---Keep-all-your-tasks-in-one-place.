import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["list", "form"]; // Declare targets for list and form

  connect() {
    console.log("Task controller connected");
  }

  create(event) {
    event.preventDefault(); // Prevent default form submission
    const form = this.formTarget;

    fetch(form.action, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      },
      body: new FormData(form),
    })
      .then(response => response.text())
      .then(html => {
        this.listTarget.insertAdjacentHTML("beforeend", html); // Append new task
        form.reset(); // Clear form
      })
      .catch(error => console.error("Error creating task:", error));
  }

  toggleComplete(event) {
    const taskElement = event.target.closest("[data-task-id]");
    const taskId = taskElement.dataset.taskId;

    fetch(`/tasks/${taskId}/toggle_complete`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      },
    })
      .then(() => taskElement.classList.toggle("completed"));
  }

  delete(event) {
    const taskElement = event.target.closest("[data-task-id]");
    const taskId = taskElement.dataset.taskId;

    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      },
    })
      .then(() => taskElement.remove()); // Remove task element
  }
}