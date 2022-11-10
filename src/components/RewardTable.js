import { useState, useEffect } from "react";
import calculateRewardPoints from "../utils/pointsCalculate";

export default function RewardTable({
  transactionData = null,
  loading = false,
}) {
  const [totalPoints, setTotalPoints] = useState({});

  useEffect(() => {
    let userTotalPay = {};
    // map user to their respective total pay
    transactionData?.forEach((transaction) => {
      // add user and current points to the new object
      if (!userTotalPay.hasOwnProperty(transaction.userId)) {
        userTotalPay[transaction.userId] = calculateRewardPoints(
          transaction.transactionPrice
        );
      }
      // if the user already exists within the new object, then just accumulate the point
      else {
        userTotalPay[transaction.userId] += calculateRewardPoints(
          transaction.transactionPrice
        );
      }
    });

    setTotalPoints(userTotalPay);
  }, [transactionData]);

  return loading ? (
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
            // update: previously, I used index which is NOT GOOD, updated it with transactionId
            <tr key={transaction.transactionId}>
              <td>{transaction.userId}</td>
              <td>
                {new Date(transaction.date).toDateString()}{" "}
                {new Date(transaction.date).toTimeString()}
              </td>
              <td>${transaction.transactionPrice}</td>
              <td>{calculateRewardPoints(transaction.transactionPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table data-testid="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th className="table__header-yellow">
              Total Calculated Reward Points Per User Id
            </th>
          </tr>
        </thead>
        <tbody>
          {/* the USER ID will be used as key in here since it will be unique in this case */}
          {Object.keys(totalPoints).map((userId) => (
            <tr key={userId}>
              <td>{userId}</td>
              <td>{totalPoints[userId]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
