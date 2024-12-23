import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["likeCount"];

  connect() {
    console.log("Post controller connected!");
  }

  like() {
    alert("Like button clicked!"); // Debugging alert
    let count = parseInt(this.likeCountTarget.textContent);
    this.likeCountTarget.textContent = count + 1;
  }
}
