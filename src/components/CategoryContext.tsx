import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import type {
  Expense,
} from "../data/data";
import {
  auth,
  db,
} from "../firebase/firebaseConfig";


export interface Category {
  name: string;
  icon: string;
  color: string;
}


interface CategoryContextType {

  selectedCategory: Category | null;

  setSelectedCategory: (
    category: Category
  ) => void;

  clearCategory: () => void;

  expenses: Expense[];

  addExpense: (
    title: string,
    amount: number,
    category: Category
  ) => Promise<void>;

  editExpense: (
    id: string,
    title: string,
    amount: number,
    category: Category
  ) => Promise<void>;

  removeExpense: (
    id: string
  ) => Promise<void>;

  loadingExpenses: boolean;
}


const CategoryContext =
  createContext<CategoryContextType | undefined>(
    undefined
  );


interface CategoryProviderProps {
  children: ReactNode;
}


export const CategoryProvider: React.FC<
  CategoryProviderProps
> = ({ children }) => {


  const [
    selectedCategory,
    setSelectedCategoryState,
  ] = useState<Category | null>(null);


  const [
    expenses,
    setExpenses,
  ] = useState<Expense[]>([]);


  const [
    loadingExpenses,
    setLoadingExpenses,
  ] = useState<boolean>(true);


  const setSelectedCategory = (
    category: Category
  ) => {

    setSelectedCategoryState(
      category
    );

  };


  const clearCategory = () => {

    setSelectedCategoryState(
      null
    );

  };

  const loadExpenses = async (
    uid: string
  ) => {

    try {

      setLoadingExpenses(true);

      const expensesRef =
        collection(
          db,
          "users",
          uid,
          "expenses"
        );

      const expensesQuery =
        query(
          expensesRef,
          orderBy(
            "createdAt",
            "desc"
          )
        );

      const snapshot =
        await getDocs(
          expensesQuery
        );

      const loadedExpenses: Expense[] =
        snapshot.docs.map(
          (expenseDoc) => {

            const data =
              expenseDoc.data();

            return {

              id:
                expenseDoc.id,

              title:
                typeof data.title === "string"
                  ? data.title
                  : "",

              amount:
                typeof data.amount === "number"
                  ? data.amount
                  : 0,

              category:
                typeof data.category === "string"
                  ? data.category
                  : "",

              date:
                typeof data.date === "string"
                  ? data.date
                  : "",

              time:
                typeof data.time === "string"
                  ? data.time
                  : "",

              icon:
                typeof data.icon === "string"
                  ? data.icon
                  : "💰",

              categoryColor:
                typeof data.categoryColor === "string"
                  ? data.categoryColor
                  : "#EEEEEE",

              categoryTextColor:
                typeof data.categoryTextColor === "string"
                  ? data.categoryTextColor
                  : "#333333",
            };

          }
        );

      setExpenses(
        loadedExpenses
      );

    } catch (error) {

      console.log(
        "LOAD EXPENSES ERROR:",
        error
      );

      setExpenses([]);

    } finally {

      setLoadingExpenses(false);

    }

  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            setExpenses([]);

            setLoadingExpenses(
              false
            );

            return;

          }

          await loadExpenses(
            user.uid
          );

        }
      );

    return unsubscribe;

  }, []);


  const addExpense = async (
    title: string,
    amount: number,
    category: Category
  ): Promise<void> => {

    const user =
      auth.currentUser;

    if (!user) {

      throw new Error(
        "Bạn chưa đăng nhập"
      );

    }

    try {
     const now =
        new Date();

      const date =
        now.toLocaleDateString(
          "vi-VN"
        );

      const time =
        now.toLocaleTimeString(
          "vi-VN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      const newExpenseData = {

        title:
          title.trim(),

        amount:
          Number(amount),

        category:
          category.name,

        icon:
          category.icon,

        categoryColor:
          category.color,

        categoryTextColor:
          "#333333",

        date: date,
        time:time,
        createdAt:Date.now(),
        uid:user.uid,
      };

      const expensesRef =
        collection(
          db,
          "users",
          user.uid,
          "expenses"
        );

      const docRef =
        await addDoc(
          expensesRef,
          newExpenseData
        );

      const newExpense: Expense = {
        id: docRef.id,
        title:  newExpenseData.title,
        amount:newExpenseData.amount,
        category: newExpenseData.category,
        icon: newExpenseData.icon,
        categoryColor:  newExpenseData.categoryColor,
        categoryTextColor:  newExpenseData.categoryTextColor,
        date: newExpenseData.date,
        time:  newExpenseData.time,
      };

      setExpenses(
        (prev) => [
          newExpense,
          ...prev,
        ]
      );

    } catch (error) {
      console.log(
        "ADD EXPENSE ERROR:",
        error
      );
      throw error;
    }
  };

  const editExpense = async (
    id: string,
    title: string,
    amount: number,
    category: Category
  ): Promise<void> => {

    const user =
      auth.currentUser;

    if (!user) {

      throw new Error(
        "Bạn chưa đăng nhập"
      );

    }

    if (!id) {
      throw new Error(
        "Không tìm thấy ID khoản chi"
      );
    }

    try {

      const expenseRef =
        doc(
          db,
          "users",
          user.uid,
          "expenses",
          id
        );

      await updateDoc(
        expenseRef,
        {
          title:  title.trim(),
          amount: Number(amount),
          category:  category.name,
          icon:  category.icon,
          categoryColor:  category.color,
          categoryTextColor:   "#333333",
        }
      );

      setExpenses(
        (prev) =>
          prev.map(
            (expense) => {
              if (
                expense.id !== id
              ) {
                return expense;
              }

              return {
                ...expense,
                title: title.trim(),
                amount:  Number(amount),
                category: category.name,
                icon: category.icon,
                categoryColor: category.color,
                categoryTextColor:  "#333333",
              };
            }
          )
      );

      console.log(
        "ĐÃ CẬP NHẬT EXPENSE:",
        id
      );
    } catch (error) {
      console.log(
        "EDIT EXPENSE ERROR:",
        error
      );
      throw error;
    }
  };

  const removeExpense = async (
    id: string
  ): Promise<void> => {
    const user =  auth.currentUser;

    if (!user) {

      throw new Error(
        "Bạn chưa đăng nhập"
      );
    }

    try {
      const expenseRef =
        doc(
          db,
          "users",
          user.uid,
          "expenses",
          id
        );

      await deleteDoc(
        expenseRef
      );
      setExpenses(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );
      console.log(
        "ĐÃ XÓA EXPENSE:",
        id
      );
    } catch (error) {
      console.log(
        "DELETE EXPENSE ERROR:",
        error
      );
      throw error;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        clearCategory,
        expenses,
        addExpense,
        editExpense,
        removeExpense,
        loadingExpenses,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {

  const context =
    useContext(
      CategoryContext
    );

  if (!context) {

    throw new Error(
      "useCategory phải được sử dụng bên trong CategoryProvider"
    );

  }

  return context;

};
