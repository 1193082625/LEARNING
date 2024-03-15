import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MarkdownEditorCom from '../Editor';
import HTML from 'react-native-render-html';
import {CodeSamples} from '../../views/PracticeDetail';

// language -1:c/c++
const CodeDemo = ({data}: any) => {
  return (
    <>
      {data.map((item: CodeSamples, index: number) => {
        return (
          <View key={index}>
            <Text>输入示例：</Text>
            <View>
              <HTML source={{html: item.input}} />
            </View>
            <Text>输出示例：</Text>
            <View>
              <HTML source={{html: item.output}} />
            </View>
            <Text>示例说明：</Text>
            <HTML source={{html: item.note}} />
          </View>
        );
      })}
    </>
  );
};

const Programming = ({data}: any) => {
  const {title, content, codeingProblem} = data;
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <View>
        <Text>
          时间限制: {codeingProblem.language} {codeingProblem.timeLimit}
          秒，其他语言{codeingProblem.otherTimeLimit}
        </Text>
        <Text>
          空间限制: {codeingProblem.language} {codeingProblem.memoryLimit}
          M，其他语言{codeingProblem.otherMemoryLimit}M
        </Text>
      </View>
      <Text>输入描述：</Text>
      <View>
        <HTML source={{html: codeingProblem.inputDesc}} />
      </View>
      <Text>输出描述：</Text>
      <View>
        <HTML source={{html: codeingProblem.outputDesc}} />
      </View>
      <CodeDemo data={codeingProblem.samples} />
      <MarkdownEditorCom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Programming;
