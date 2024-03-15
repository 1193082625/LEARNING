import {View} from '@ant-design/react-native';
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  Text,
  Easing,
  Dimensions,
} from 'react-native';

export interface CardItem {
  question: string;
  answer: string;
}

const springConfig = {
  useNativeDriver: false,
  speed: 200,
};

const setSpring = (pan: any, x: any, y: any, func: Function | null) => {
  Animated.spring(pan, {
    ...springConfig,
    toValue: {x, y},
  }).start(() => {
    if (func) {
      func();
      pan.setValue({x: 0, y: 0});
    }
  });
};

const SwipeCard = ({cardData, onSwipeLeft, onSwipeRight}: any) => {
  const [pan] = useState(() => new Animated.ValueXY());
  const [flipped, setFlipped] = useState(false);
  const [deg, setDeg] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [degB, setDegB] = useState(new Animated.Value(180));
  const [opacityB, setOpacityB] = useState(new Animated.Value(1));

  const rotateCard = pan.x.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        const {dx, dy} = gesture;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          console.log('处理滑动');
          if (dx > 120) {
            // Swipe right
            setSpring(pan, 500, dy, onSwipeRight);
            stopDefaultPage();
          } else if (dx < -120) {
            // Swipe left
            setSpring(pan, -500, dy, onSwipeLeft);
            stopDefaultPage();
          }
        } else {
          console.log('处理点击');

          //   console.log('处理点击事件');
          //   // Return to original position
          //   // setSpring(pan, 0, 0, null);
          //   // setFlipped(false);
          //   // handleFlip();
        }
      },
    }),
  ).current;

  const stopDefaultPage = () => {
    setFlipped(false);
    deg.stopAnimation();
    opacity.stopAnimation();
    degB.stopAnimation();
    opacityB.stopAnimation();
    setDeg(new Animated.Value(0));
    setOpacity(new Animated.Value(1));
    setDegB(new Animated.Value(0));
    setOpacityB(new Animated.Value(1));
  };

  const handleFlip = () => {
    pan.stopAnimation();
    Animated.parallel([
      Animated.timing(deg, {
        toValue: flipped ? 0 : 180,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: flipped ? 1 : 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(degB, {
        toValue: !flipped ? 0 : 180,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacityB, {
        toValue: !flipped ? 1 : 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFlipped(!flipped);
    });
  };

  let degAni = deg.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  let degAniB = degB.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              {translateX: pan.x},
              {translateY: pan.y},
              {rotate: rotateCard},
            ],
          },
        ]}
        {...panResponder.panHandlers}>
        {!flipped ? (
          <Animated.View
            style={[
              {
                transform: [{rotateY: degAni}],
                opacity: opacity,
              },
            ]}>
            <View style={styles.cardBox}>
              <Text style={styles.text}>{cardData.question}</Text>
            </View>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              {
                transform: [{rotateY: degAniB}],
                opacity: opacityB,
              },
            ]}>
            <View style={styles.cardBox}>
              <Text style={styles.text}>{cardData.answer}</Text>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const SwipeableCards = ({data}: any) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the second card

  const handleSwipeLeft = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleSwipeRight = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    );
  };

  return (
    <SwipeCard
      cardData={data[currentIndex]}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    />
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    position: 'relative',
  },
  cardBox: {
    width: width - 32,
    height: 300,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SwipeableCards;
