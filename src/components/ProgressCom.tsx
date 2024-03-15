import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import commonStyles from '../assets/styles/common';

const {width} = Dimensions.get('window');
export const ProgressCom = ({activeItem = 1}: any) => {
  const data = [1, 2, 3, 4, 5];
  return (
    <View style={[styles.progressBox, commonStyles.flexRow]}>
      {data.map((item, index) => (
        <Text
          key={index}
          style={[
            commonStyles.themeBorderColor,
            commonStyles.themeColor,
            activeItem === item ? styles.activeItem : styles.item,
          ]}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBox: {
    width: width - 32,
    height: 50,
    gap: 10,
    justifyContent: 'center',
  },
  item: {
    width: 30,
    height: 30,
    lineHeight: 30,
    borderRadius: 15,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  activeItem: {
    width: 38,
    height: 38,
    lineHeight: 38,
    borderRadius: 19,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});
