const { createApp } = Vue

  createApp({
    data() {
      return {
        guesses: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
                  ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]],
        message: words[200]
      }
    },
    mounted() {   
    }
  }).mount('#app')
