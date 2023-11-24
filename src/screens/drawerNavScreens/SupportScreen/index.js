import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {BarChart, PieChart, LineChart} from 'react-native-chart-kit';
import theme from '../../../constants/theme';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import {styles} from './styles';
import {Background} from '../../../components/Background/Background';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SupportScreen = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  //handle Add Data
  const handleAddData = () => {
    if (!name || !age) {
      alert('Please enter both name and age.');
      return;
    }
    const newData = [...data, {name, age: parseInt(age, 10)}];
    setData(newData);
    console.log(newData);
    setName('');
    setAge('');
  };

  //handle Remove Data
  const handleRemoveThirdItem = () => {
    if (data.length >= 3) {
      const newData = [...data.slice(0, 2), ...data.slice(3)];
      console.log(newData);
      setData(newData);
    } else {
      alert('There are less than three items in the data array.');
    }
  };

  //Shift Items
  const shiftItems = () => {
    if (data.length >= 3) {
      const newData = [...data];
      newData.shift();
      newData.shift();
      newData.shift();
      console.log(newData);
      setData(newData);
    } else {
      alert('There are less than three items in the data array.');
    }
  };

  //unShift Items
  const unShiftItems = () => {
    const newItem1 = {name: 'May', age: 25};
    const newItem2 = {name: 'June', age: 30};

    const newData = [newItem1, newItem2, ...data];
    console.log(newData);
    setData(newData);
  };

  //Rearrange Items
  const rearrangeItems = () => {
    if (data.length > 0) {
      const newData = [...data];

      const isAscending = newData[0].age < newData[1].age;

      newData.sort((a, b) => {
        if (isAscending) {
          return a.age - b.age;
        } else {
          return b.age - a.age;
        }
      });

      console.log(newData);
      setData(newData);
    } else {
      alert('No data available for rearrangement.');
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      <ScrollView>
        <View style={styles.feilds}>
          <Text style={styles.text}>Enter Data:</Text>
          <CustomInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <CustomInput
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={text => setAge(text)}
          />
          <TouchableOpacity
            onPress={() => handleAddData()}
            style={styles.button}>
            <Text style={styles.buttonText}>Add Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveThirdItem}
            style={styles.button}>
            <Text style={styles.buttonText}>Remove Third Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={unShiftItems} style={styles.button}>
            <Text style={styles.buttonText}>Shift Items</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shiftItems} style={styles.button}>
            <Text style={styles.buttonText}>Unshift Items</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={rearrangeItems} style={styles.button}>
            <Text style={styles.buttonText}>Rearrange Items</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chart}>
          {data.length > 0 ? (
            <>
              <BarChart
                data={{
                  labels: data.map(item => item.name),
                  datasets: [{data: data.map(item => item.age)}],
                }}
                width={theme.screenWidth}
                height={200}
                style={{padding: 5, paddingLeft: 5, alignSelf: 'center'}}
                yAxisLabel="Age"
                chartConfig={{
                  backgroundGradientFrom: theme.backgroundColor.white,
                  backgroundGradientTo: theme.backgroundColor.gray,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
              />

              <PieChart
                data={data.map((item, index) => ({
                  name: item.name,
                  population: item.age,
                  color: `rgba(${index * 20}, ${index * 40}, ${index * 60}, 1)`,
                }))}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: theme.backgroundColor.white,
                  backgroundGradientTo: theme.backgroundColor.white,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForLabels: {
                    fontSize: 16,
                  },
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="25"
                extras={[0, 0, 0.2]}
              />
              <LineChart
                data={{
                  labels: data.map(item => item.name),
                  datasets: [{data: data.map(item => item.age)}],
                }}
                width={widthPercentageToDP('95%')}
                height={heightPercentageToDP('30%')}
                yAxisLabel="Age"
                chartConfig={{
                  backgroundGradientFrom: theme.backgroundColor.white,
                  backgroundGradientTo: theme.backgroundColor.lightCyne,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </>
          ) : (
            <Text style={styles.text}>No data available for charts.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SupportScreen;
