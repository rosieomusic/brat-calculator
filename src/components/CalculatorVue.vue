<template>
	<header>
		<h1>brat calculator</h1>
	</header>
	<div class="calculator-box">
		<div class="calculator">
			<div class="display">{{ display }}</div>
			<div class="buttons">
				<button
					tabindex="0"
					v-for="button in buttons"
					:key="button.value"
					@click="handleClick(button)"
				>
					{{ button.label }}
				</button>
			</div>
		</div>
	</div>
	<footer>copyright rose omalley ;-)</footer>
</template>

<script>
	import { evaluate } from 'mathjs';
	export default {
		data() {
			return {
				display: '',
				buttons: [
					{ label: '1', value: '1', sound: './sounds/girl.wav' },
					{ label: '2', value: '2', sound: './sounds/2.wav' },
					{ label: '3', value: '3', sound: './sounds/3b.wav' },
					{ label: '+', value: '+', sound: './sounds/bumpin-that-a.wav' },
					{ label: '4', value: '4', sound: './sounds/4b.wav' },
					{ label: '5', value: '5', sound: './sounds/5.wav' },
					{ label: '6', value: '6', sound: './sounds/6.wav' },
					{ label: '-', value: '-', sound: './sounds/bumpin-that-b.wav' },
					{ label: '7', value: '7', sound: './sounds/7.wav' },
					{ label: '8', value: '8', sound: './sounds/8.wav' },
					{ label: '9', value: '9', sound: './sounds/9.wav' },
					{ label: '*', value: '*', sound: './sounds/times.wav' },
					{ label: '/', value: '/', sound: './sounds/divide.wav' },
					{ label: '0', value: '0', sound: './sounds/0.wav' },
					{ label: '.', value: '.', sound: './sounds/clap-plus.wav' },
					{ label: 'AC', value: 'all-clear', sound: './sounds/ac-rewind.wav' },
					{ label: '=', value: '=', sound: './sounds/im-a-brat.wav' },
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
					this.display = evaluate(this.display);
				} catch (e) {
					this.display = 'Error';
				}
			},
			playSound(sound) {
				if (!sound) return;
				const audio = new Audio(sound);
				audio.play().catch((error) => {
					console.error('Error playing sound:', error);
				});
			},
			handleKeyPress(event) {
				const key = event.key;
				const button = this.buttons.find((b) => b.value === key);

				if (button) {
					this.handleClick(button);
				} else if (key === 'Enter') {
					this.handleClick(this.buttons.find((b) => b.value === '='));
				} else if (key === 'Backspace') {
					this.display = this.display.slice(0, -1);
				} else if (key === 'c') {
					this.handleClick(this.buttons.find((b) => b.value === 'all-clear'));
				}
			},
		},

		mounted() {
			window.addEventListener('keydown', this.handleKeyPress);
			console.log('Calculator component has been mounted');
		},
		beforeUnmount() {
			window.removeEventListener('keydown', this.handleKeyPress);
		},
	};
</script>
<style scoped>
	h1 {
		display: flex;
		justify-content: center;
		color: #ccc;
		margin-bottom: 20px;
	}

	.calculator {
		width: 400px;
		margin: 0 auto;
		padding: 20px;

		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		background-color: #8ace00;
	}
	.display {
		font-family: Arial;
		font-weight: 800;
		width: 100%;
		height: 90px;
		margin-bottom: 20px;
		padding: 1px;
		font-size: 50px;
		text-align: right;
		border: 3px solid black;
		border-radius: 5px;
		background-color: white;
		overflow: auto;
		overflow-y: hidden;
		scrollbar-color: transparent;
		text-wrap: wrap;
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
		border: 2px solid black;
		border-radius: 80px;
		background-color: #8ace00;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		outline: none;
		color: inherit;
		text-decoration: none;
	}

	button:hover {
		background-color: black;
		color: white;
	}

	button:focus,
	button:active {
		outline: none;
		-webkit-tap-highlight-color: transparent;
		color: inherit; /* Ensures the text color remains unchanged */
		text-decoration: none; /* Prevents any text decoration */
		background-color: #8ace00; /* Reverts to original background color */
	}

	footer {
		color: #ccc;
		margin-left: 100px;
	}

	@media only screen and (max-width: 425px) {
		button {
			font-family: Arial;
			font-weight: 800;
			padding: 20px;
			font-size: 18px;
			border: 5px solid black;
			border-radius: 5px;
			background-color: #8ace00;
			cursor: pointer;
		}
	}
</style>
