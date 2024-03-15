import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useUserStore} from '../store/user';
import {post} from '../api/fetchServer';
import {Toast} from '@ant-design/react-native';
import {debounce} from 'lodash';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useUserStore(state => state.login);

  //通过useSelector直接拿到store中定义的value
  // const {value} = useSelector((store)=>store.counter)

  const handleLogin = debounce(async () => {
    // 发送登录请求到后端服务器
    const {code, data, msg} = await post('/auth/login', {
      username,
      password,
    });
    console.log('登录', data);
    if (code === 0) {
      const {userName, userId, token} = data;
      login({
        userId,
        userName,
        token,
      });
    } else {
      Toast.info(`登录失败: ${msg}`);
    }
  }, 1000);

  const handleThirdPartyLogin = (provider: string) => {
    // 使用第三方登录SDK或OAuth认证流程
    console.log(`使用${provider}登录`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleThirdPartyLogin('Google')}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleThirdPartyLogin('Facebook')}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
