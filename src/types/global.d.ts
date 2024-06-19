declare global {
  interface Window {
    promotekit_referral: string;
    promotekit: {
      refer: (email: string, stripeCustomerId?: string) => void;
    };
  }
}

export {};
