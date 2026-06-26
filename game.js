class MatchPins {

    constructor(pins = ["blue", "green", "red", "yellow", "white"]) {

        // correct solution
        this.pins = [...pins];

        // current board state (what user sees)
        this.guess = [...pins];

        this.size = this.pins.length;

        this.shufflePins();
    }

    /* RESET GAME */
    reset() {
        this.guess = [...this.pins];
        this.shufflePins();
    }

    /* SET FULL GUESS (optional external sync) */
    setGuess(guess) {
        if (!Array.isArray(guess) || guess.length !== this.size) {
            console.error("Invalid guess array");
            return;
        }
        this.guess = [...guess];
    }

    /* SWAP TWO POSITIONS */
    switchPin(index1, index2) {

        if (
            index1 < 0 || index2 < 0 ||
            index1 >= this.size || index2 >= this.size
        ) {
            console.error("Invalid swap indices");
            return;
        }

        const temp = this.guess[index1];
        this.guess[index1] = this.guess[index2];
        this.guess[index2] = temp;
    }

    /* SHUFFLE CURRENT GUESS */
    shufflePins() {
        for (let i = this.guess.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.guess[i], this.guess[j]] = [this.guess[j], this.guess[i]];
        }
    }

    /* GET NUMBER OF CORRECT POSITIONS */
    checkPins() {
        let count = 0;

        for (let i = 0; i < this.size; i++) {
            if (this.pins[i] === this.guess[i]) {
                count++;
            }
        }

        return count;
    }

    /* CHECK WIN CONDITION */
    checkGameOver() {
        return this.checkPins() === this.size;
    }

    /* GET CURRENT STATE (VERY USEFUL FOR UI) */
    getGuess() {
        return [...this.guess];
    }

    /* GET SOLUTION (optional debugging) */
    getSolution() {
        return [...this.pins];
    }
}