function random(callback) {
  console.log("To resolve or not to resolve..hhehehe");
  console.log("Dont worry let's resolve 😂");
  callback();
}

let p = new Promise(random);
p.then(function () {
  console.log("haha... finally i am resolved 😮‍💨");
});
