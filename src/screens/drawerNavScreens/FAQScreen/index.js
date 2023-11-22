import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Background} from '../../../components/Background/Background';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import {styles} from './styles';

const FAQScreen = () => {
  const [formData, setFormData] = useState({
    foreignMatter: '',
    riskMitigation: [
      {
        perceivedRisk: '',
        riskMitigantMeasure: [''],
      },
    ],
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [errors, setErrors] = useState({
    foreignMatter: '',
    perceivedRisk: '',
    riskMitigantMeasure: [''],
  });
  const handleAddField = () => {
    if (!formData.foreignMatter) {
      setErrors({
        ...errors,
        foreignMatter: 'Please enter a value for the initial field',
      });
      return;
    }
    setModalVisible(true);
    setErrors({...errors, foreignMatter: ''});
  };

  const handleModalConfirm = () => {
    if (!formData.foreignMatter) {
      setErrors({
        ...errors,
        foreignMatter: 'Please enter a value for the initial field',
      });
      return;
    }
    if (newLabel && newValue) {
      setFormData({
        ...formData,
        [newLabel]: newValue,
      });

      setModalVisible(false);

      setNewLabel('');
      setNewValue('');
      setErrors({...errors, foreignMatter: ''});
    } else {
      setErrors({
        ...errors,
        foreignMatter: 'Please enter both label and value',
      });
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setErrors({...errors, foreignMatter: ''});
  };

  const addNewPerceivedRisk = () => {
    if (
      !formData.riskMitigation.every(item => item.perceivedRisk.trim() !== '')
    ) {
      setErrors({
        ...errors,
        perceivedRisk: 'Please enter values for Perceived Risk fields',
      });
      alert('Please enter values for all Perceived Risk fields');
      return;
    }

    setFormData({
      ...formData,
      riskMitigation: [
        ...formData.riskMitigation,
        {perceivedRisk: '', riskMitigantMeasure: ['']},
      ],
    });
  };

  const addNewRiskMitigant = index => {
    if (
      !formData.riskMitigation[index].riskMitigantMeasure.every(
        value => value.trim() !== '',
      )
    ) {
      setErrors({
        ...errors,
        riskMitigantMeasure: [
          ...errors.riskMitigantMeasure.slice(0, index),
          'Please enter values for all Risk Mitigant fields',
          ...errors.riskMitigantMeasure.slice(index + 1),
        ],
      });
      alert('Please enter values of Risk Mitigant fields');
      return;
    }

    const updatedRiskMitigation = [...formData.riskMitigation];
    updatedRiskMitigation[index].riskMitigantMeasure.push('');
    setFormData({
      ...formData,
      riskMitigation: updatedRiskMitigation,
    });
    setErrors({
      ...errors,
      riskMitigantMeasure: [
        ...errors.riskMitigantMeasure.slice(0, index + 1),
        '',
        ...errors.riskMitigantMeasure.slice(index + 2),
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Background />
      <ScrollView>
        <View style={styles.foreignMatter}>
          <TouchableOpacity onPress={handleAddField} style={styles.addButton}>
            <Text style={styles.text}>+Add Field</Text>
          </TouchableOpacity>
          <Text style={styles.text}>foreignMatter</Text>
          <CustomInput
            value={formData.foreignMatter}
            onChangeText={text => {
              setFormData({...formData, foreignMatter: text});
              setErrors({...errors, foreignMatter: ''});
            }}
            placeholder="Foreign Matter"
            style={styles.view}
          />
          <Text style={styles.error}>{errors.foreignMatter}</Text>
        </View>
        <View>
          {Object.entries(formData)
            .slice(1)
            .filter(([label, value]) => label !== 'riskMitigation')
            .map(([label, value]) => (
              <View key={label} style={{marginBottom: 10}}>
                <Text style={styles.text}>{label}:</Text>
                <CustomInput
                  label="Value"
                  value={value}
                  style={{borderWidth: 1}}
                />
              </View>
            ))}
        </View>
        <Text style={styles.text}>Risk Mitigation</Text>
        {formData.riskMitigation.map((item, index) => (
          <View key={index}>
            <Text style={styles.text}>Perceived Risk</Text>
            <CustomInput
              placeholder="Perceived Risk"
              value={item.perceivedRisk}
              onChangeText={text => {
                const updatedRiskMitigation = [...formData.riskMitigation];
                updatedRiskMitigation[index].perceivedRisk = text;
                setFormData({
                  ...formData,
                  riskMitigation: updatedRiskMitigation,
                });
                setErrors({...errors, perceivedRisk: ''});
              }}
              style={styles.view}
            />
            {/* <Text style={styles.error}>{errors.perceivedRisk}</Text> */}

            <TouchableOpacity
              onPress={() => addNewRiskMitigant(index)}
              style={styles.addButton}>
              <Text style={styles.text}>+Add riskMitigant</Text>
            </TouchableOpacity>

            {item.riskMitigantMeasure.map((measure, measureIndex) => (
              <View key={measureIndex}>
                <Text style={styles.text}>Risk Mitigant Measure</Text>
                <CustomInput
                  placeholder={`Risk Mitigant Measure ${measureIndex + 1}`}
                  value={measure}
                  onChangeText={text => {
                    const updatedRiskMitigation = [...formData.riskMitigation];
                    updatedRiskMitigation[index].riskMitigantMeasure[
                      measureIndex
                    ] = text;
                    setFormData({
                      ...formData,
                      riskMitigation: updatedRiskMitigation,
                    });
                    setErrors({
                      ...errors,
                      riskMitigantMeasure: [
                        ...errors.riskMitigantMeasure.slice(0, index + 1),
                        '',
                        ...errors.riskMitigantMeasure.slice(index + 2),
                      ],
                    });
                  }}
                  style={styles.view}
                />
                {/* <Text style={styles.error}>
                  {errors.riskMitigantMeasure[index]}
                </Text> */}
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity onPress={addNewPerceivedRisk}>
          <Text style={styles.text}>+Add perceivedRisk</Text>
        </TouchableOpacity>
      </ScrollView>

      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.8}
          style={styles.container}>
          <Background />
          <View style={styles.modalView}>
            <Text style={styles.text}>Enter Label</Text>
            <CustomInput
              label="Label"
              value={newLabel}
              onChangeText={text => setNewLabel(text)}
            />
            <Text style={styles.text}>Enter Value</Text>

            <CustomInput
              label="Value"
              value={newValue}
              onChangeText={text => setNewValue(text)}
            />
            <Text style={styles.error}>{errors.foreignMatter}</Text>
            <View style={styles.buttons}>
              <Button title="Confirm" onPress={handleModalConfirm} />
              <Button title="Cancel" onPress={handleModalCancel} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FAQScreen;
