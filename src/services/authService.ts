import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebaseConfig";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}


export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

  const user =
    userCredential.user;
  try {
    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),
      {
        uid: user.uid,
        name: name.trim(),
        email: email.trim(),
        avatar: "",
      }
    );

    console.log(
      "FIRESTORE USER TẠO THÀNH CÔNG"
    );

  } catch (error) {
    console.log(
      "FIRESTORE REGISTER ERROR:",
      error
    );

    throw error;
  }
  return user;
};


export const loginUser = async (
  email: string,
  password: string
) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

  const user = userCredential.user;
  return user;
};

export const getCurrentUserProfile =
  async (): Promise<UserProfile | null> => {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    try {
      const userRef =
        doc(
          db,
          "users",
          user.uid
        );
      const snapshot =
        await getDoc(
          userRef
        );
      if (!snapshot.exists()) {
        return {
          uid:  user.uid,
          name: user.displayName || "Chưa có tên",
          email: user.email || "",
          avatar:  "",
        };
      }

      const data = snapshot.data();

      return {
        uid: user.uid,
        name:
          typeof data.name === "string"
            ? data.name
            : user.displayName ||
              "Chưa có tên",

        email:
          typeof data.email === "string"
            ? data.email
            : user.email ||
              "",

        avatar:
          typeof data.avatar === "string"
            ? data.avatar
            : "",
      };

    } catch (error) {

      console.log(
        "GET PROFILE ERROR:",
        error
      );
      throw error;
    }
  };

export const logoutUser =
  async () => {

    await signOut(
      auth
    );

    console.log(
      "ĐÃ ĐĂNG XUẤT"
    );
  };