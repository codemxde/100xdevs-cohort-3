const axios = require("axios");

async function useFetch() {
  fetch("https://httpdump.app/dumps/9c1c05c3-0bca-46ed-aec1-9adfa367eed1", {
    method: "POST",
    body: JSON.stringify({
      fname: "Keshav",
      age: 24,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer-123",
    },
  });
}

async function useAxios() {
  axios.post(
    "https://httpdump.app/dumps/9c1c05c3-0bca-46ed-aec1-9adfa367eed1",
    {
      username: "keshav123",
      password: "123",
    },
    {
      headers: {
        Authorization: "Bearer-1212",
      },
    }
  );
}

async function useJustAxios() {
  axios({
    url: "https://httpdump.app/dumps/9c1c05c3-0bca-46ed-aec1-9adfa367eed1",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer-1212",
    },
    data: {
      username: "vidhi",
      email: "haha@ha.com",
    },
  });
}

// useFetch();
// useAxios();
useJustAxios();
