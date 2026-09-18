import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 20,
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,

    elevation: 3,

    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 20,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },

  centerLabel: {
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  centerTitle: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 5,
  },

  centerAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
  },

  selectedIcon: {
    fontSize: 25,
    marginBottom: 3,
  },

  selectedName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },

  selectedAmount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#219653",
    textAlign: "center",
    marginTop: 3,
  },

  selectedPercent: {
    fontSize: 11,
    color: "#888888",
    marginTop: 2,
  },

  detailBox: {
    marginTop: 15,
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
  },

  detailTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222222",
  },

  detailAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#219653",
    marginTop: 6,
  },

  detailPercent: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },

  emptyText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },
});
export default styles;