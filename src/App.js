import "./App.css";
import RewardTable from "./components/RewardTable";
import { useEffect, useState } from "react";
import fetchTransactions from "./api/fetchTransactions";

/*
 A customer receives 2 points for every dollar spent over $100 in each transaction, 
 plus 1 point for every dollar spent over $50 in each transaction 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

 */
function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchTransactions()
      .then((jsonData) => {
        setTransactionData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <RewardTable transactionData={transactionData} loading={loading} />;
}

export default App;
