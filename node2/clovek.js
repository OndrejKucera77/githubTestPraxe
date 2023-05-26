class Clovek {
    constructor(jmeno, vek) {
        this.jmeno = jmeno;
        this.vek = vek;
    }

    pozdrav() {
        console.log(`Jmenuji se ${this.jmeno}, mám ${this.vek} let.`);
    }
}

module.exports = Clovek;