import eventNames from "../../../../events/eventNames.js";

export class StatsButton {
  constructor() {
    this.button = document.createElement("button");
    this.button.textContent = "Stats";
    this.button.classList.add("stats-button");
    this.button.classList.add("main-stats-button");
    this.button.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.OPEN_STATS_OVERLAY));
  }

  render() {
    document.body.appendChild(this.button);
  }

  hide() {
    this.button.style.display = "none";
  }

  show() {
    this.button.style.display = "block";
  }

  remove() {
    this.button.removeEventListener("click", this.handleClick.bind(this));
    this.button.remove();
  }
}
