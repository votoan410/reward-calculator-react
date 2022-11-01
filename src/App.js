import "./App.css";
import RewardTable from "./components/RewardTable";
/*
 A customer receives 2 points for every dollar spent over $100 in each transaction, 
 plus 1 point for every dollar spent over $50 in each transaction 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

 */
function App() {
  return <RewardTable />;
}

export default App;
