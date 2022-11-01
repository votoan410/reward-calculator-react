import { useState, useEffect } from "react";
import calculateRewardPoints from "../utils/pointsCalculate";

export default function RewardTable(props) {
  const [totalPoints, setTotalPoints] = useState({});

  const { transactionData, loading } = props;

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
      let totalPointesPerUser = {};
      for (let entry in userTotalPay) {
        totalPointesPerUser[entry] = calculateRewardPoints(userTotalPay[entry]);
      }
      setTotalPoints(totalPointesPerUser);
    }
  }, [transactionData]);

  return (
    <>
      {loading ? (
        <div>Table is waiting for data...</div>
      ) : (
        <>
          <table data-testid="table">
            <thead>
              <tr>
                <th>user Id</th>
                <th> Transaction Date</th>
                <th className="table__header-green"> Payment Value $$$</th>
                <th className="table__header-yellow"> Calculated Rewards</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction) => (
                <tr>
                  <td>{transaction.userId}</td>
                  <td>
                    {new Date(transaction.date).toDateString()}{" "}
                    {new Date(transaction.date).toTimeString()}
                  </td>
                  <td>${transaction.value}</td>
                  <td>{calculateRewardPoints(transaction.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table data-testid="table">
            <thead>
              <tr>
                <th>User Id</th>
                <th className="table__header-yellow">
                  Total Calculated Reward Points
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(totalPoints).map((entry) => (
                <tr>
                  <td>{entry}</td>
                  <td>{totalPoints[entry]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
