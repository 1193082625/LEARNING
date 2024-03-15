import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Image, Text, View} from 'react-native';
import SwipeableCards from '../components/SwipeCard';
import {useUserStore} from '../store/user';
import {getSentences} from '../api';
import {Badge, Icon} from '@ant-design/react-native';
import commonStyles from '../assets/styles/common';

const {width} = Dimensions.get('window');
const bannerHeight = 60;

const cardData = [
  {
    question: 'webpack涉及哪些内容？',
    answer: '666',
  },
  {
    question: '如何处理前端跨域？',
    answer: '777',
  },
  {
    question: '如何实现性能优化？',
    answer: '888',
  },
];

function HomeScreen() {
  const userName = useUserStore(state => state.userName);
  const [sentences, setSentences] = useState('');

  useEffect(() => {
    getSentences()
      .then(res => {
        setSentences(res?.data.content);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.homeWrapper}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.pageTitle, commonStyles.themeColor]}>
            你好，{userName}
          </Text>
          <Text style={styles.sentence}>{sentences || '徐徐图之'}</Text>
        </View>

        <Badge text={109} dot>
          <Icon name="search" size="md" color="#4a4a4a" />
        </Badge>
      </View>
      <View />
      <View style={styles.achievements}>
        <View style={[styles.achievementsItem, styles.boxShadow]}>
          <View>
            <Text style={styles.itemTitle}>学习时长</Text>
            <Text>
              <Text style={styles.itemCout}>324</Text> h
            </Text>
          </View>
          <Image
            style={styles.achieveIcon}
            source={require('../assets/imgs/time.png')}
          />
        </View>
        <View style={[styles.achievementsItem, styles.boxShadow]}>
          <View>
            <Text style={styles.itemTitle}>解题数</Text>
            <Text>
              <Text style={styles.itemCout}>324</Text> 题
            </Text>
          </View>
          <Image
            style={styles.achieveIcon}
            source={require('../assets/imgs/achieve.png')}
          />
        </View>
      </View>
      {/* SVG使用 */}
      {/* <View>
        <BallIcon />
        <SvgXml xml={bgXml} width="100" height="100" />
      </View> */}
      <View style={[styles.cards, styles.boxShadow]}>
        <SwipeableCards data={cardData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
  },
  header: {
    width: width - 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    marginTop: 40,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  sentence: {
    fontSize: 12,
    color: '#878787',
    marginTop: 10,
  },
  banner: {
    margin: 16,
    height: bannerHeight,
    borderRadius: 8,
  },
  recommendArticle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    padding: 10,
  },
  recommendArticleItem: {
    display: 'flex',
    gap: 10,
  },
  recommendArticleTitle: {
    fontSize: 14,
    color: '#f15d1e',
    lineHeight: 24,
    width: 40,
  },
  recommendList: {
    flex: 1,
    display: 'flex',
    gap: 10,
  },
  listItem: {
    fontSize: 14,
    textAlign: 'right',
    overflow: 'hidden',
  },
  mb10: {
    marginBottom: 10,
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  achievementsItem: {
    flex: 1,
    height: 100,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  itemCout: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 20,
  },
  achieveIcon: {
    width: 60,
    height: 60,
  },
  boxShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  grid: {
    width: width - 32,
    margin: 16,
    backgroundColor: 'white',
  },
  cards: {
    width: width - 32,
    height: 300,
    // backgroundColor: 'blue',
    borderRadius: 10,
  },
  carouselWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
});

export default HomeScreen;
