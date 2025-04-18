export type Card = {
    id: string;
    name: string;
    last4?: string;
    expiry: string;
    frozen?: boolean;
  };
  
  export const getCards = (): Promise<Card[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const localCards = JSON.parse(localStorage.getItem("localCards") || "[]");
        resolve([
          {
            id: "api-1",
            name: "Mark Henry",
            last4: "2635736387871234",
            expiry: "12/20",
            frozen: false,
          },
          {
            id: "api-2",
            name: "John Smith",
            last4: "5678698727462908",
            expiry: "05/26",
            frozen: false,
          },
          {
            id: "api-3",
            name: "Alex Morgan",
            last4: "9045632980097712",
            expiry: "08/27",
            frozen: false,
          },
          ...localCards,
        ]);
      }, 500);
    });
  };
  