import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useCategory,
} from "../components/CategoryContext";
import styles   from "../styles/style_create";


interface ExpenseFromRoute {
  id: string;
  title: string;
  amount: number;
  category: string;
  icon: string;
  categoryColor: string;
  categoryTextColor: string;
  date?: string;
  time?: string;
}

interface EditRouteParams {
  expense: ExpenseFromRoute;
} 
const Edit: React.FC = () => {
  const navigation =   useNavigation<any>();
  const route =   useRoute();
  const params = route.params as EditRouteParams;
  const expense = params?.expense;
  const {
    selectedCategory,
    setSelectedCategory,
    clearCategory,
    editExpense,
  } = useCategory();

  const [
    title,
    setTitle,
  ] = useState<string>("");

  const [
    amount,
    setAmount,
  ] = useState<string>("");

  const [
    saving,
    setSaving,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (!expense) {
      return;
    }

    setTitle(
      expense.title || ""
    );
    setAmount(
      Number(
        expense.amount || 0
      ).toLocaleString("vi-VN")
    );
    setSelectedCategory({
     name:  expense.category || "",
      icon: expense.icon || "💰",
      color: expense.categoryColor || "#EEEEEE",
    });
  }, [expense]);

  const handleAmountChange = (
    text: string
  ) => {
    const numberOnly =
      text.replace(
        /\D/g,
        ""
      );

    if (!numberOnly) {
      setAmount("");
      return;
    }

    const formatted =
      Number(
        numberOnly
      ).toLocaleString(
        "vi-VN"
      );
    setAmount(
      formatted
    );
  };

  const handleSelectCategory =
    () => {
      navigation.navigate(
        "category",
        {
          from: "Edit",
        }
      );
    };

  const handleEditExpense =
    async () => {
      if (saving) {
        return;
      }

      if (!expense?.id) {
        Alert.alert(
          "Lỗi",
          "Không tìm thấy khoản chi cần sửa."
        );
        return;
      }

      if (!title.trim()) {
        Alert.alert(
          "Thông báo",
          "Vui lòng nhập tên khoản chi."
        );
        return;
      }
      if (!amount.trim()) {
        Alert.alert(
          "Thông báo",
          "Vui lòng nhập số tiền."
        );
        return;
      }

      if (!selectedCategory) {
        Alert.alert(
          "Thông báo",
          "Vui lòng chọn danh mục."
        );
        return;
      }

      const numericAmount =
        Number(
          amount
            .replace(
              /\./g,
              ""
            )
            .replace(
              /,/g,
              ""
            )
            .replace(
              /\s/g,
              ""
            )
        );
      if (
        !Number.isFinite(
          numericAmount
        ) ||
        numericAmount <= 0
      ) {
        Alert.alert(
          "Thông báo",
          "Số tiền không hợp lệ."
        );
        return;
      }

      try {
        setSaving(true);
        await editExpense(
          expense.id,
          title.trim(),
          numericAmount,
          selectedCategory
        );
        clearCategory();
        // Thông báo
        Alert.alert(
          "Thong báo",
          "Đã cập nhật khoản chi.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate(
                  "BottomTab"
                );
              },
            },
          ]
        );

      } catch (error) {
        Alert.alert(
          "Lỗi",
          "Không thể cập nhật khoản chi. Vui lòng kiểm tra Firebase."
        );

      } finally {
        setSaving(false);
      }
    };

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <View
        style={
          styles.content
        }
      >
        <View
          style={
            styles.headerContainer
          }
        >
          <TouchableOpacity
            onPress={() => {
              clearCategory();
              navigation.goBack();
            }}
            style={
              styles.backButton
            }
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="#000000"
            />
          </TouchableOpacity>
          <Text
            style={
              styles.header
            }
          >
            Chỉnh sửa khoản chi
          </Text>
        </View>
        <Text
          style={
            styles.label
          }
        >
          Số tiền
        </Text>

        <View
          style={
            styles.amountContainer
          }
        >
          <TextInput
            value={
              amount
            }
            onChangeText={
              handleAmountChange
            }
            placeholder="100.000"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            style={
              styles.amountInput
            }
          />
          <Text
            style={
              styles.currency
            }
          >
            ₫
          </Text>
        </View>
        <Text
          style={
            styles.label
          }
        >
          Tên khoản chi
        </Text>

        <TextInput
          value={
            title
          }
          onChangeText={
            setTitle
          }
          placeholder="Ví dụ: Ăn sáng"
          placeholderTextColor="#999999"
          style={
            styles.input
          }
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect={true}
          editable={true}
          multiline={false}
          returnKeyType="done"
        />
        <Text
          style={
            styles.label
          }
        >
          Phân loại
        </Text>

        <TouchableOpacity
          onPress={
            handleSelectCategory
          }
          style={[
            styles.categoryButton,
            selectedCategory
              ? {
                  backgroundColor:
                    selectedCategory.color,
                }
              : null,
          ]}
        >
          <Text
            style={
              styles.categoryIcon
            }
          >
            {selectedCategory
              ? selectedCategory.icon
              : "📂"}
          </Text>
          <Text
            style={
              styles.categoryName
            }
          >
            {selectedCategory
              ? selectedCategory.name
              : "Chọn phân loại"}

          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#555555"
            style={
              styles.categoryArrow
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            handleEditExpense
          }
          disabled={
            saving
          }
          style={[
            styles.addButton,
            saving
              ? styles.addButtonDisabled
              : null,
          ]}
        >
          <Text
            style={
              styles.addButtonText
            }
          >
            {saving
              ? "Đang lưu..."
              : "Lưu thay đổi"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Edit;