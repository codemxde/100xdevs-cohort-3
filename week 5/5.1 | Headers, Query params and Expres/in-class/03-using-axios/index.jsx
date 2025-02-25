// async function getJSONData() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts/1"
//   );
//   const data = response.data;
//   console.log(data);
// }

// getJSONData();

function MyComponent(props) {
  const { id, title } = props;
  return (
    <p>
      Id: {id} and title: {title}
    </p>
  );
}

axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then(function (response) {
    const data = response.data;
    ReactDOM.render(
      <MyComponent data={data} />,
      document.getElementById("root")
    );
  });
