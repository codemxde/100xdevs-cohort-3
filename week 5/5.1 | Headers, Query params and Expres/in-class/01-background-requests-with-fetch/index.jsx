function MyComponent(props) {
  const { data } = props;

  const body = data.body;
  const id = data.id;
  const title = data.title;
  const userId = data.userId;

  return (
    <div>
      <p>body: {body}</p>
      <p>id: {id}</p>
      <p>title:{title} </p>
      <p>userId: {userId}</p>
    </div>
  );
}

// async function getJsonData() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//   const data = await response.json();
//   console.log("data", data);

//   ReactDOM.render(<MyComponent data={data} />, document.getElementById("root"));
// }
// getJsonData();

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("data:", data);
  })
  .catch(function (err) {
    console.log("error occurred:", err.message);
  });
