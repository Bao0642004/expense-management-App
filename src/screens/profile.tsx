import Ionicons         from "@expo/vector-icons/Ionicons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import Svg, {
  Path,
} from "react-native-svg";

import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  auth,
  db,
  storage,
} from "../firebase/firebaseConfig";
import styles           from "../styles/style_profile";


interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}


const Profile = () => {
  const navigation =  useNavigation<any>();

  const [image, setImage,] = useState<string | null>(null);

  const [ userProfile,setUserProfile,] = useState<UserProfile | null>(null);

  const [loading, setLoading,] = useState(true);

  const [uploading,setUploading,] = useState(false);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          user: User | null
        ) => {


          if (!user) {

            console.log(
              "PROFILE: CHƯA ĐĂNG NHẬP"
            );

            setUserProfile(
              null
            );

            setImage(
              null
            );

            setLoading(
              false
            );

            return;
          }

          console.log(
            "PROFILE: USER ĐĂNG NHẬP"
          );

          console.log(
            "UID:",
            user.uid
          );

          console.log(
            "EMAIL:",
            user.email
          );

          let profile: UserProfile = {

            uid:
              user.uid,

            name:
              user.displayName ||
              "Chưa có tên",

            email:
              user.email ||
              "",

            avatar:
              "",
          };


          try {

            const userRef =
              doc(
                db,
                "users",
                user.uid
              );


            console.log(
              "ĐANG ĐỌC:",
              `users/${user.uid}`
            );


            const snapshot =
              await getDoc(
                userRef
              );

            if (
              snapshot.exists()
            ) {

              const data =
                snapshot.data();


              console.log(
                "FIRESTORE DATA:",
                data
              );


              const name =
                typeof data.name === "string" &&
                data.name.trim() !== ""
                  ? data.name
                  : user.displayName ||
                    "Chưa có tên";


              const email =
                typeof data.email === "string" &&
                data.email.trim() !== ""
                  ? data.email
                  : user.email ||
                    "";

              const avatar =
                typeof data.avatar === "string" &&
                data.avatar.trim() !== ""
                  ? data.avatar
                  : "";

              profile = {

                uid:
                  user.uid,

                name:
                  name,

                email:
                  email,

                avatar:
                  avatar,
              };


              console.log(
                "NAME:",
                profile.name
              );

              console.log(
                "EMAIL:",
                profile.email
              );

              console.log(
                "AVATAR:",
                profile.avatar
              );


            } else {

             

              console.log(
                "KHÔNG CÓ DOCUMENT FIRESTORE"
              );
            }


          } catch (error) {

            console.log(
              "GET FIRESTORE ERROR:",
              error
            );
          }

          setUserProfile(
            profile
          );
          
          if (
            profile.avatar &&
            profile.avatar.trim() !== ""
          ) {

            console.log(
              "LOAD AVATAR:",
              profile.avatar
            );


            setImage(
              profile.avatar
            );

          } else {

            console.log(
              "USER CHƯA CÓ AVATAR"
            );


            setImage(
              null
            );
          }



          setLoading(
            false
          );

        }
      );
    return () => {

      unsubscribe();

    };

  }, []);


  const handleChooseImage =
    async () => {
      try {
        // USER HIỆN TẠI
        const user =
          auth.currentUser;

        if (!user) {
          Alert.alert(
            "Lỗi",
            "Bạn chưa đăng nhập."
          );

          return;
        }

        console.log(
          "BẮT ĐẦU ĐỔI AVATAR"
        );

        console.log(
          "UID:",
          user.uid
        );

        // XIN QUYỀN ẢNH
        const permission =
          await ImagePicker
            .requestMediaLibraryPermissionsAsync();

        if (
          !permission.granted
        ) {

          Alert.alert(
            "Thông báo",
            "Vui lòng cho phép ứng dụng truy cập thư viện ảnh."
          );

          return;
        }
        // CHỌN ẢNH

        const result =
          await ImagePicker
            .launchImageLibraryAsync({

              mediaTypes: [
                "images",
              ],

              allowsEditing:
                true,

              aspect: [
                1,
                1,
              ],

              quality:
                0.8,
            });
        // HỦY
        if (
          result.canceled ||
          result.assets.length === 0
        ) {

          console.log(
            "HỦY CHỌN ẢNH"
          );

          return;
        }

        // IMAGE URI
        const imageUri =
          result.assets[0].uri;


        console.log(
          "IMAGE URI:",
          imageUri
        );

        // UPLOADING
        setUploading(
          true
        );
        // HIỂN THỊ TẠM
        setImage(
          imageUri
        );

        // URI → BLOB
        const response =
          await fetch(
            imageUri
          );


        if (
          !response.ok
        ) {

          throw new Error(
            "Không thể đọc file ảnh."
          );
        }


        const blob =
          await response.blob();


        console.log(
          "BLOB SIZE:",
          blob.size
        );

        // TẠO FILE NAME MỚI
        const fileName =  `avatar_${Date.now()}.jpg`;

        const storagePath =  `avatars/${user.uid}/${fileName}`;

        console.log(
          "STORAGE PATH:",
          storagePath
        );
        // STORAGE REFERENCE
        const avatarRef =
          ref(
            storage,
            storagePath
          );

        // UPLOAD
        await uploadBytes(
          avatarRef,
          blob,
          {
            contentType:
              "image/jpeg",
          }
        );


        console.log(
          "UPLOAD STORAGE THÀNH CÔNG"
        );


        // DOWNLOAD URL
        const downloadURL =
          await getDownloadURL(
            avatarRef
          );

        console.log(
          "DOWNLOAD URL:",
          downloadURL
        );
        // FIRESTORE
        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        await setDoc(
          userRef,
          {

            uid:
              user.uid,

            email:
              user.email ||
              "",

            avatar:
              downloadURL,

          },
          {
            merge:
              true,
          }
        );


        console.log(
          "FIRESTORE AVATAR LƯU THÀNH CÔNG"
        );

        // HIỂN THỊ URL FIREBASE
        setImage(
          downloadURL
        );

        // UPDATE PROFILE
        setUserProfile(
          previous => {

            if (!previous) {

              return previous;
            }
            return {
              ...previous,
              avatar:
                downloadURL,
            };
          }
        );

        console.log(
          "AVATAR ĐÃ LƯU THÀNH CÔNG"
        );

        Alert.alert(
          "Thành công",
          "Ảnh đại diện đã được lưu vào tài khoản."
        );


      } catch (error: any) {

        console.log(
          "================================"
        );

        console.log(
          "IMAGE UPLOAD ERROR:",
          error
        );

        console.log(
          "ERROR CODE:",
          error?.code
        );

        console.log(
          "ERROR MESSAGE:",
          error?.message
        );

        console.log(
          "================================"
        );


        Alert.alert(
          "Lỗi",
          error?.message ||
          "Không thể lưu ảnh đại diện."
        );


      } finally {

        setUploading(
          false
        );
      }
    };

const handleLogout = () => {
  Alert.alert(
    "Xác nhận đăng xuất",
    "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?",
    [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("ĐANG ĐĂNG XUẤT...");

            await signOut(auth);

            console.log("ĐĂNG XUẤT THÀNH CÔNG");

            setImage(null);
            setUserProfile(null);

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "login",
                },
              ],
            });
          } catch (error) {
            console.log("LOGOUT ERROR:", error);

            Alert.alert(
              "Lỗi",
              "Không thể đăng xuất."
            );
          }
        },
      },
    ]
  );
};

  if (loading) {
    return (
      <View
        style={
          styles.loadingContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#000"
        />
        <Text
          style={
            styles.loadingText
          }
        >
          Đang tải thông tin...
        </Text>
      </View>
    );
  }

  return (

    <ScrollView
      style={
        styles.container
      }
    >
      <View
        style={
          styles.headerContainer
        }
      >

        <Svg
          width="100%"
          height="300"
          viewBox="0 0 400 235"
          style={
            styles.headerSvg
          }
          preserveAspectRatio="none"
        >

          <Path
            d="
              M 0 0
              L 400 0
              L 400 20
              C 400 115, 335 165, 250 165
              C 235 165, 220 165, 200 165
              C 180 165, 165 165, 150 165
              C 65 165, 0 115, 0 20
              Z
            "
            fill="#000"
            stroke="#222"
            strokeWidth={1.5}
          />

        </Svg>
        <TouchableOpacity
          style={
            styles.avatarContainer
          }
          onPress={
            handleChooseImage
          }
          activeOpacity={0.8}
          disabled={
            uploading
          }
        >
          {uploading ? (

            <View
              style={
                styles.uploadingContainer
              }
            >

              <ActivityIndicator
                size="large"
                color="#000"
              />

              <Text
                style={
                  styles.uploadingText
                }
              >
                Đang tải...
              </Text>

            </View>

          ) : image ? (

            <Image
              source={{
                uri:
                  image,
              }}
              style={
                styles.avatar
              }
              resizeMode="cover"
            />

          ) : (

            <Ionicons
              name="person"
              size={60}
              color="#777"
            />

          )}

        </TouchableOpacity>
      </View>
      <View
        style={
          styles.content
        }
      >
        <View
          style={
            styles.row
          }
        >

          <Text
            style={
              styles.name
            }
          >
            Tên người dùng
          </Text>

          <Text
            style={
              styles.value
            }
          >
            {
              userProfile?.name ||
              "Chưa có tên"
            }
          </Text>
        </View>
        <View
          style={
            styles.row
          }
        >
          <Text
            style={
              styles.name
            }
          >
            Email
          </Text>
          <Text
            style={
              styles.value
            }
            numberOfLines={1}
          >
            {
              userProfile?.email ||
              "Chưa có email"
            }
          </Text>
        </View>
        <View
          style={
            styles.row
          }
        >
          <Text
            style={
              styles.name
            }
          >
            UID
          </Text>
          <Text
            style={
              styles.uid
            }
            numberOfLines={1}
          >
            {
              userProfile?.uid ||
              ""
            }
          </Text>
        </View>
        <TouchableOpacity
          style={
            styles.logoutButton
          }
          onPress={
            handleLogout
          }
        >
          <Text
            style={
              styles.logoutText
            }
          >
            Đăng xuất
          </Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;