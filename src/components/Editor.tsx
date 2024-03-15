import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MarkdownEditor} from 'react-native-markdown-editor';

const MarkdownEditorCom = () => {
  return (
    <View style={styles.container}>
      <MarkdownEditor
        initialMarkdown="**Hello, world!**"
        style={styles.editor}
        onMarkdownChange={(markdown: any) => console.log(markdown)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
});

export default MarkdownEditorCom;
