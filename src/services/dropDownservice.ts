import BoxIcon from "../assets/icons/file-storage.png";
import MegaPhone from "../assets/icons/megaphone.png";
import Plane from "../assets/icons/plane.png";

export interface Transaction {
  name: string;
  date: string;
  amount: string;
  status: "credit" | "debit";
  icon: string;
  label: string;
  iconBg: string;
}

export const getMockTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Hamleys",
          date: "20 May 2020",
          amount: "150",
          status: "credit",
          icon: BoxIcon,
          label: "Refund on debit card",
          iconBg: "#E0F3FF",
        },
        {
          name: "Hamleys",
          date: "20 May 2020",
          amount: "150",
          status: "debit",
          icon: Plane,
          label: "Charged to debit card",
          iconBg: "#E8FDF5",
        },
        {
          name: "Hamleys",
          date: "20 May 2020",
          amount: "150",
          status: "debit",
          icon: MegaPhone,
          label: "Charged to debit card",
          iconBg: "#FFE6F0",
        },
        {
          name: "Hamleys",
          date: "20 May 2020",
          amount: "150",
          status: "debit",
          icon: BoxIcon,
          label: "Charged to debit card",
          iconBg: "#E0F3FF",
        },
      ]);
    }, 500);
  });
};
