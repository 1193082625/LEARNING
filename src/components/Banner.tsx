import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');

const ContentText = () => {
  return <Text>888</Text>;
};

const Banner = ({data, height = 60, showDots = true}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < data.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      } else {
        setCurrentIndex(0);
        flatListRef.current.scrollToIndex({index: 0, animated: true});
      }
    }, 3000); // 每3秒切换一次

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => console.log('Clicked on item', index)}
        style={{
          ...styles.itemContainer,
          height: height,
        }}>
        {item?.image ? (
          <Image source={{uri: item.image}} style={styles.image} />
        ) : (
          <ContentText />
        )}
      </TouchableOpacity>
    );
  };

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      {showDots && (
        <View style={styles.pagination}>
          {data.map((_: any, index: number) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: width - 32,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  dot: {
    width: 18,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'tomato',
  },
  sentences: {
    textAlign: 'left',
  },
});

export default Banner;
