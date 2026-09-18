
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  time: string;
  icon: string;
  categoryColor: string;
  categoryTextColor: string;
}

export const expenseData: Expense[] = [
  {
    id: "1",
    title: "Mua đồ ăn",
    amount: 250000,
    category: "Ăn uống",
    date: "08/09/2026",
    time: "08:30",
    icon: "🍔",
    categoryColor: "#FFD700",
    categoryTextColor: "#333333",
  },
  {
    id: "2",
    title: "Đi Uber đến sân bay",
    amount: 200000,
    category: "Di chuyển",
    date: "08/09/2026",
    time: "10:15",
    icon: "🚗",
    categoryColor: "#FFA500",
    categoryTextColor: "#333333",
  },
  {
    id: "3",
    title: "Đăng ký Netflix",
    amount: 700000,
    category: "Giải trí",
    date: "08/09/2026",
    time: "11:30",
    icon: "🎬",
    categoryColor: "#E6E6FA",
    categoryTextColor: "#333333",
  },
  {
    id: "4",
    title: "Cà phê",
    amount: 40000,
    category: "Ăn uống",
    date: "08/09/2026",
    time: "13:20",
    icon: "☕",
    categoryColor: "#FFD700",
    categoryTextColor: "#333333",
  },
  {
    id: "5",
    title: "Mua sơn nhà",
    amount: 300000,
    category: "Nhà ở",
    date: "08/09/2026",
    time: "14:00",
    icon: "🏠",
    categoryColor: "#ADD8E6",
    categoryTextColor: "#333333",
  },
];
