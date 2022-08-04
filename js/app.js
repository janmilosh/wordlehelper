const { createApp } = Vue

  createApp({
    data() {
      return {
        letters: []          
      }
    },
    mounted() { 
      this.buildDataArray()
    },
    methods: {
      buildDataArray() {
        for (let i = 0; i < 30; i++) {
          this.letters[i] = {text: "test" + i, state: "empty"};
        }
      },
      toggleState(index) {
        let states = ["empty", "absent", "present", "correct"];
        switch(this.letters[index].state) {
          case "empty": this.letters[index].state = "absent"; break;
          case "absent": this.letters[index].state = "present"; break;
          case "present": this.letters[index].state = "correct"; break;
          case "correct": this.letters[index].state = "empty";
        }
      }
    }
  }).mount('#app')
