import { useAddTransaction } from "../../hooks/useAddTransactions";
import { useState } from "react";
import { useGetTransaction } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "@firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expenses } = transactionTotals;
  const onSubmit = (e) => {
    console.log("ye");
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>income</h4>
              <p>{income}</p>
            </div>
            <div className="expenese">
              <h4>expeneses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text "
              placeholder="description "
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number "
              placeholder="Amount "
              value={transactionAmount}
              required
              onChange={(e) => {
                setTransactionAmount(e.target.value);
              }}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label>Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label>Income</label>
            <button type="submit">Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              signOut
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={index}>
                <h4>{description}</h4>
                <p>
                  {""}${transactionAmount}•
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
