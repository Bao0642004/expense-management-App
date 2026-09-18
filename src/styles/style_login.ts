import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#2c3e50",

    paddingHorizontal: 20,

  },


  title: {

    fontSize: 32,

    fontWeight: "bold",

    color: "#fff",

    marginBottom: 30,

  },


  inputGroup: {

    width: "100%",

    marginBottom: 15,

  },


  label: {

    fontSize: 16,

    color: "#fff",

    marginBottom: 5,

  },


  input: {

    width: "100%",

    height: 50,

    backgroundColor: "#fff",

    borderRadius: 8,

    paddingHorizontal: 15,

    fontSize: 16,

    color: "#222",

  },


  passwordContainer: {

    width: "100%",

    height: 50,

    backgroundColor: "#fff",

    borderRadius: 8,

    flexDirection: "row",

    alignItems: "center",

    paddingLeft: 15,

    paddingRight: 10,

  },


  passwordInput: {

    flex: 1,

    fontSize: 16,

    color: "#222",

  },


  eyeButton: {

    padding: 5,

  },


  button: {

    width: "100%",

    height: 50,

    backgroundColor: "#3498db",

    borderRadius: 8,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,

  },


  buttonDisabled: {

    opacity: 0.6,

  },


  buttonText: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",

  },


  registerContainer: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 20,

  },


  registerText: {

    color: "#fff",

    fontSize: 15,

  },


  registerButton: {

    color: "#3498db",

    fontSize: 15,

    fontWeight: "bold",

    marginLeft: 5,

  },

});
export default styles;