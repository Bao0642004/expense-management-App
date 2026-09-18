import Ionicons          from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

import { useState }      from "react";

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut }       from "firebase/auth";

import { auth }          from "../firebase/firebaseConfig";
import { registerUser }  from "../services/authService";
import styles            from "../styles/style_Reistes";

const Register = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập tên người dùng"
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập email"
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập mật khẩu"
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Thông báo",
        "Mật khẩu phải có ít nhất 6 ký tự"
      );
      return;
    }

    try {
      setLoading(true);
      const user = await registerUser(
        name.trim(),
        email.trim(),
        password
      );

      await signOut(auth);

      console.log(
        "ĐÃ ĐĂNG XUẤT USER SAU KHI ĐĂNG KÝ"
      );


      Alert.alert(
         `Thông báo`,
        "Đăng ký thành công ",
       
        [
          {
            text: "Đồng ý",
            onPress: () => {

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "login",
                  },
                ],
              });
            },
          },
        ],
        {
          cancelable: false,
        }
      );

    } catch (error: any) {
        let message = "Đăng ký thất bại.";
      if (
        error?.code ===
        "auth/email-already-in-use"
      ) {
        message =
          "Email này đã được sử dụng.\n\nVui lòng dùng email khác hoặc đăng nhập.";
      }
      else if (
        error?.code ===
        "auth/invalid-email"
      ) {
        message =
          "Email không hợp lệ.";
      }

      else if (
        error?.code ===
        "auth/weak-password"
      ) {
        message =
          "Mật khẩu quá yếu.\n\nMật khẩu phải có ít nhất 6 ký tự.";
      }

      else if (
        error?.code ===
        "permission-denied"
      ) {
        message =
          "Tài khoản Authentication đã được tạo nhưng Firestore không cho phép lưu thông tin người dùng.\n\nHãy kiểm tra Firestore Rules.";
      }

      else if (
        error?.code ===
        "auth/network-request-failed"
      ) {
        message =
          "Không thể kết nối Firebase.\n\nHãy kiểm tra Internet.";
      }

      else if (error?.message) {
        message = error.message;
      }

      Alert.alert(
        "Lỗi đăng ký",
        message
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Đăng ký
      </Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Tên người dùng
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên người dùng"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

      </View>
      <View style={styles.inputGroup}>

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

      </View>

      <View style={styles.inputGroup}>

        <Text style={styles.label}>
          Mật khẩu
        </Text>

        <View style={styles.passwordContainer}>

          <TextInput
            style={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.eyeButton}
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
        onPress={handleRegister}
        disabled={loading}
      >

        <Text style={styles.buttonText}>
          {loading
            ? "Đang đăng ký..."
            : "Đăng ký"}
        </Text>

      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Bạn đã có tài khoản?
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "login",
                },
              ],
            });
          }}
        >
          <Text style={styles.loginButton}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;