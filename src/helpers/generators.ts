export function generateOrderID(length: number) {
  const characters = "0123456789";
  const orderIdLength = length || 8;
  let orderId = "";

  for (let i = 0; i < orderIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderId += characters[randomIndex];
  }

  return orderId;
}
