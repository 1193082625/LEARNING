import {Button, Icon} from '@ant-design/react-native';
import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import commonStyles from '../assets/styles/common';

type MineProps = PropsWithChildren<{
  navigation: any;
}>;

const DATA = [
  {
    title: '常用功能',
    data: [
      {
        text: '问题反馈',
      },
      // {
      //   text: '设置',
      // },
    ],
  },
];

function Mine({navigation}: MineProps) {
  return (
    <View style={[styles.container, commonStyles.pageBg]}>
      <Image
        style={styles.profilePicture}
        source={require('../assets/imgs/default_profile.jpg')}
      />
      <Text style={styles.userName}>Echo</Text>

      <SectionList
        style={styles.section}
        sections={DATA}
        keyExtractor={(item, index) => item.text + index}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0)"
            onPress={() => navigation.navigate('Feedback')}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.text}</Text>
              <Icon style={styles.icon} name="right" />
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />

      <Text
        style={[styles.logout, commonStyles.themeBgColor]}
        onPress={() => console.log('退出登录')}>
        退出登录
      </Text>
    </View>
  );
}

const {width} = Dimensions.get('window');
const imgSize = 60;
const marginLeft = (width - imgSize - 32) / 2;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  profilePicture: {
    width: imgSize,
    height: imgSize,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: marginLeft,
    marginBottom: 10,
    justifyContent: 'center',
  },
  userName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    fontSize: 14,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  logout: {
    width: '100%',
    marginTop: 12,
    fontSize: 14,
    color: '#fff',
    height: 40,
    lineHeight: 40,
    borderRadius: 20,
    textAlign: 'center',
  },
});

export default Mine;
