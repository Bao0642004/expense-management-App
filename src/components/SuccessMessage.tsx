import Feather from '@expo/vector-icons/Feather';

import React, {
  useEffect,
} from "react";

import {
  View,
  Text,
} from "react-native";

import styles  from '../styles/style_SuccessMessage';

interface SuccessMessageProps {
  message: string;
  onHide: () => void;
}

const SuccessMessage = ({  message, onHide,}: SuccessMessageProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
       <Feather name="check-circle" size={24} color="#ffff" />
      </Text>

      <Text style={styles.text}>
        {message}
      </Text>

    </View>
  );
};

export default SuccessMessage;