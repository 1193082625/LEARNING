import {RouteProp} from '@react-navigation/native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getPracticesDetail} from '../api';
import {Button} from '@ant-design/react-native';
import Programming from '../components/practices/Programming';
import GapFilling from '../components/practices/GapFilling';
import ChoiceCom from '../components/practices/Choice';
import Essay from '../components/practices/Essay';

interface PracticeDetailData {
  _id: string;
  type: number;
  title: string;
  content: string;
  is_member: boolean;
  referenceAnswer: string;
  language: number;
  knowledgeTags: string[];
  create_time: string;
  codingProblem: codingProblem;
  choose_answer: answerItem[];
}
interface codingProblem {
  _id: string;
  language: number;
  timeLimit: number;
  otherTimeLimit: number;
  memoryLimit: number;
  otherMemoryLimit: number;
  questionId: string;
  inputDesc: string;
  outputDesc: string;
  inputSample: string;
  outputSample: string;
  samples: CodeSamples[];
  specialDataStructureStrs: string;
}
export interface CodeSamples {
  input: string;
  output: string;
  note: string;
}

interface answerItem {
  id: string;
  content: string;
}

type RootStackParamList = {
  PracticesDetail: {practicesId: string}; // 定义了 PracticesDetail 组件的参数类型为一个包含 id 属性的对象，id 的类型为 string
  // 其他路由配置
};

type PracticesDetailRouteProp = RouteProp<
  RootStackParamList,
  'PracticesDetail'
>;

type DetailsProps = PropsWithChildren<{
  route: PracticesDetailRouteProp;
  navigation: any;
  [key: string]: any;
}>;

enum PracticeTypes {
  SingleChoice,
  MultiChoice,
  GapFilling,
  Programming,
  Essay,
}

const types = ['单选题', '多选题', '填空题', '编程题', '问答题'];

const Detail = ({data, navigation, ...props}: any) => {
  let ContentCom: any;

  switch (data.type) {
    case PracticeTypes.SingleChoice:
      ContentCom = <ChoiceCom data={data} />;
      break;
    case PracticeTypes.MultiChoice:
      ContentCom = <ChoiceCom isMulti={true} data={data} />;
      break;
    case PracticeTypes.GapFilling:
      ContentCom = <GapFilling data={data} />;
      break;
    case PracticeTypes.Programming:
      ContentCom = <Programming data={data} />;
      break;
    case PracticeTypes.Essay:
      ContentCom = <Essay data={data} />;
      break;
  }

  return (
    <>
      <Text style={styles.tag}>{types[data.type]}</Text>
      <Text style={styles.title}>{data.title}</Text>
      {ContentCom}
      <View style={styles.btnGroup}>
        <Button style={styles.btnItem} onPress={() => {}}>
          上一题
        </Button>
        <Button
          type="primary"
          style={[styles.btnItem, styles.btnNext]}
          onPress={() => {}}>
          下一题
        </Button>
      </View>
    </>
  );
};

function PracticeDetails({route, navigation, ...props}: DetailsProps) {
  const {practicesId} = route.params;
  const [detail, setDetail] = useState<PracticeDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPracticesDetail(practicesId)
      .then(res => {
        console.log('试题详情', res.data);
        setDetail(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Detail data={detail} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#b0e0e6',
    color: '#48d1cc',
    width: 80,
    lineHeight: 24,
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  btnGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnItem: {
    width: 150,
    height: 36,
  },
  btnNext: {
    backgroundColor: '#48d1cc',
    color: '#fff',
    borderWidth: 0,
  },
});

export default PracticeDetails;
