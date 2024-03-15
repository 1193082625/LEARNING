/**
 * fetch 请求封装，包含请求拦截与模拟数据
 * fetch规范：
 *  仅当网络故障或请求被阻止时，http状态码才会标记为reject
 *  fetch不会发送跨域cookie，除非使用了credentials的初始化选项
 * fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
 * fetch默认不会带cookie，需要添加配置项
 * fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
 * fetch没有办法原生监测请求的进度，而XHR可以
 */
import {Toast} from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../..';
import {useUserStore} from '../store/user';

interface UserStateData {
  isLogin: boolean;
  token: string;
}

const checkStatus = (res: any) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  if ([401, 403].includes(res.status)) {
    AsyncStorage.clear();
    useUserStore.getState().logout();
    return Promise.reject({
      code: res.status,
      data: null,
    });
  }
  console.log(`网络请求失败,${res.status}`);
  const error: any = new Error(res.statusText);
  error.response = error;
  throw error;
};

/**
 * 捕获成功登录过去状态码
 */
const judgeOkState = async (res: any) => {
  const cloneRes = await res.clone().json();

  //TODO:可以在这里管控全局请求
  if (!!cloneRes.code && cloneRes.code !== 200) {
    Toast.info(`${cloneRes.msg}${cloneRes.code}`);
  }
  return res;
};

/**
 * 捕获失败
 * @param error
 */
const handleError = (error: any) => {
  if (error instanceof TypeError) {
    console.log(`网络请求失败啦！${error}`);
  }
  if (error?.code) {
    return Promise.reject(error);
  }
  return {
    //防止页面崩溃，因为每个接口都有判断res.code以及data
    code: -1,
    data: false,
  };
};

interface FetchConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  [key: string]: any;
}

class FetchRequest {
  /**
   *静态的fetch请求通用方法
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  static async staticFetch(url = '', options: FetchConfig = {}) {
    const _url = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const defaultOptions: any = {
      /*允许携带cookies*/
      // credentials: 'include',
      /*允许跨域**/
      mode: 'cors',
      headers: {
        Authorization: null,
      },
      timeout: 5000,
    };
    if (options?.method === 'POST' || 'PUT') {
      defaultOptions.headers['Content-Type'] =
        'application/json; charset=utf-8';
    }

    if (['/auth/login', '/auth/register'].includes(url)) {
      const newOptions: any = {...defaultOptions, ...options};
      return fetch(_url, newOptions)
        .then(checkStatus)
        .then(judgeOkState)
        .then(res => res.json())
        .catch(handleError);
    }

    const {isLogin, token} = await FetchRequest.getStorage();
    if (isLogin) {
      defaultOptions.headers.Authorization = `bearer ${token}`;
      const newOptions: any = {...defaultOptions, ...options};
      return fetch(_url, newOptions)
        .then(checkStatus)
        .then(judgeOkState)
        .then(async (res: any) => res.json())
        .catch(handleError);
    } else {
      return {
        code: 401,
        data: null,
      };
    }
  }

  static getStorage(): Promise<UserStateData> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('user-storage', (err, session) => {
        if (err) {
          reject({
            isLogin: false,
            token: '',
          });
        } else {
          resolve(JSON.parse(session as any).state);
        }
      });
    });
  }

  /**
   *post请求方式
   * @param url
   * @returns {Promise<unknown>}
   */
  post(url: string | undefined, params = {}, option = {}) {
    const options: any = Object.assign(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      option,
    );
    //一般我们常用场景用的是json，所以需要在headers加Content-Type类型
    options.body = JSON.stringify(params);

    //可以是上传键值对形式，也可以是文件，使用append创造键值对数据
    if (options.type === 'FormData' && options.body !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let params = new FormData();
      for (let key of Object.keys(options.body)) {
        params.append(key, options.body[key]);
      }
      options.body = params;
    }
    return FetchRequest.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }

  /**
   * patch方法
   * @param url
   * @returns {Promise<unknown>}
   */
  patch(url: string, params = {}, option = {}) {
    const options: any = Object.assign(
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      option,
    );
    options.body = JSON.stringify(params);
    return FetchRequest.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }

  /**
   * get请求方式
   * @param url
   * @param option
   */
  get(url: string | undefined, option: FetchConfig = {}) {
    const options = Object.assign({method: 'GET'}, option);
    return FetchRequest.staticFetch(url, options);
  }
}

const requestFun = new FetchRequest(); //new生成实例
export const {post, get, patch} = requestFun;
export default requestFun;
