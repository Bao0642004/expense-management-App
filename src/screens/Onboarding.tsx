import { useNavigation }   from "@react-navigation/native";

import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Onboarding123() {
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(1);
  const data = [
    {
      image: require("../../assets/onboarding1.jpg"),
      title: "Quản lý chi tiêu dễ dàng",
      description:
        "Theo dõi các khoản chi tiêu hàng ngày và quản lý tài chính cá nhân hiệu quả.",
    },
    {
      image: require("../../assets/onboarding2.jpg"),
      title: "Theo dõi khoản chi",
      description:
        "Phân loại các khoản chi tiêu để biết tiền của bạn đang được sử dụng như thế nào.",
    },
    {
      image: require("../../assets/onboarding3.jpg"),
      title: "Bắt đầu quản lý tài chính",
      description:
        "Kiểm soát chi tiêu và xây dựng thói quen tài chính tốt hơn mỗi ngày.",
    },
  ];

  const current = data[page - 1];
  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      navigation.replace("login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={current.image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        {current.title}
      </Text>
      <Text style={styles.description}>
        {current.description}
      </Text>
      <View style={styles.dots}>
        <View
          style={[
            styles.dot,
            page === 1 && styles.activeDot,
          ]}
        />
        <View
          style={[
            styles.dot,
            page === 2 && styles.activeDot,
          ]}
        />
        <View
          style={[
            styles.dot,
            page === 3 && styles.activeDot,
          ]}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {page === 3 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  image: {
    width: 280,
    height: 280,

    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",

    textAlign: "center",

    marginBottom: 15,
  },

  description: {
    fontSize: 16,

    color: "#777777",

    textAlign: "center",

    lineHeight: 24,
  },

  dots: {
    flexDirection: "row",

    marginTop: 35,
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#D0D0D0",

    marginHorizontal: 5,
  },

  activeDot: {
    width: 25,

    backgroundColor: "#000000",
  },


  button: {
    width: "100%",

    height: 55,

    backgroundColor: "#000000",

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "600",
  },
});