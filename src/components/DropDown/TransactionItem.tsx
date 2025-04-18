import React from "react";
import "./TransactionItem.css";
import smallCard from "../../assets/business-and-finance-1.png";

export interface TransactionProps {
  name: string;
  date: string;
  amount: string;
  status: "credit" | "debit";
  icon: string;
  label: string;
  iconBg: string;
}

const TransactionItem: React.FC<TransactionProps> = ({
  name,
  date,
  amount,
  status,
  icon,
  label,
  iconBg,
}) => {
  return (
    <div className="transaction-item">
      <div className="icon-circle" style={{ backgroundColor: iconBg }}>
        <img src={icon} alt="icon" />
      </div>
      <div className="transaction-info">
        <strong>{name}</strong>
        <p>{date}</p>
        <div className="transaction-staus">
          <div className="small-card-icon">
            <img src={smallCard} />
          </div>
          <span className="tag"> {label}</span>
        </div>
      </div>
      <div className={`amount ${status}`}>
        {status === "credit" ? "+" : "-"} S$ {amount}
      </div>
    </div>
  );
};

export default TransactionItem;
