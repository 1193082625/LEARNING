import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import commonStyles from '../assets/styles/common';

interface PracticesItem {
  _id: string;
  type: number;
  title: string;
  content: string;
  is_member: boolean;
  referenceAnswer: string;
  language: null;
  knowledgeTags: any;
  create_time: string;
}

type PracticesItemProps = PropsWithChildren<{
  data: PracticesItem;
  onItemClick: Function;
}>;

const practicesTypes = ['单选题', '多选题', '填空题', '问答题', '编程题'];

const PracticesItem = ({data, onItemClick}: PracticesItemProps) => {
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="rgba(0,0,0,0)"
      onPress={() => onItemClick(data)}>
      <View style={[styles.item, commonStyles.boxShadow]}>
        <View style={styles.topBox}>
          <Image
            style={styles.icon}
            // source={require('../asstes/imgs/icon2.png')}
            source={require('../assets/imgs/icon2.png')}
          />
          <Text style={styles.type}>{practicesTypes[data.type - 1]}</Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {data.title}
        </Text>
        <View style={styles.tags}>
          {data.knowledgeTags.map((tag: string, idx: number) => (
            <Text key={idx} style={styles.info}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    width: width - 20,
    height: 130,
    padding: 10,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 8,
  },
  topBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    width: 22,
    height: 22,
  },
  type: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 3,
  },
  title: {
    lineHeight: 30,
    marginBottom: 4,
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  info: {
    fontSize: 12,
    lineHeight: 22,
    color: '#666',
  },
});

export default PracticesItem;
