import * as React from 'react';
import {useWindowDimensions, ScrollView, Text, View, Image} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import theme from '../../../constants/theme';
import UserCard from '../../../components/UserCard/UserCard';
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Background} from '../../../components/Background/Background';
import {styles} from './styles';
import commonImagePath from '../../../constants/images';
import strings from '../../../constants/strings';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
const FirstRoute = () => (
  <ScrollView style={styles.tabContent}>
    <UserCard />
    <UserCard />
    <UserCard />
    <UserCard />
  </ScrollView>
);
const SecondRoute = () => (
  <ScrollView style={styles.tabContent}>
    <UserCard />
  </ScrollView>
);
const ThirdRoute = () => (
  <ScrollView style={styles.tabContent}>
    <UserCard />
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function TabViewScreen() {
  const navigation = useNavigation();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Active'},
    {key: 'third', title: 'Inactive'},
  ]);
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onEnd: (_, context) => {
      const newIndex = Math.round(-context.translationX / layout.width);
      setIndex(newIndex);
      translateX.value = withSpring(newIndex * layout.width);
    },
    onStart: (_, context) => {
      context.translationX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.translationX + event.translationX;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const renderTabBar = props => (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={true}>
      <Animated.View style={[styles.tabBar, animatedStyle]}>
        <TabBar
          {...props}
          renderLabel={({route, focused, color}) => {
            const tabBackgroundColor = focused ? 'black' : 'transparent';
            return (
              <View style={styles.tabView}>
                <Animated.View
                  style={{
                    backgroundColor: tabBackgroundColor,
                    borderRadius: 20,
                    position: 'absolute',
                    zIndex: -1,
                    paddingRight: 35,
                    paddingLeft: 35,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? theme.fontColors.white
                      : theme.fontColors.black,
                    zIndex: 1,
                  }}>
                  {route.title}
                </Text>
              </View>
            );
          }}
          style={styles.tabBar}
          indicatorStyle={{height: 0}}
          activeColor="black"
        />
      </Animated.View>
    </PanGestureHandler>
  );

  const openNotifications = () => {
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <View style={styles.option}>
          <Icon name="chevron-left" size={15} color={theme.fontColors.black} />
          <Image source={commonImagePath.logo} style={styles.logo} />
        </View>
        <Text style={styles.title}> {strings.clientDetails}</Text>
        <TouchableOpacity onPress={openNotifications}>
          <Icon name="bell-o" size={15} color={theme.fontColors.black} />
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
