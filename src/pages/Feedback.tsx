import {Button, Tag, TextareaItem, View} from '@ant-design/react-native';
import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {sendFeedback} from '../api';

type FeedbackProps = PropsWithChildren<{
  navigation: any;
}>;

const types = ['推荐', '题库', '发现', '搜索', '其他'];

function Feedback({navigation}: FeedbackProps) {
  const [feedbackType, setFeedbackType] = useState<number>(0);
  const [feedbackContent, setFeedbackContent] = useState('');

  const submitData = () => {
    console.log('提交表单', feedbackType, feedbackContent);
    sendFeedback({
      type: feedbackType,
      content: feedbackContent,
    })
      .then(res => {
        console.log(res.data);
        if ((res.data.code = 200)) {
          navigation.back();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>反馈类型</Text>
      <View style={styles.types}>
        {types.map((item, idx) => {
          return (
            <Tag
              key={idx}
              selected={idx === feedbackType}
              onChange={() => setFeedbackType(idx)}>
              {item}
            </Tag>
          );
        })}
      </View>
      <Text style={styles.sectionTitle}>反馈内容</Text>
      <TextareaItem
        style={styles.feedbackCont}
        onChange={(val: any) => setFeedbackContent(val)}
        rows={6}
        placeholder="请输入300字以内的问题反馈"
        count={300}
      />
      <Button type="primary" style={styles.submit} onPress={submitData}>
        提交反馈
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 0,
  },
  types: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 26,
    marginTop: 16,
    marginBottom: 8,
  },
  feedbackCont: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 8,
    fontSize: 14,
  },
  submit: {
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});

export default Feedback;
