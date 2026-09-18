import Ionicons             from "@expo/vector-icons/Ionicons";

import React                from "react";

import { TouchableOpacity } from "react-native";

import styles               from "./Adđ-button.styles";

type AddButtonProps = {
  onOpenadd: () => void;
};

const Addbutton = ({ onOpenadd }: AddButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onOpenadd}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={40} color="#fff" />
    </TouchableOpacity>
  );
};

export default Addbutton;