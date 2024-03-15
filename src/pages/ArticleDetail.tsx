import {RouteProp} from '@react-navigation/native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getArticleDetail} from '../api';
import HTML from 'react-native-render-html';

type RootStackParamList = {
  ArticleDetail: {articleId: string}; // 定义了 PracticesDetail 组件的参数类型为一个包含 id 属性的对象，id 的类型为 string
  // 其他路由配置
};

type PracticesDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

type DetailsProps = PropsWithChildren<{
  route: PracticesDetailRouteProp;
  navigation: any;
}>;

const Details = ({data}: any) => {
  return (
    <View>
      <Text style={styles.title}>{data.title}</Text>
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
      <Image
        style={styles.img}
        source={{
          uri: data.img,
        }}
      />
      <HTML
        source={{html: data.content}}
        baseStyle={htmlStyles.baseFontStyle}
      />
    </View>
  );
};

function ArticleDetails({route, navigation}: DetailsProps) {
  const {articleId} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [articleDetail, setArticleDetail] = useState<any>(null);
  useEffect(() => {
    getArticleDetail(articleId)
      .then(res => {
        console.log('获取文章详情', res.data);
        setArticleDetail(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Details data={articleDetail} />
      )}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 40,
    marginTop: 5,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
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
  img: {
    width: '100%',
  },
  content: {
    lineHeight: 24,
  },
});

const htmlStyles = StyleSheet.create({
  baseFontStyle: {
    lineHeight: 24,
    color: 'black',
  },
  // tagsStyles: {
  //   p: {
  //     marginBottom: 10,
  //   },
  //   b: {
  //     fontWeight: 'bold',
  //   },
  //   i: {
  //     fontStyle: 'italic',
  //   },
  // },
  containerStyle: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
});

export default ArticleDetails;
