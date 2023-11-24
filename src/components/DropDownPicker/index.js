import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import dataJSON from '../../../data.json';
import {useDispatch} from 'react-redux';
import {setSelectedUnitAction} from '../../redux/actions/medAction';

const DropdownPicker = ({selectedUnit, setSelectedUnit}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('cm');

  const options = dataJSON.questions[0].options.map(option => ({
    label: option,
    value: option,
  }));

  const handleValueChange = item => {
    console.log('Selected Item:', item);
    setValue(item.value);
    const data = dispatch(setSelectedUnitAction(item.value));
    console.log('data', data);
  };

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        style={{
          backgroundColor: 'white',
          borderColor: 'white',
          width: widthPercentageToDP('22%'),
          height: 53,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 2,
            },
            android: {
              elevation: 4,
            },
          }),
        }}
        textStyle={{color: '#000', fontSize: 12}}
        dropDownContainerStyle={{
          backgroundColor: '#fff',
          borderWidth: 0,
          width: widthPercentageToDP('22%'),
        }}
        onChangeItem={handleValueChange}
      />
    </View>
  );
};

export default DropdownPicker;
