export const calculateStripeFee = (
  amount: number,
  percentage = 0.13,
  fixedFee = 0.3
) => {
  const fee = amount * percentage + fixedFee;
  return fee;
};
