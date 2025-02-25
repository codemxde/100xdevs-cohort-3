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
    return /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.jsx",
            lineNumber: 14,
            columnNumber: 5
        },
        __self: this
    }, "Id: ", id, " and title: ", title);
}
axios.get("https://jsonplaceholder.typicode.com/posts/1").then(function(response) {
    const data = response.data;
    ReactDOM.render(/*#__PURE__*/ React.createElement(MyComponent, {
        data: data,
        __source: {
            fileName: "index.jsx",
            lineNumber: 25,
            columnNumber: 7
        },
        __self: this
    }), document.getElementById("root"));
});

//# sourceMappingURL=index.93d55021.js.map
