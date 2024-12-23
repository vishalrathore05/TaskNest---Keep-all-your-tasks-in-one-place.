import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static values = { count: Number }

  connect() {
    this.countValue = 0
  }

  increment() {
    this.countValue += 1
    this.element.textContent = `Count: ${this.countValue}`
  }

  decrement() {
    this.countValue -= 1
    this.element.textContent = `Count: ${this.countValue}`
  }
}