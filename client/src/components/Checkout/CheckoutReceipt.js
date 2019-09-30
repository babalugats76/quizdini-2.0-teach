import React from "react";

const CheckoutReceipt = (props) => {
  const formatMoney = (amount, currency) => {
    return currency === "usd" && `$${amount / 100} ${currency.toUpperCase()}`;
  };

  const { description, amount, currency, receipt_url } = props;

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>{description}</p>
      <p>{formatMoney(amount, currency)}</p>
      <p>
        <a href={receipt_url} rel="noopener noreferrer" target="_blank">
          View Your Receipt
        </a>
      </p>
    </div>
  );
};

export default CheckoutReceipt;
