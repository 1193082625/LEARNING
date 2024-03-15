#### 参考链接：
[路由](https://reactnavigation.org/docs/params)
[路由](https://www.zhihu.com/tardis/bd/art/553544088?source_id=1001)
[websocket](https://blog.csdn.net/weixin_47872719/article/details/123702625)
[RecyclerListView](https://www.yuucn.com/a/130739.html)
[游戏](https://juejin.cn/post/6966866589928914980)
[store](https://blog.csdn.net/qq_54074936/article/details/128555905)
[store -- @reduxjs/toolkit](https://www.cnblogs.com/yinpengfei/p/16753677.html)

#### 笔记：
  * 路由跳转：
     
     ```
     /* 1. Navigate to the Details route with params */
     navigation.navigate('Details', {
     	itemId: 86,
     	otherParam: 'anything you want here',
     });
     
     function DetailsScreen({ route, navigation }) {
      /* 2. Get the param */
      const { itemId, otherParam } = route.params;
     }
     ```
     
     
     
  * 

#### 问题记录：
1. 使用路由时除了安装相关依赖，还需要对ios和安卓进行相关操作
ios: 
    cd ios
    pod install
android: 修改 /android/app/build.gradle
    添加 `implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'`
