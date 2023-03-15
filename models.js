class LocalDatas {
    players = [];
}

class Player {
    constructor(name) {
      this.name = name;
      this.scores = [];
    }
}
  
class Score {
    constructor(value, date) {
      this.value = value;
      this.date = date;
    }
}