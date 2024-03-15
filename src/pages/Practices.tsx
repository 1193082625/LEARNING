import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {View, StyleSheet, Dimensions, RefreshControl} from 'react-native';
import {RecyclerListView, LayoutProvider, DataProvider} from 'recyclerlistview';
import {getPractices} from '../api';
import {SearchBar} from '@ant-design/react-native';
import PracticesItem from '../components/PracticesItem';

// 模拟数据
const data: any[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    id: i + 1,
    key: i,
    title: `试题 ${i}`,
    total: 13,
  });
}

const {width} = Dimensions.get('window');

// 布局提供程序
const layoutProvider = new LayoutProvider(
  () => {
    return 0; // 此示例中所有项都使用相同的布局类型，因此返回相同的布局类型编号
  },
  (type, dim) => {
    dim.width = width; // 列表项的宽度
    dim.height = 150; // 列表项的高度
  },
);

type PracticesProps = PropsWithChildren<{
  navigation: any;
}>;

const Practices = ({navigation}: PracticesProps) => {
  const [loading, setLoading] = useState(false);
  const [practices, setPractices] = useState([]);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows([]),
  );

  useEffect(() => {
    getPracticesList();
  }, []);

  const getPracticesList = () => {
    getPractices()
      .then(res => {
        setPractices(res.data);
        setDataProvider(dataProvider.cloneWithRows(res.data));
      })
      .catch(error => console.error(error));
  };

  const handleClick = (item: PracticesItem) => {
    navigation.navigate('PracticeDetail', {
      practicesId: item._id,
    });
  };

  // 渲染列表项的方法
  const rowRenderer = (type, data, index) => {
    return <PracticesItem data={data} onItemClick={handleClick} />;
  };

  const onLoadMore = () => {
    console.log('加载更多');
  };

  return (
    <View>
      <SearchBar placeholder="Search" showCancelButton />
      <View style={styles.container}>
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
          onEndReached={onLoadMore}
          onEndReachedThreshold={50}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={loading}
                onRefresh={async () => {
                  setLoading(true);
                  console.log('下拉刷新');

                  // analytics.logEvent("Event_Stagg_pull_to_refresh");
                  // await this.getInfo();
                  setLoading(false);
                }}
              />
            ),
          }}
        />
      </View>
    </View>
  );
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height - 120,
    paddingTop: 8,
  },
});

export default Practices;
