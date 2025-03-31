let x: number | string = 12;

x = "keshav";

console.log(x);

function greet(fname: string) {
  console.log(`Hi ${fname}`);
}

greet("codemxde");

function sumKarDoNaPls(a: number, b: number) {
  return a + b;
}

let aaah = sumKarDoNaPls(12, 13);
console.log(aaah);

function zyadaBadaHoGyaKya(age: number): boolean {
  return age >= 18;
}

console.log(zyadaBadaHoGyaKya(1));

function runMeDaddy() {
  console.log("i raaan!");
}

function callMeMaybeLater(callback: () => void) {
  setTimeout(callback, 1000);
}

callMeMaybeLater(runMeDaddy);
