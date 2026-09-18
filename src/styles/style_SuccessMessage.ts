import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {

    position: "absolute",

    top: 45,

    left: 15,

    right: 15,

    minHeight: 55,

    backgroundColor: "#22C55E",

    borderRadius: 10,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 16,

    zIndex: 9999,

    elevation: 10,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.25,

    shadowRadius: 5,
  },

  icon: {

    color: "#FFFFFF",

    fontSize: 22,

    fontWeight: "bold",

    marginRight: 10,
  },

  text: {

    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "600",

    flex: 1,
  },

});
export default styles;