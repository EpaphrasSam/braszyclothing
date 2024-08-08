declare global {
  interface Window {
    promotekit_referral: string;
    promotekit: {
      refer: (email: string, stripeCustomerId?: string) => void;
    };
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null) => void;
    };
    tp?: (action: string, data: any) => void;
  }
}

export {};
