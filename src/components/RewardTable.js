import { useState, useEffect } from "react";
export default function RewardTable() {
  const endpoint = "http://localhost:3000/transactions";

  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    if (amount >= 50 && amount < 100) {
      return amount - 50;
    } else if (amount > 100) {
      return 2 * (amount - 100) + 50;
    }
    return 0;
  };

  useEffect(() => {
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
      console.log("before calculation: ", userTotalPay);
      for (let entry in userTotalPay) {
        userTotalPay[entry] = calculateRewardPoints(userTotalPay[entry]);
      }
      console.log("after total reward: ", userTotalPay);
    }
  }, [transactionData]);

  return (
    <>
      <table>
        <tr>
          <th>user Id</th>
          <th> Transaction Date</th>
          <th> Calculated Rewards</th>
        </tr>
      </table>
    </>
  );
}
