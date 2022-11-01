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
        // add user and current points to the new object
        if (!userTotalPay.hasOwnProperty(transaction.userId)) {
          userTotalPay[transaction.userId] = calculateRewardPoints(
            transaction.value
          );
        } 
        // if the user already exists within the new object, then just accumulate the point
        else {
          userTotalPay[transaction.userId] += calculateRewardPoints(
            transaction.value
          );
        }
      });
    }
    setTotalPoints(userTotalPay);
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
              {transactionData.map((transaction, idx) => (
                // use index as key in this case because that is the only stable and unique data
                // for the current application
                <tr key={idx}>
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
              {/* the USER ID will be used as key in here since it will be unique in this case */}
              {Object.keys(totalPoints).map((entry) => (
                <tr key={entry}>
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
