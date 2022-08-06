const { createApp } = Vue

  createApp({
    data() {
      return {
        letters: [],
        indexCounter: 0
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
        this.updateWordList();
      },
      addLetterToGrid(letter) {
        if (this.indexCounter < 30) {
          this.letters[this.indexCounter].text = letter;
          this.letters[this.indexCounter].state = 'absent';
          this.indexCounter += 1;
        }
      },
      deleteLetterFromGrid() {
        if (this.indexCounter > 0) {
          this.indexCounter -= 1;
          this.letters[this.indexCounter].text = '';
          this.letters[this.indexCounter].state = 'empty';
        }
      },
      updateWordList() {
        console.log('Updated')
      },
      openKeyboard() {
          var inputElement = document.getElementById('hiddenInput');
          inputElement.style.visibility = 'visible'; // unhide the input
          inputElement.focus(); // focus on it so keyboard pops
          inputElement.style.visibility = 'hidden'; // hide it again
      }
    }
  }).mount('#app')
