class MatchPins {
    
    constructor(pins = ["blue", "green", "red", "yellow", "white"]) {
        this.pins = [...pins];

        this.guess = [...pins];
        this.shufflePins(this.guess);

        this.size = this.pins.length;
    }

    setGuess(guess) {
        this.guess = [...guess];
    }

    showPins() {
        console.log(this.pins);
    }

    showGuess() {
        console.log(this.guess);
    }

    switchPin(pin1, pin2) {
        const temp = this.guess[pin1];
        this.guess[pin1] = this.guess[pin2];
        this.guess[pin2] = temp;
    }

    shufflePins(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    checkPins() {
        if (this.size !== this.guess.length) {
            return null;
        }

        let count = 0;

        for (let i = 0; i < this.size; i++) {
            if (this.pins[i] === this.guess[i]) {
                count++;
            }
        }

        return count;
    }

    checkGameOver() {
        const correct = this.checkPins();

        if (correct === null) {
            console.error("Invalid Guess Length");
            return false;
        }

        if (correct === this.size) {
            return true;
        }

        return false;
    }
}