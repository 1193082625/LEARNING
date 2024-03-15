import {get, post} from './fetchServer';

// 首页 获取摘抄
export const getSentences = () => {
  return get('/sentences');
};

// 获取文章分类
export const getArticlesCategoriesData = () => {
  return get('/articles-categories');
};

// 获取文章列表
export const getArticlesData = (category?: string) => {
  const url = category ? `/articles?categoryId=${category}` : '/articles';
  return get(url);
};

// 获取文章详情
export const getArticleDetail = (articleId: string) => {
  return get(`/articles/${articleId}`);
};

// 获取试题列表
export const getPractices = () => {
  return get('/practices');
};

// 获取试题详情
export const getPracticesDetail = (id: string) => {
  return get(`/practices/${id}`);
};

// 问题反馈
export const sendFeedback = (params: any) => {
  console.log('提交反馈', params);
  return post('/feedback', params);
};
