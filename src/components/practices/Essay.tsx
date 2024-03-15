/**
 * 问答题
 */
import {View} from '@ant-design/react-native';
import React from 'react';
import {Text} from 'react-native';
// import MarkdownEditorCom from '../Editor';
// import PracticesItem from '../PractivesItem';

const Essay = ({data}: any) => {
  console.log('aa', data);

  return (
    <View>
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      {/* <MarkdownEditorCom /> */}
    </View>
  );
};

export default Essay;
