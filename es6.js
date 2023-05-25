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

//---------------------------------------------------
const druhaMocnina = a => a*a;

console.log(druhaMocnina(-4));

const prace = [
    {id: 1, aktivni: true},
    {id: 2, aktivni: true},
    {id: 3, aktivni: false}
];

aktivniPrace = prace.filter(pr => pr.aktivni);


//---------------------------------------------------
const clovek2 = {
    mluv() { 
        setTimeout(() => {
            console.log(this);
        }, 1000);
    }
}

clovek2.mluv();

//---------------------------------------------------
const barvy = ["červená", "zelená", "modrá"];
const polozky = barvy.map(barva => `<li>${barva}</li>`);
console.log(polozky);

//---------------------------------------------------
const adresa = {
    ulice: "Průběžná 1720/3",
    mesto: "Ostrava-Poruba",
    stat: "Česká republika"
}

/*
const ulice = adresa.ulice;
const mesto = adresa.mesto;
const stat = adresa.stat;
*/

const {ulice, mesto, stat: zeme} = adresa;

console.log(ulice, mesto, zeme);