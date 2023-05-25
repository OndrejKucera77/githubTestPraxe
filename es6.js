const clovek = {
    jmeno: "Mosh",
    mluv() {
        console.log(this)
    }
}

clovek.mluv();

const mluveni = clovek.mluv.bind(clovek);
console.log(mluveni);
mluveni();