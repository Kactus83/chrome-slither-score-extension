import { StatsButton } from "./components/stats-button.js";
import { Overlay } from "./components/overlay.js";
import eventNames from "../../../events/eventNames.js";

export class Stats {
  constructor() {
    this.statsButton = new StatsButton();
    this.overlay = new Overlay();

    this.handleOpenStatsOverlay = this.handleOpenStatsOverlay.bind(this);
    this.handleCloseStatsOverlay = this.handleCloseStatsOverlay.bind(this); 
  }

  init() {
    this.appendStylesheet();
    this.statsButton.render();
    document.body.appendChild(this.overlay.element);

    document.addEventListener(eventNames.UserEvents.OPEN_STATS_OVERLAY, this.handleOpenStatsOverlay);
    document.addEventListener(eventNames.UserEvents.CLOSE_STATS_OVERLAY, this.handleCloseStatsOverlay); 
  }

  show() {
    this.statsButton.show();
  }

  hide() {
    this.statsButton.hide();
    this.overlay.hide();
  }

  handleOpenStatsOverlay() {
    this.statsButton.hide();
    this.overlay.show();
  }

  handleCloseStatsOverlay() { 
    this.statsButton.show();
    this.overlay.hide();
  }

  remove() {
    document.removeEventListener(eventNames.UserEvents.OPEN_STATS_OVERLAY, this.handleOpenStatsOverlay);
    document.removeEventListener(eventNames.UserEvents.CLOSE_STATS_OVERLAY, this.handleCloseStatsOverlay); 

    this.statsButton.remove();
    this.overlay.remove();
    this.removeStylesheet();
  }

  appendStylesheet() {
    this.link = document.createElement("link");
    this.link.rel = "stylesheet";
    this.link.href = chrome.runtime.getURL("content/gui/modules/stats/stats.css");
    document.head.appendChild(this.link);
  }

  removeStylesheet() {
    if (this.link) {
      this.link.remove();
    }
  }
}

export default Stats;
