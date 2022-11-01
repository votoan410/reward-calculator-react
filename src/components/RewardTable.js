import { useState, useEffect } from "react";
export default function RewardTable() {
  const endpoint = "http://localhost:3000/transactions";

  const [transactionData, setTransactionData] = useState([]);
  const [totalPoints, setTotalPoints] = useState({});
  const [loading, setLoading] = useState(false);

  // fetch data when the page just loaded
  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then((response) => response.json())
      .then((jsonData) => {
        setTransactionData(jsonData);
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const calculateRewardPoints = (amount) => {
    if (amount >= 50 && amount <= 100) {
      return amount - 50;
    } else if (amount > 100) {
      return 2 * (amount - 100) + 50;
    }
    return 0;
  };

  useEffect(() => {
    // sort by date javascript
    if (transactionData) {
      const sortedByDate = transactionData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setTransactionData(sortedByDate);
    }
    // map total pays to user
    let userTotalPay = {};
    if (transactionData) {
      // map user to their respective total pay
      transactionData.forEach((transaction) => {
        if (!userTotalPay.hasOwnProperty(transaction.userId)) {
          userTotalPay[transaction.userId] = transaction.value;
        }
        userTotalPay[transaction.userId] += transaction.value;
      });
    }
    if (userTotalPay) {
      let totalPointesPerUser = {};
      for (let entry in userTotalPay) {
        totalPointesPerUser[entry] = calculateRewardPoints(userTotalPay[entry]);
      }
      setTotalPoints(totalPointesPerUser);
    }
  }, [transactionData]);

  return (
    <>
      <table>
        <tr>
          <th>user Id</th>
          <th> Transaction Date</th>
          <th> Payment Value</th>

          <th> Calculated Rewards</th>
        </tr>
        {transactionData.length > 0
          ? transactionData.map((transaction) => (
              <tr>
                <td>{transaction.userId}</td>
                <td>{transaction.date}</td>
                <td>${transaction.value}</td>
                <td>{calculateRewardPoints(transaction.value)}</td>
              </tr>
            ))
          : null}
      </table>

      <table>
        <tr>
          <th>user Id</th>
          <th> Total Calculated Reward Points</th>
        </tr>
        {Object.keys(totalPoints).length > 0
          ? Object.keys(totalPoints).map((entry) => (
              <tr>
                <td>{entry}</td>
                <td>{totalPoints[entry]}</td>
              </tr>
            ))
          : null}
      </table>
    </>
  );
}
