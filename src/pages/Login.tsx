import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {useUserStore} from '../store/user';
import {post} from '../api/fetchServer';
import {Checkbox, Toast} from '@ant-design/react-native';
import {debounce} from 'lodash';
import commonStyles from '../assets/styles/common';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remberme, setRemberme] = useState(true);
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

  const registerHandle = () => {
    console.log('注册账号');
  };

  return (
    <ImageBackground
      source={require('../assets/imgs/bg.svg')} // 请将路径替换为你的 SVG 图片路径
      style={styles.imageBackground}>
      <Image style={styles.logo} source={require('../assets/imgs/logo.png')} />
      <TextInput
        style={styles.input}
        placeholder="E-mail address or phone number"
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
      <View
        style={[styles.btmBox, commonStyles.flexRow, commonStyles.jutBetween]}>
        <Checkbox
          onChange={(e: any) => setRemberme(e.target.checked)}
          checked={remberme}>
          记住我
        </Checkbox>
        <Text style={commonStyles.primaryColor}>忘记密码?</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, commonStyles.themeBgColor]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => handleThirdPartyLogin('Google')}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleThirdPartyLogin('Facebook')}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // 或者 'contain'
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 60,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
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
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  btmBox: {
    width: width - 46,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default LoginScreen;
