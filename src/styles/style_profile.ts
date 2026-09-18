import { StyleSheet } from "react-native";

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },

    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: "#777",
    },

    headerContainer: {
      height: 235,
      position: "relative",
    },

    headerSvg: {
      position: "absolute",
      top: 0,
      left: 0,
    },

    avatarContainer: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#eee",
      justifyContent: "center",
      alignItems: "center",
      left: "50%",
      marginLeft: -75,
      top: 150,
      borderWidth: 2,
      borderColor: "#222",
      overflow: "hidden",
      zIndex: 10,
      elevation: 10,
    },

    avatar: {
      width: "100%",
      height: "100%",
    },

    uploadingContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eee",
    },

    uploadingText: {
      marginTop: 5,
      fontSize: 12,
      color: "#555",
    },

    content: {
      flexDirection: "column",
      marginTop: 80,
      paddingHorizontal: 20,
      gap: 18,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    name: {
      width: 140,
      fontSize: 18,
      fontWeight: "bold",
      color: "#222",
    },

    value: {
      flex: 1,
      color: "#777",
      fontSize: 17,
    },

    uid: {
      flex: 1,
      color: "#999",
      fontSize: 11,
    },

   logoutButton: {
  marginTop: "auto",
  marginBottom: 20,
  height: 50,
  borderRadius: 8,
  backgroundColor: "#e74c3c",
  justifyContent: "center",
  alignItems: "center",
  bottom:-200
},

    logoutText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },

  });
export default styles;