import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionsTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const getTransactions = async () => {
    let unsubscirbe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAT")
      );
      unsubscirbe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionsTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubscirbe();
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionTotals };
};
