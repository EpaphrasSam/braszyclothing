type BillingDetails = {
  cardNumber: string;
  country: string;
  expiryDate: string;
  code?: string;
  cvc: string;
};

type EncryptedData = {
  iv: string;
  encryptedData: string;
};
