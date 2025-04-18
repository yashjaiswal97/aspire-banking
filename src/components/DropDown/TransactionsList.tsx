import React, { useEffect, useState } from "react";
import {
  getMockTransactions,
  Transaction,
} from "../../services/dropDownservice";
import TransactionItem from "./TransactionItem";

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getMockTransactions().then(setTransactions);
  }, []);

  return (
    <div>
      {transactions.map((tx, idx) => (
        <TransactionItem key={idx} {...tx} />
      ))}
      <div className="view-all">View all card transactions</div>
    </div>
  );
};

export default TransactionsList;
