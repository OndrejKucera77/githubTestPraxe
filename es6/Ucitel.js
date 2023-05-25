import { Clovek } from "./Clovek.js";

export function povyseni() {console.log("Povýšen!")}

export class Ucitel extends Clovek {
    constructor(jmeno, titul) {
        super(jmeno);
        this.titul = titul;
    }

    nauc() {
        console.log("Učím.");
    }
}