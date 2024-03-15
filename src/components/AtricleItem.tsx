import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import HTML from 'react-native-render-html';
import commonStyles from '../assets/styles/common';

export interface ArticleItemData {
  _id: string;
  title: string;
  content: string;
  img: string;
  create_at: string;
  author_id: string;
  user_name: string;
  profile_picture: string;
  likes_num: number;
  collect_num: number;
}

type ArticleItemProps = PropsWithChildren<{
  data: ArticleItemData;
  onItemClick: Function;
}>;

const {width} = Dimensions.get('window');

const ArticleItem = ({data, onItemClick}: ArticleItemProps) => {
  const defaultUserInfo = {
    user_name: '轻舟',
    profile_picture: require('../assets/imgs/default_profile.jpg'),
  };

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="rgba(0,0,0,0)"
      onPress={() => onItemClick(data)}>
      <View style={[styles.cardItem, commonStyles.boxShadow]}>
        <View style={styles.header}>
          {data.profile_picture ? (
            <Image
              style={styles.profile}
              source={{
                uri: data.profile_picture,
              }}
            />
          ) : (
            <Image
              style={styles.profile}
              source={defaultUserInfo.profile_picture}
            />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {data.user_name || defaultUserInfo.user_name}
            </Text>
            <Text style={styles.time}>{data.create_at}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View>
          <HTML source={{html: data.content}} contentWidth={width} />
          {/* <Text style={styles.content}>{data.content}</Text> */}
        </View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Icon name="like" />
            <Text>{data.likes_num}</Text>
          </View>
          <View style={styles.footerItem}>
            <Icon name="heart" />
            <Text>{data.collect_num}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
  },
  userInfo: {
    flex: 1,
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    marginRight: 15,
    borderRadius: 20,
  },
  userName: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  time: {
    color: '#666',
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: 5,
  },
  content: {
    lineHeight: 24,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default ArticleItem;
