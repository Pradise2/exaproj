import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc'; // Import twrnc

const HomePage = () => {
  return (
    <View style={tw`flex-1 bg-indigo-900 items-center justify-center p-4`}>
      <View style={tw`w-full max-w-md bg-white rounded-lg p-6 shadow-md`}>
        <View style={tw`items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Test</Text>
          <Text style={tw`text-lg text-gray-600`}>Educational Softwares</Text>
        </View>
        <View style={tw`items-center mb-4`}>
          <Image
            source={require('../images/futalogo.png')}
            style={tw`w-48 h-48 rounded-lg`}
          />
        </View>
        <TouchableOpacity
          style={tw`bg-indigo-800 rounded-lg py-3 mb-5 items-center`}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={tw`text-white text-lg`}>Register for Exam</Text>
        </TouchableOpacity>
        <View style={tw`items-center`}>
          <Text style={tw`text-gray-600 text-center`}>
            Already Registered?{' '}
            <Text
              style={tw`text-indigo-800`}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
          <Text style={tw`text-gray-600 text-center text-sm mt-2`}>
            By signing up, you agree to our{' '}
            <Text style={tw`text-indigo-800`}>terms and conditions</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
