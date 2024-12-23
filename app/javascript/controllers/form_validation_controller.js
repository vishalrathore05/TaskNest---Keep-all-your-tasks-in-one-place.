import { Controller } from "@hotwired/stimulus";
 
export default class extends Controller {
  static targets = ["form", "email", "password", "submitButton"];
 
  connect() {
    // Attach real-time validation to the input fields
    this.emailTarget.addEventListener("input", this.validateEmail.bind(this));
    this.passwordTarget.addEventListener("input", this.validatePassword.bind(this));
  }
 
  handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
 
    // Clear existing errors
    this.clearErrors();
 
    // Perform final validation on submit
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
 
    if (emailValid && passwordValid) {
      this.formTarget.submit(); // Submit the form if valid
    }
  }
 
  validateEmail() {
    const emailField = this.emailTarget;
    const email = emailField.value.trim();
 
    this.clearError(emailField); // Clear existing error for real-time feedback
 
    if (email === "") {
      this.showError(emailField, "Eメールアドレスは必須です。");
      return false;
    }
 
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidFormat) {
      this.showError(emailField, "メールアドレスが無効です。");
      return false;
    }
 
    return true;
  }
 
  validatePassword() {
    const passwordField = this.passwordTarget;
    const password = passwordField.value.trim();
 
    this.clearError(passwordField); // Clear existing error for real-time feedback
 
    if (password === "") {
      this.showError(passwordField, "パスワードが必要です。");
      return false;
    }
 
    return true;
  }
 
  showError(field, message) {
    const errorElement = document.createElement("div");
    errorElement.innerText = message;
 
    // Inline CSS for error message
    errorElement.style.position = "relative";
    errorElement.style.left = "-125px"; // Adjust to move the error to the left side of the input field
    errorElement.style.top = "5px"; // Adjust the vertical position
    errorElement.style.color = "red";
    errorElement.style.fontSize = "0.9rem";
    errorElement.style.marginTop = "5px";
 
    // Add error message to the DOM
    field.parentElement.appendChild(errorElement);
 
    // Highlight the input field
    field.style.borderColor = "red";
  }
 
  clearError(field) {
    // Remove error message from the DOM
    const existingError = field.parentElement.querySelector("div[style*='color: red']");
    if (existingError) {
      existingError.remove();
    }
 
    // Reset input field styles
    field.style.borderColor = "";
  }
 
  clearErrors() {
    // Remove all error messages
    const errorMessages = this.formTarget.querySelectorAll("div[style*='color: red']");
    errorMessages.forEach((msg) => msg.remove());
 
    // Reset input field styles
    [this.emailTarget, this.passwordTarget].forEach((field) => {
      field.style.borderColor = "";
    });
  }
}