import AntDesign from "@expo/vector-icons/AntDesign";

import {
  useNavigation,
} from "@react-navigation/native";

import React     from "react";

import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Swipeable,
} from "react-native-gesture-handler";

import type {
  Expense,
} from "../data/data";
import styles    from "../styles/Styles_item";

import {
  useCategory,
} from "./CategoryContext";


interface ItemProps {
  item: Expense;
}


const formatVND = (
  amount: number
): string => {

  return `${amount.toLocaleString(
    "vi-VN"
  )} ₫`;

};


const Item: React.FC<ItemProps> = ({
  item,
}) => {

  const {
    removeExpense,
  } = useCategory();

  const navigation =
    useNavigation<any>();


  const handleEdit = () => {

    navigation.navigate(
      "Edit",
      {
        expense: item,
      }
    );

  };

  const handleDelete = () => {

    Alert.alert(
      "Thông báo",
      `Bạn có chắc muốn xóa "${item.title}" không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },

        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await removeExpense(
                item.id
              );

              Alert.alert(
                "Thông báo",
                "Đã xóa khoản chi."
              );
            } catch (error) {
              console.log(
                "DELETE EXPENSE ERROR:",
                error
              );
              Alert.alert(
                "Lỗi",
                "Không thể xóa khoản chi."
              );
            }
          },
        },
      ]
    );
  };


  const renderRightActions = () => {

    return (

      <View
        style={
          styles.deleteContainer
        }
      >
        <TouchableOpacity
          style={
            styles.deleteButtonEdit
          }
          activeOpacity={0.7}
          onPress={
            handleEdit
          }
        >
          <AntDesign
            name="edit"
            size={24}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.deleteText
            }
          >
            Chỉnh sửa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.deleteButton
          }
          activeOpacity={0.7}
          onPress={
            handleDelete
          }
        >

          <AntDesign
            name="delete"
            size={24}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.deleteText
            }
          >
            Xóa
          </Text>

        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={
        renderRightActions
      }
      overshootRight={
        false
      }
      rightThreshold={
        40
      }
      friction={
        2
      }
    >
      <View
        style={
          styles.container
        }
      >
        <View
          style={
            styles.iconContainer
          }
        >

          <Text
            style={
              styles.icon
            }
          >
            {item.icon}
          </Text>

        </View>
        <View
          style={
            styles.content
          }
        >
          <View
            style={
              styles.topRow
            }
          >
            <Text
              style={
                styles.title
              }
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text
              style={
                styles.amount
              }
            >
              {formatVND(
                item.amount
              )}
            </Text>
          </View>
          <View
            style={
              styles.bottomRow
            }
          >
            <View
              style={[
                styles.category,
                {
                  backgroundColor:
                    item.categoryColor ||
                    "#EEEEEE",
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,     {
                    color:
                      item.categoryTextColor ||
                      "#333333",
                  },
                ]}
              >
                {item.category}
              </Text>
            </View>

            <View
              style={
                styles.dateTime
              }
            >

              <Text
                style={
                  styles.date
                }
              >
                {item.date}
              </Text>

              <Text
                style={
                  styles.time
                }
              >
                {item.time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default Item;