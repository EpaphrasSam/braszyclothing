export const calculateStripeFee = (
  amount: number,
  percentage = 0.029,
  fixedFee = 0.3
) => {
  const fee = amount * percentage + fixedFee;
  return fee;
};
