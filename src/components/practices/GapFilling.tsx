/**
 * 填空题
 */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {countOccurrences} from '../../utils';
import {InputItem} from '@ant-design/react-native';

const GapFilling = ({data}: any) => {
  const subStr = '\\[$##$\\]';
  const len = countOccurrences(data.content, subStr);
  const [inputValues, setInputValues] = useState(new Array(len).fill(''));

  // 定义一个处理输入变化的函数
  const handleInputChange = (index: number, value: any) => {
    // 复制一份原有的 inputValues 数组
    const newInputValues = [...inputValues];
    // 更新数组中对应索引的值
    newInputValues[index] = value;
    // 更新状态
    setInputValues(newInputValues);
  };

  return (
    <View>
      <Text>{data.title}</Text>
      {inputValues.map((value, index) => {
        return (
          <View key={index}>
            <Text>{index}</Text>
            <InputItem
              clear
              error
              value={value}
              onChange={(e: any) => handleInputChange(index, e.target.value)}
              placeholder="请在此填写答案">
              文本输入
            </InputItem>
          </View>
        );
      })}
    </View>
  );
};

export default GapFilling;
