// fetch("http://localhost:3000/sum?a=5&b=10")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// async function getSum() {
//   const response = await axios.post("http://localhost:3000/sum", {
//     a: document.getElementById("a"),
//     b: document.getElementById("b"),
//   });
//   const data = response.data;
//   alert("Sum is", data);
// }

async function sendRequest() {
  fetch("http://localhost:3000/sum", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      a: document.getElementById("a").value,
      b: document.getElementById("b").value,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
