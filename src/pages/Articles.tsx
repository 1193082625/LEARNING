import {View} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import TabSwitch, {TabItem} from '../components/TabSwitch';
import {getArticlesCategoriesData, getArticlesData} from '../api';
import ArticleItem, {ArticleItemData} from '../components/AtricleItem';
import commonStyles from '../assets/styles/common';

function Articles({navigation}: any) {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabItem | null>(null);
  const [articles, setArticles] = useState<ArticleItemData[]>([]);

  const handleTabChange = (tab: TabItem) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getArticlesCategoriesData()
      .then(res => {
        const categories = res.data;
        setActiveTab(categories[0]);
        setTabs(categories);
        getArticlesList();
      })
      .catch(error => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getArticlesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // 获取文章列表
  const getArticlesList = () => {
    getArticlesData(activeTab?.id)
      .then((res: any) => {
        setArticles(res.data);
      })
      .catch(error => {
        console.log('获取文章列表错误', error);
      });
  };

  const handleClick = (item: ArticleItemData) => {
    navigation.navigate('ArticleDetail', {
      articleId: item._id,
    });
  };
  // 渲染列表项
  const renderItem = ({item}: any) => (
    <ArticleItem key={item._id} data={item} onItemClick={handleClick} />
  );

  return (
    <View style={commonStyles.pageBg}>
      <TabSwitch
        tabs={tabs}
        initialTab={activeTab}
        onChange={handleTabChange}
      />
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
}
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height - 110,
    paddingTop: 8,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});
export default Articles;
