import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import { getBiometricData, checkBiometricData } from './biometricService'; // Hypothetical biometric service methods
import { firestore } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const Register = () => {
  const [username, setUsername] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [biometricsVerified, setBiometricsVerified] = useState(false);
  const [biometricData, setBiometricData] = useState('');

  const handleBiometrics = async () => {
    try {
      const result = await getBiometricData(); // Hypothetical function to get biometric data
      if (result.success) {
        setBiometricData(result.data);
        setBiometricsVerified(true);
        Alert.alert('Authentication Successful');
      } else {
        Alert.alert('Authentication Failed');
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      Alert.alert('Error', `Authentication failed: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    if (username && matricNumber && biometricsVerified && biometricData) {
      try {
        // Reference to the document with matricNumber as the ID
        const docRef = doc(firestore, 'students', matricNumber);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          Alert.alert('Error', 'Matric number already registered.');
          return;
        }
  
        // Check if the biometric data already exists
        const exists = await checkBiometricData(biometricData);
  
        if (exists) {
          Alert.alert('Error', 'Biometric data already registered.');
          return;
        }
  
        // Set the document with matricNumber as the ID
        await setDoc(docRef, {
          biometricId: biometricData,
          biometricsVerified,
          matricNumber,
          username,
        });
        console.log('Biometric Data:', biometricData);
console.log('Username:', username);
console.log('Matric Number:', matricNumber);

  
        Alert.alert('Registration Successful');
        // Optionally reset fields here
        setUsername('');
        setMatricNumber('');
        setBiometricsVerified(false);
        setBiometricData('');
      } catch (error) {
        console.error('Error registering student:', error);
        Alert.alert('Error', `Registration failed: ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Please complete all fields and verify with biometrics');
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center`}>
      <Image
        source={require('../images/futalogo.png')}
        style={tw`h-40 w-50 mb-3 mt-2`}
      />
      <Text style={tw`text-2xl mb-7 font-bold text-gray-800`}>User Registration</Text>
      <View style={tw`w-60%`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      <View style={tw`w-60% mt-3`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Matric Number</Text>
        <TextInput
          value={matricNumber}
          onChangeText={setMatricNumber}
          placeholder="Enter your Matric Number"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-indigo-800 rounded-lg py-3 mt-4 w-60% flex-row items-center justify-center`}
        onPress={handleBiometrics}
      >
        <Image
          source={{ uri: 'https://openui.fly.dev/openui/24x24.svg?text=🔐' }}
          style={tw`w-6 h-6 mr-2`}
        />
        <Text style={tw`text-white text-lg`}>Authenticate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-gray-800 rounded-lg py-3 mt-10 w-47% flex-row items-center justify-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-lg`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
