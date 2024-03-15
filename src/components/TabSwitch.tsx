import React, { PropsWithChildren, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TabItem = {
  id: string;
  name: string;
};

type TabSwitchProps = PropsWithChildren<{
  tabs: TabItem[];
  initialTab: TabItem | null;
  onChange: Function;
}>

const TabSwitch = ({tabs, initialTab, onChange}: TabSwitchProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: TabItem) => {
    setActiveTab(tab);
    onChange && onChange(tab);
  };
  
  return (
    <View style={styles.container}>
    <FlatList
      data={tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab?.id === item.id ? styles.activeTab : null,
          ]}
          onPress={() => handleTabChange(item)}>
          <Text style={styles.tabText}>{item.name}</Text>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  tabItem: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default TabSwitch;