const { createApp } = Vue

createApp({
  data() {
    return {
      letters: [],
      indexCounter: 0,
      correct: [null, null, null, null, null],
      inWord: [],
      present: [],
      absent: [],
      wordList: [],
      wordsArray: [[0, 5, 10, 15, 20, 25],
                  [1, 6, 11, 16, 21, 26],
                  [2, 7, 12, 17, 22, 27],
                  [3, 8, 13, 18, 23, 28],
                  [4, 9, 14, 19, 24, 29]]
    }
  },
  mounted() {
    let self = this;

    this.buildDataArray();

    window.addEventListener('keydown', function($event) {
      self.handleInput($event);
    });
  },
  methods: {
    buildDataArray() {
      for (let i = 0; i < 30; i++) {
        this.letters[i] = {text: '', state: 'empty'};
      }
    },
    toggleState(index) {
      switch(this.letters[index].state) {
        case 'absent': this.letters[index].state = 'present'; break;
        case 'present': this.letters[index].state = 'correct'; break;
        case 'correct': this.letters[index].state = 'absent';
      }
      this.updateWordList();
    },
    handleInput($event) {
      let letters = /^[A-Za-z]+$/;
      if ($event.key.match(letters) && $event.key.length === 1) {
        let letter = $event.key.toUpperCase();
        this.addLetterToGrid(letter);
      } else if ($event.keyCode === 8 || $event.keyCode === 46) {
        this.deleteLetterFromGrid()
      } else {
        $event.preventDefault();
      }
    },
    addLetterToGrid(letter) {
      if (this.indexCounter < 30) {
        this.letters[this.indexCounter].text = letter;
        this.letters[this.indexCounter].state = 'absent';
        this.indexCounter += 1;
        this.updateWordList()
      }
    },
    deleteLetterFromGrid() {
      if (this.indexCounter > 0) {
        this.indexCounter -= 1;
        this.letters[this.indexCounter].text = '';
        this.letters[this.indexCounter].state = 'empty';
        this.updateWordList()
      }
    },
    updateWordList() {
      if (this.rowsComplete()) {
        this.wordList = words
        this.updateInWordLetters();
        this.updateCorrect();
        this.updatePresent();
        this.updateAbsent();
        this.filterForInWord();
        this.filterForAbsent();
      }
    },
    rowsComplete() {
      let completeIndexes = [5, 10, 15, 20, 25, 30];
      if (completeIndexes.includes(this.indexCounter)) {
        return true;
      } else {
        return false;
      }
    },
    updateInWordLetters() {
      this.inWord = [];
      for (let i = 0; i < this.indexCounter; i++) {
        if (this.letters[i].state === 'present' || this.letters[i].state === 'correct') { 
          this.inWord.push(this.letters[i].text);
        }
      }
      this.inWord = [...new Set(this.inWord)];
    },
    updateAbsent() {
      this.absent = []
      this.wordsArray.forEach((wordArr, column) => {
        wordArr.forEach((lettersIndex, row) => {
          let state = this.letters[lettersIndex].state
          let letter = this.letters[lettersIndex].text
          if (state === 'absent') {
            this.absent.push(letter);
          }
        });
      });
    },
    updatePresent() {
      this.present = [[], [], [], [], []]
      this.wordsArray.forEach((wordArr, column) => {
        wordArr.forEach((lettersIndex, row) => {
          let state = this.letters[lettersIndex].state
          let letter = this.letters[lettersIndex].text
          if (state === 'present') {
            this.present[column].push(letter);
          }
        });
      });
    },
    updateCorrect() {
      this.correct = [null, null, null, null, null]
      this.wordsArray.forEach((wordArr, column) => {
        wordArr.forEach((lettersIndex, row) => {
          let state = this.letters[lettersIndex].state
          let letter = this.letters[lettersIndex].text
          if (state === 'correct') {
            this.correct[column] = letter;
          }
        });
      });
    },
    filterForInWord() {
      this.inWord.forEach((letter) => {
        this.wordList = this.wordList.filter(word => word.toUpperCase().includes(letter))
      });
    },
    filterForAbsent() {
      this.absent.forEach((letter) => {
        this.wordList = this.wordList.filter(word => !word.toUpperCase().includes(letter))
      });
    },
    openKeyboard() {
      let inputElement = document.getElementById('hiddenInput');
      inputElement.style.visibility = 'visible';
      inputElement.focus();
      inputElement.style.visibility = 'hidden';
      window.scrollTo(0,0);
    }
  }
}).mount('#app')
