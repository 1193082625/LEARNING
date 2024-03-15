import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Icon} from '@ant-design/react-native';

export interface ArticleItemData {
  id: string;
  title: string;
  content: string;
  img: string;
  create_time: string;
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
const ArticleItem = ({data, onItemClick}: ArticleItemProps) => {
  console.log('文章item', data);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="rgba(0,0,0,0)"
      onPress={() => onItemClick(data)}>
      <View style={styles.cardItem}>
        <View style={styles.header}>
          <Image
            style={styles.profile}
            source={{
              uri: data.profile_picture,
            }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{data.user_name}</Text>
            <Text style={styles.time}>{data.create_time}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View>
          <Text style={styles.content}>{data.content}</Text>
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
    backgroundColor: 'white',
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
