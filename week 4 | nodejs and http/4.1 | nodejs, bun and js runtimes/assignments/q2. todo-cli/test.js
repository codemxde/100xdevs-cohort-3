const proto = {
  fname: "Keshav",
  lname: "Kaushik",
};

const obj = Object.create(proto);

obj.hi = "there";
console.log(obj.fname);
console.log(Object.getOwnPropertyNames(obj).length);
console.log(Object.keys(obj).length);
