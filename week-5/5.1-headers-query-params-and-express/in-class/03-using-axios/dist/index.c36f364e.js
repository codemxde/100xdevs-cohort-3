// async function getJSONData() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts/1"
//   );
//   const data = response.data;
//   console.log(data);
// }
// getJSONData();
axios.get("https://jsonplaceholder.typicode.com/posts/1").then(function(response) {
    const data = response.data;
    console.log(data);
});

//# sourceMappingURL=index.c36f364e.js.map
