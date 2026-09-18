import React, { useMemo, useState } from "react";

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from "react-native";

import { PieChart }                 from "react-native-gifted-charts";

import { useCategory }              from "../components/CategoryContext";
import styles                       from "../styles/styles_insights";

const Insights = () => {
  const { expenses } = useCategory();

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  // FORMAT TIỀN VND
  const formatMoney = (amount: number): string => {
    return amount.toLocaleString("vi-VN") + " ₫";
  };

  // TỔNG CHI TIÊU
  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
  }, [expenses]);

  // GOM THEO DANH MỤC
  const categoryExpenses = useMemo(() => {
    const categories: {
      [key: string]: {
        name: string;
        amount: number;
        color: string;
        icon: string;
      };
    } = {};

    expenses.forEach((expense) => {
      const categoryName = expense.category;

      if (!categories[categoryName]) {
        categories[categoryName] = {
          name: categoryName,
          amount: 0,
          color: expense.categoryColor || "#4CAF50",
          icon: expense.icon || "💰",
        };
      }

      categories[categoryName].amount += Number(expense.amount);
    });

    return Object.values(categories);
  }, [expenses]);

  // DATA CHO PIE CHART
  const pieData = useMemo(() => {
    return categoryExpenses.map((category) => ({
      value: category.amount,
      text: category.name,
      color: category.color,

      // Khi bấm vào phần biểu đồ
      onPress: () => {
        setSelectedCategory(category.name);
      },

      // Phần được chọn sẽ nổi bật
      focused: selectedCategory === category.name,
    }));
  }, [categoryExpenses, selectedCategory]);

  // DANH MỤC ĐANG CHỌN
  const selectedData = categoryExpenses.find(
    (category) => category.name === selectedCategory
  );
  
  // PHẦN TRĂM
  const getPercentage = (amount: number): string => {
    if (totalExpense === 0) {
      return "0%";
    }

    return ((amount / totalExpense) * 100).toFixed(1) + "%";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TIÊU ĐỀ */}
        <Text style={styles.title}>
                  Tổng kết chi tiêu   
               </Text>

        {/* BIỂU ĐỒ */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            Chi tiêu theo danh mục
          </Text>

          {expenses.length === 0 ? (
           <View style={styles.chartContainer}>
            <PieChart
              data={[
                {
                  value: 1,
                  color: "#E5E7EB",
                },
              ]}
              donut
              radius={110}
              innerRadius={65}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerTitle}>
                    Tổng
                  </Text>

                  <Text style={styles.centerAmount}>
                    0 ₫
                  </Text>
                </View>
              )}
            />
          </View>
          ) : (
            <>
              <View style={styles.chartContainer}>
                <PieChart
                  data={pieData}
                  donut
                  radius={110}
                  innerRadius={65}
                  focusOnPress
                  centerLabelComponent={() => (
                    <View style={styles.centerLabel}>
                      {selectedData ? (
                        <>
                          <Text style={styles.selectedIcon}>
                            {selectedData.icon}
                          </Text>

                          <Text style={styles.selectedName}>
                            {selectedData.name}
                          </Text>

                          <Text style={styles.selectedAmount}>
                            {formatMoney(selectedData.amount)}
                          </Text>

                          <Text style={styles.selectedPercent}>
                            {getPercentage(selectedData.amount)}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.centerTitle}>
                            Tổng
                          </Text>

                          <Text style={styles.centerAmount}>
                            {formatMoney(totalExpense)}
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                />
              </View>

              {/* CHỈ HIỆN CHI TIẾT KHI BẤM */}
              {selectedData && (
                <View style={styles.detailBox}>
                  <Text style={styles.detailTitle}>
                    {selectedData.icon} {selectedData.name}
                  </Text>

                  <Text style={styles.detailAmount}>
                    {formatMoney(selectedData.amount)}
                  </Text>

                  <Text style={styles.detailPercent}>
                    Chiếm {getPercentage(selectedData.amount)} tổng chi tiêu
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;