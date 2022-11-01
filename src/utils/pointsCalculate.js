// this function calculate the points based on the amount spent
export default function calculateRewardPoints(amount) {
  if (amount >= 50 && amount <= 100) {
    return amount - 50;
  } else if (amount > 100) {
    return 2 * (amount - 100) + 50;
  }
  return 0;
}
