import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {onboardingData} from '../../constants/onBoardingData';
import {styles} from './styles';
import {Background} from '../../components/Background/Background';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const {width} = Dimensions.get('window');
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const handleNextSlide = () => {
    if (currentPage < onboardingData.length - 1 && flatListRef.current) {
      setCurrentPage(currentPage + 1);
      flatListRef.current.scrollToIndex({index: currentPage + 1});
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      {currentPage < onboardingData.length && (
        <TouchableOpacity onPress={handleNextSlide} style={styles.skipView}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      )}
      <View style={styles.data}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{width, height: '100%'}}>
              <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
          onMomentumScrollEnd={event => {
            const indexOfNextScreen = Math.floor(
              event.nativeEvent.contentOffset.x / width,
            );
            setCurrentPage(indexOfNextScreen);
          }}
        />
        {currentPage < onboardingData.length && (
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentPage ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton
            logInButton
            label="CONTINUE"
            handlePress={handleNextSlide}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
