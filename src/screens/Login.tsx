import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useNavigation,
} from "@react-navigation/native";

import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  loginUser,
} from "../services/authService";
import styles   from "../styles/style_login";

const Login = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email.trim()) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập email"
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập mật khẩu"
      );
      return;
    }

    try {
      setLoading(true);
      await loginUser(
        email.trim(),
        password
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "BottomTab",
            params: {
              successMessage:
                "Đăng nhập thành công!",
            },
          },
        ],
      });
    } catch (error: any) {
      let message = "Đăng nhập thất bại";
      if (
        error.code === "auth/invalid-credential"
      ) {
        message =  "Email hoặc mật khẩu không đúng";

      } else if (
        error.code === "auth/user-not-found"
      ) {
        message =  "Tài khoản không tồn tại";
      } else if (
        error.code ===  "auth/wrong-password"
      ) {
        message =  "Mật khẩu không đúng";

      } else if (
        error.code ==="auth/invalid-email"
      ) {
        message = "Email không hợp lệ";
      } else if (
        error.code === "auth/network-request-failed"
      ) {
        message = "Không có kết nối mạng";
      }
      Alert.alert(
        "Thông báo",
        message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={styles.container}
    >

      <Text
        style={styles.title}
      >
        Đăng Nhập
      </Text>

      <View
        style={styles.inputGroup}
      >
        <Text
          style={styles.label}
        >
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={
            setEmail
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

      </View>

      <View
        style={styles.inputGroup}
      >
        <Text
          style={styles.label}
        >
          Mật khẩu
        </Text>
        <View
          style={
            styles.passwordContainer
          }
        >
          <TextInput
            style={
              styles.passwordInput
            }
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            value={password}
            onChangeText={
              setPassword
            }
            secureTextEntry={
              !showPassword
            }
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={
              styles.eyeButton
            }
            onPress={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-outline"
                  : "eye-off-outline"
              }
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity

        style={[
          styles.button,

          loading &&
            styles.buttonDisabled,
        ]}

        onPress={
          handleLogin
        }
        disabled={loading}
      >
        <Text
          style={
            styles.buttonText
          }
        >
          {loading
            ? "Đang đăng nhập..."
            : "Đăng nhập"}
        </Text>
      </TouchableOpacity>
      <View
        style={
          styles.registerContainer
        }
      >
        <Text
          style={
            styles.registerText
          }
        >
          Chưa có tài khoản?
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "register"
            )
          }
        >
          <Text
            style={
              styles.registerButton
            }
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;