import {
  useNavigation,
} from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  useCategory,
} from "../components/CategoryContext";
import Item      from "../components/Item_home";
import {
  auth,
  db,
} from "../firebase/firebaseConfig";
import styles    from "../styles/style_home";
import Addbutton from "../components/add-button/Add-button";

type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  category: undefined;
};

type HomeNavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "Home"
  >;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const {    expenses,loadingExpenses,} = useCategory();
  const [name, setName] = useState<string>("");
  const [loadingName, setLoadingName] = useState<boolean>(true);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setName("");
          setLoadingName(false);
          return;
        }
        const userRef =
          doc(
            db,
            "users",
            user.uid
          );
        const snapshot =   await getDoc(userRef);
        if (snapshot.exists()) {
          const data =   snapshot.data();
          if (
            typeof data.name === "string" &&
            data.name.trim() !== ""
          ) {
            setName(
              data.name.trim()
            );
          } else {
            setName(
              user.displayName ||
              "bạn"
            );
          }
        } else {
          console.log(
            "HOME - KHÔNG CÓ USER DOCUMENT"
          );

          setName(
            user.displayName ||
            "bạn"
          );
        }
      } catch (error) {
        console.log(
          "HOME - LOAD NAME ERROR:",
          error
        );
        setName("bạn");

      } finally {
        setLoadingName(false);
      }
    };

    loadUserName();

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (!user) {
            setName("");
            return;
          }
          try {
            const userRef =
              doc(
                db,
                "users",
                user.uid
              );
            const snapshot =
              await getDoc(userRef);

            if (snapshot.exists()) {
              const data =
                snapshot.data();

              if (
                typeof data.name === "string" &&
                data.name.trim() !== ""
              ) {

                setName(
                  data.name.trim()
                );

              } else {

                setName(
                  user.displayName ||
                  "bạn"
                );
              }
            } else {
              setName(
                user.displayName ||
                "bạn"
              );
            }
          } catch (error) {
            console.log(
              "AUTH STATE NAME ERROR:",
              error
            );
          }
        }
      );
    return () => {
      unsubscribe();

    };
  }, []);

  const totalSpent =
    expenses.reduce(
      (
        total,
        item
      ) => {

        return (
          total +
          Number(item.amount)
        );
      },
      0
    );

  const formatVND = (
    amount: number
  ): string => {

    return `${amount.toLocaleString(
      "vi-VN"
    )} ₫`;
  };

  const onOpenadd = () => {

    navigation.navigate(
      "Add"
    );
  };


  if (
    loadingExpenses ||
    loadingName
  ) {

    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F8FA"
        />

        <View
          style={
            styles.loadingContainer
          }
        >

          <ActivityIndicator
            size="large"
            color="#000000"
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Đang tải dữ liệu...
          </Text>

        </View>

      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
      />
      <View
        style={styles.header}
      >

        <Text
          style={styles.greeting}
        >
          Xin chào, {name || "bạn"} 👋
        </Text>

        <Text
          style={styles.subtitle}
        >
          Theo dõi chi tiêu của bạn dễ dàng.
        </Text>

      </View>

      <View
        style={styles.totalCard}
      >

        <Text
          style={styles.totalTitle}
        >
          Đã chi tiêu
        </Text>

        <Text
          style={styles.totalAmount}
        >
          {formatVND(totalSpent)}
        </Text>

      </View>

      <FlatList
        data={expenses}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (

          <Item
            item={item}
          />

        )}

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          expenses.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }

        ListEmptyComponent={
          <View
            style={styles.empty}
          >

            <Text
              style={styles.emptyIcon}
            >
              💰
            </Text>

            <Text
              style={styles.emptyText}
            >
              Chưa có khoản chi nào
            </Text>

            <Text
              style={styles.emptySubText}
            >
              Nhấn nút + để thêm khoản chi
            </Text>

          </View>

        }
      />

      <Addbutton
        onOpenadd={
          onOpenadd
        }
      />

    </SafeAreaView>
  );
};

export default Home;