export class LocalDatas {
    players = [];
}

export class Player {
    constructor(name) {
      this.name = name;
      this.scores = [];
    }
}
  
export class Score {
    constructor(value, date) {
      this.value = value;
      this.date = date;
    }
}