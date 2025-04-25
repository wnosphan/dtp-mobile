import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { subscribe } from '../../api/subscribe';

export const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email của bạn');
      return;
    }

    try {
      setLoading(true);
      await subscribe(email);
      Alert.alert('Thành công', 'Cảm ơn bạn đã đăng ký nhận tin!');
      setEmail('');
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="py-12 px-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 text-center">
        Đăng Ký Nhận Tin
      </Text>
      <Text className="text-gray-600 mb-8 text-center">
        Nhận thông tin về các tour mới và ưu đãi hấp dẫn
      </Text>
      
      <View className="flex-row space-x-2">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Nhập email của bạn"
          keyboardType="email-address"
          autoCapitalize="none"
          className="flex-1 bg-white px-4 py-3 rounded-lg"
        />
        <TouchableOpacity
          onPress={handleSubscribe}
          disabled={loading}
          className="bg-primary px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">
            {loading ? 'Đang gửi...' : 'Đăng ký'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 