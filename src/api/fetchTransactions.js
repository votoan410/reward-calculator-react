export default function fetchTransactions() {
  const endpoint = "http://localhost:3000/transactions";

  return fetch(endpoint)
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData;
    });
}
