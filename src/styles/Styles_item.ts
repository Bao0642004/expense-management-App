import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#F1F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 23,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#252B33",
    marginRight: 10,
  },

  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#20242A",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },

  category: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    maxWidth: "55%",
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "700",
  },

  dateTime: {
    flexDirection: "row",
    alignItems: "center",
  },

  date: {
    fontSize: 11,
    color: "#8A8F96",
  },

  time: {
    fontSize: 11,
    color: "#8A8F96",
    marginLeft: 8,
  },

 deleteContainer: {
  width: 160,
  height: "100%",
  marginLeft: 8,
  marginBottom: 10,
  flexDirection: "row",
  alignItems: "stretch",
  gap: 5,
},

deleteButton: {
  flex: 1,
  backgroundColor: "#FF3B30",
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
},

deleteButtonEdit: {
  flex: 1,
  backgroundColor: "#16CC23",
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
},

deleteText: {
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "700",
  marginTop: 4,
  textAlign: "center",
},
});

export default styles;