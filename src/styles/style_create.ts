import { StyleSheet } from 'react-native';


const styles =  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:"#F5F5F5",
    },

    content: {
     padding: 20,
    },

    headerContainer: {
      flexDirection:  "row",
      alignItems:"center",
      marginBottom: 15,
      gap: 10,
    },

    backButton: {
      width: 38,
      height: 38,
      borderWidth: 1.5,
      borderColor: "#000000",
      borderRadius:20,
      alignItems: "center",
      justifyContent: "center",
    },

    header: {
      fontSize: 26,
      fontWeight:"700",
      color: "#222222",
    },


    label: {
      fontSize: 15,
      fontWeight:"600",
      color: "#333333",
      marginTop:   15,
      marginBottom: 8,
    },

    input: {
      height: 52,
      backgroundColor: "#FFFFFF",
      borderRadius:  12,
      borderWidth:  1,
      borderColor: "#E0E0E0",
      paddingHorizontal: 15,
      fontSize: 16,
      color:  "#222222",
    },

    amountContainer: {
      height:  52,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      paddingHorizontal: 15,
      flexDirection:"row",
      alignItems:"center",
    },

    amountInput: {
      flex: 1,
      height: "100%",
      fontSize:16,
      color: "#222222",
    },

    currency: {
      fontSize: 17,
      fontWeight: "700",
      color: "#333333",
      marginLeft:  8,
    },

    categoryButton: {
      minHeight:  55,
      backgroundColor:"#FFFFFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor:"#E0E0E0",
      paddingHorizontal: 15,
      flexDirection:"row",
      alignItems:  "center",
    },

    categoryIcon: {
      fontSize: 25,
      marginRight: 12,
    },

    categoryName: {
      flex: 1,
      fontSize: 16,
      fontWeight:  "600",
      color: "#333333",
    },

    categoryArrow: {
      marginLeft:  5,
    },

    addButton: {
      height:  55,
      backgroundColor:"#222222",
      borderRadius:  14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },


    addButtonDisabled: {
      opacity:  0.6,
    },

    addButtonText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "700",
    },
  });
export default styles;