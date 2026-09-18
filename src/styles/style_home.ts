import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#F7F8FA",
      paddingHorizontal: 14,
    },
    header: {
      paddingTop: 12,
      paddingBottom:18,
    },

    greeting: {
      fontSize: 27,
      fontWeight:"800",
      color: "#16191D",
    },

    subtitle: {
      fontSize:15,
      color: "#7B8087",
      marginTop:4,
    },

    totalCard: {
      height: 122,

      backgroundColor:"#000000",
      borderRadius: 25,
      alignItems: "center",
      justifyContent:  "center",
      marginBottom:  20,
      elevation: 5,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity:0.15,
      shadowRadius: 5,
    },

    totalTitle: {
      color:"#B9B9B9",
      fontSize:15,
      fontWeight:"600",
      marginBottom:5,
    },

    totalAmount: {
      color:"#FFFFFF",
      fontSize:30,
      fontWeight: "800",
    },

    listContent: {
      paddingBottom: 110,
    },

    emptyListContent: {
      flexGrow:1,
      paddingBottom: 110,
    },

    empty: {
      alignItems:"center",
      justifyContent: "center",
      marginTop: 70,
    },

    emptyIcon: {
      fontSize: 50,
      marginBottom:   10,
    },

    emptyText: {
      fontSize:18,
      fontWeight: "700",
      color:"#222222",
    },

    emptySubText: {
      fontSize:14,
      color: "#888888",
      marginTop:    5,
    },

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      marginTop:12,
      fontSize: 15,
      color:"#777777",
    },

});

export default styles;