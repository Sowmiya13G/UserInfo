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
import CustomButton from '../../../components/CustomButton/CustomButton';
import {styles} from './styles';

const FAQScreen = () => {
  const [formData, setFormData] = useState({
    qualityParameter: {
      foreignMatter: '',
    },
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

  const validateForm = () => {
    const newErrors = {...errors};

    if (!formData.qualityParameter.foreignMatter.trim()) {
      newErrors.foreignMatter = 'Please enter a value for the initial field';
    }

    formData.riskMitigation.forEach((item, index) => {
      if (!item.perceivedRisk.trim()) {
        newErrors.perceivedRisk =
          'Please enter values for Perceived Risk fields';
      }

      item.riskMitigantMeasure.forEach((measure, measureIndex) => {
        if (!measure.trim()) {
          newErrors.riskMitigantMeasure[index] =
            'Please enter values for all Risk Mitigant fields';
        }
      });
    });

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };
  const handleAddField = () => {
    if (!formData.qualityParameter.foreignMatter) {
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
    if (!formData.qualityParameter.foreignMatter) {
      setErrors({
        ...errors,
        foreignMatter: 'Please enter a value for the initial field',
      });
      return;
    }
    if (newLabel && newValue) {
      setFormData({
        ...formData,
        qualityParameter: {
          ...formData.qualityParameter,
          [newLabel]: newValue,
        },
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

  const handleLog = () => {
    console.log(JSON.stringify(formData));
  };
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form is valid. Submitting...');
    } else {
      console.log('Form is not valid. Please fill in all required fields.');
    }
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
            value={formData.qualityParameter.foreignMatter}
            onChangeText={text => {
              setFormData({
                ...formData,
                qualityParameter: {
                  ...formData.qualityParameter,
                  foreignMatter: text,
                },
              });
              setErrors({...errors, foreignMatter: ''});
            }}
            placeholder="Foreign Matter"
            style={styles.view}
          />
          <Text style={styles.error}>{errors.foreignMatter}</Text>
        </View>
        <View>
          {Object.entries(formData.qualityParameter)
            .slice(1)
            .filter(([label, value]) => label !== 'riskMitigation')
            .map(([label, value]) => (
              <View key={label} style={{marginBottom: 10}}>
                <Text style={styles.text}>{label}:</Text>
                <CustomInput
                  label="Value"
                  value={value}
                  onChangeText={text => {
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      qualityParameter: {
                        ...prevFormData.qualityParameter,
                        [label]: text,
                      },
                    }));
                  }}
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
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity onPress={addNewPerceivedRisk}>
          <Text style={styles.text}>+Add perceivedRisk</Text>
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <CustomButton optionButton label="LOG" handlePress={handleLog} />

          <CustomButton
            logInButton
            label="SUBMIT"
            handlePress={() => handleSubmit()}
          />
        </View>
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
