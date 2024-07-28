<template>
    <header>
        <h1>
            brat calculator
        </h1>
    </header>
    <div class="calculator-box">
    <div class="calculator">
        <div class="display">{{ display }}</div>
        <div class="buttons">
        <button v-for="button in buttons" :key="button.value" @click="handleClick(button)">
        {{ button.label }}
        </button>
    </div>
    </div>
    </div>
    <footer>
  copyright rose omalley ;-)
</footer>

</template>

<script>
export default{
    data() {
        return {
            display: '',
            buttons: [
                {label: '1', value: '1', sound:'vue-project/public/sounds/girl.wav'},
                {label: '2', value: '2', sound:'./sounds/2.wav'},
                {label: '3', value: '3', sound:'./sounds/3b.wav'},
                {label: '+', value: '+', sound: './sounds/bumpin-that-a.wav'},
                {label: '4', value: '4', sound:'./sounds/4b.wav'},
                {label: '5', value: '5', sound:'./sounds/5.wav'},
                {label: '6', value: '6', sound:'./sounds/6.wav'},
                {label: '-', value: '-', sound:'./sounds/bumpin-that-b.wav'},
                {label: '7', value: '7', sound:'./sounds/7.wav'},
                {label: '8', value: '8', sound:'./sounds/8.wav'},
                {label: '9', value: '9', sound:'./sounds/9.wav'},
                {label: '*', value: '*', sound:'./sounds/times.wav'},
                {label: '/', value: '/', sound:'./sounds/divide.wav'},
                {label: '0', value: '0', sound:'./sounds/0.wav'},
                {label: '.', value: '.', sound:'./sounds/clap-plus.wav'},
                {label: 'AC', value: 'all-clear', sound:'./sounds/ac-rewind.wav'},
                {label: '=', value: '=', sound:'./sounds/im-a-brat.wav'}   
            ],
        };
    },
    methods: {
        handleClick(button) {
      if (button.value === 'all-clear') {
        this.display = '';
      } else if (['+', '-', '*', '/'].includes(button.value)) {
        this.display += ` ${button.value} `;
      } else if (button.value === '=') {
        this.calculate();
      } else {
        this.display += button.value;
      }
      this.playSound(button.sound);
    },
    calculate() {
      try {
        this.display = eval(this.display);
      } catch (e) {
        this.display = 'Error';
      }
    },
    playSound(sound) {
      const audio = new Audio(sound);
      audio.play();
    },
    mounted(){

    }
  },
       
};
</script>
<style>

h1{
    display: flex;
    justify-content: center;
    color: #ccc;
}

.calculator {

  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #8ACE00;
}
.display {
  font-family: Arial;
  font-weight: 800;
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  border: 1px solid #ccc;
  border: 5px solid black;
  border-radius: 5px;
  background-color: white;
}
.buttons {

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
button {
  font-family: Arial;
  font-weight: 800;
  padding: 20px;
  font-size: 18px;
  border: 5px solid black;
  border-radius: 5px;
  background-color: #8ACE00;
  cursor: pointer;
}
button:hover {
  background-color: black;
  color: white;
}

footer{
    margin-left: 100px;
}


</style>