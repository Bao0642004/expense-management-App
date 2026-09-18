import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useNavigation,
} from "@react-navigation/native";

import React    from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import {
  Category,
  useCategory,
} from "../components/CategoryContext";
import styles   from "../styles/Styles_category"; 

// DANH SÁCH CATEGORY
export const CATEGORIES: Category[] = [

  {
    name: "Ăn uống",
    icon: "🍔",
    color: "#FFD700",
  },

  {
    name: "Hóa đơn / Tiện ích",
    icon: "💡",
    color: "#FFA07A",
  },

  {
    name: "Gia đình",
    icon: "👨‍👩‍👧",
    color: "#90EE90",
  },

  {
    name: "Sức khỏe",
    icon: "🏥",
    color: "#FF7F7F",
  },

  {
    name: "Xăng xe",
    icon: "⛽",
    color: "#FF8C00",
  },

  {
    name: "Điện thoại / Internet",
    icon: "📱",
    color: "#87CEEB",
  },

  {
    name: "Giáo dục",
    icon: "📚",
    color: "#9370DB",
  },

  {
    name: "Giải trí",
    icon: "🎬",
    color: "#E6E6FA",
  },

  {
    name: "Mua sắm",
    icon: "🛍️",
    color: "#FF69B4",
  },

  {
    name: "Du lịch",
    icon: "✈️",
    color: "#00CED1",
  },

  {
    name: "Giao lưu / Tiệc tùng",
    icon: "🥂",
    color: "#CD853F",
  },

  {
    name: "Rút tiền",
    icon: "🏧",
    color: "#D3D3D3",
  },

  {
    name: "Chuyển khoản",
    icon: "💸",
    color: "#32CD32",
  },

  {
    name: "Di chuyển",
    icon: "🚗",
    color: "#FFA500",
  },

  {
    name: "Nhà ở",
    icon: "🏠",
    color: "#ADD8E6",
  },

  {
    name: "Khác",
    icon: "📦",
    color: "#808080",
  },

];

const CategoryScreen = () => {
  const navigation = useNavigation<any>();
  const {setSelectedCategory, } = useCategory();

  const handleSelectCategory = (category: Category) => {
    console.log("Đã chọn:", category );

    setSelectedCategory(
      category
    );
    navigation.goBack();
  };

  const renderCategory = ({
    item,
  }: {
    item: Category;
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          {
            backgroundColor:
              item.color + "30",
          },
        ]}
        onPress={() =>
          handleSelectCategory(
            item
          )
        }
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                item.color,
            },
          ]}
        >
          <Text
            style={styles.icon}
          >
            {item.icon}
          </Text>
        </View>
        <Text
          style={styles.categoryName}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.close}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Ionicons
          name="close"
          size={36}
          color="black"
        />
      </TouchableOpacity>

      <Text
        style={styles.greeting}
      >
        Chọn danh mục
      </Text>
      <Text
        style={styles.subtitle}
      >
        Hãy chọn danh mục phù hợp nhất với
        khoản tiền bạn đã chi tiêu
      </Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) =>
          item.name
        }

        renderItem={
          renderCategory
        }
        numColumns={2}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
      />
    </View>
  );
};

export default CategoryScreen;