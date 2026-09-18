import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:"#FFFFFF",
    paddingHorizontal: 15,
  },

  close: {
    alignSelf:"flex-end",
    marginTop: 10,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#16191D",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#7B8087",
    marginTop: 4,
    lineHeight: 22,
  },

  list: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  categoryItem: {
    flex: 1,
    height: 110,
    borderRadius: 15,
    margin: 6,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 10,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center",
    marginBottom: 8,
  },

  icon: {
    fontSize: 25,
  },

  categoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
});

export default styles;