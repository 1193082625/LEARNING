import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const alphaber = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const ChoiceCom = ({data, isMulti}: any) => {
  const [choicedItems, setChoicedItems] = useState(new Set());
  const choiceItemHandle = (item: any) => {
    console.log('选择对应选项', item);
    const newSetData = choicedItems;
    // 选择或取消选择对应选项
    if (newSetData.has(item.id)) {
      newSetData.delete(item.id);
    } else {
      newSetData.add(item.id);
    }
    setChoicedItems(newSetData);
  };

  return (
    <View>
      <Text>{isMulti ? '多选题' : '单选题'}</Text>
      {data.map((item: any, index: number) => (
        <Text
          key={item.id}
          style={[
            styles.choiceItem,
            choicedItems.has(item.id) && styles.activeChoicedItem,
          ]}
          onPress={() => choiceItemHandle(item)}>
          {alphaber[index]}. {item.content}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  choiceItem: {
    width: '100%',
    lineHeight: 36,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
    color: '#666',
  },
  activeChoicedItem: {
    borderColor: '#b0e0e6',
    color: '#48d1cc',
  },
});
export default ChoiceCom;
