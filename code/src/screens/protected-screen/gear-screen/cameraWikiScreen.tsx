import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { OLYMPUS_CAMERAS } from '../../../data';
import { CameraType } from '../../../types/models';

const CameraWikiScreen = () => {
  // 1. 将数据转换为适合显示的格式（可选：如果你想按系列分组显示，可以对数据排序）
  const sortedData = useMemo(() => {
    return [...OLYMPUS_CAMERAS].sort((a, b) => a.Series.localeCompare(b.Series));
  }, []);

  // 2. 渲染每一个相机卡片
  const renderItem = ({ item }: { item: CameraType }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => console.log('Navigate to Detail:', item.Id)}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.seriesText}>{item.Series}</Text>
          <Text style={styles.modelName}>{item.ModelName}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: item.VisualAssets.PrimaryColor }]}>
           <Text style={styles.badgeText}>{item.CoreSpecs.Sensor.Megapixels}MP</Text>
        </View>
      </View>
      
      <Text style={styles.nickname}>{item.Lore.Nickname}</Text>
      
      <View style={styles.specsRow}>
        <Text style={styles.specItem}>📸 {item.CoreSpecs.Sensor.Type}</Text>
        <Text style={styles.specItem}>✋ {item.CoreSpecs.StabilizationStops} Stops</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Camera Wiki</Text>
        <Text style={styles.subtitle}>Discover the M43 Heritage</Text>
      </View>

      <FlashList
        data={sortedData}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    // 阴影效果
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  seriesText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF', // 品牌蓝
    marginBottom: 2,
  },
  modelName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 8,
    marginBottom: 12,
  },
  specsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  specItem: {
    fontSize: 12,
    color: '#888',
    marginRight: 15,
  },
});

export default CameraWikiScreen;