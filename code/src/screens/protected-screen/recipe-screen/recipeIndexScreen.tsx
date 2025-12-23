import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { CameraType } from '../../../types/models';
import { OLYMPUS_RECIPES } from '../../../data/recipe';
import { RecipeType } from '../../../types/models/recipe/recipeType';

const RecipeIndexScreen = () => {
  // 1. 将数据转换为适合显示的格式（可选：如果你想按系列分组显示，可以对数据排序）
  const sortedData = useMemo(() => {
    return [...OLYMPUS_RECIPES];
  }, []);

  // 2. 渲染每一个相机卡片
  const renderItem = ({ item }: { item: RecipeType }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => console.log('Navigate to Detail:', item.Id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.authorText}>by {item.Author}</Text>
          <Text style={styles.modelName}>{item.Title}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: item.Visuals.ThemeColor }]}>
           <Text style={styles.badgeText}>{item.Settings.BaseProfile}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{item.Lore.Description}</Text>
      
      {/* Compatible Series */}
      <View style={styles.compatibleRow}>
        <Text style={styles.sectionLabel}>Compatible:</Text>
        <View style={styles.seriesTags}>
          {item.CompatibleSeries.map((series, index) => (
            <View key={index} style={styles.seriesTag}>
              <Text style={styles.seriesTagText}>{series}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Overview */}
      <View style={styles.specsRow}>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Saturation</Text>
          <Text style={styles.specValue}>{item.Settings.Saturation > 0 ? '+' : ''}{item.Settings.Saturation}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Contrast</Text>
          <Text style={styles.specValue}>{item.Settings.Contrast > 0 ? '+' : ''}{item.Settings.Contrast}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Sharpness</Text>
          <Text style={styles.specValue}>{item.Settings.Sharpness > 0 ? '+' : ''}{item.Settings.Sharpness}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Gradation</Text>
          <Text style={styles.specValue}>{item.Settings.Gradation}</Text>
        </View>
      </View>

      {/* Best Scenarios */}
      {item.Lore.BestScenarios && item.Lore.BestScenarios.length > 0 && (
        <View style={styles.scenariosRow}>
          <Text style={styles.scenarioLabel}>Best for: </Text>
          {item.Lore.BestScenarios.map((scenario, index) => (
            <Text key={index} style={styles.scenarioTag}>
              {scenario}{index < item.Lore.BestScenarios.length - 1 ? ' • ' : ''}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipe</Text>
        <Text style={styles.subtitle}>Discover the possibilities</Text>
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
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  authorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#007AFF', // 品牌蓝
    marginBottom: 4,
  },
  modelName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  compatibleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginRight: 8,
  },
  seriesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  seriesTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  seriesTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  specsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  specItem: {
    alignItems: 'center',
    flex: 1,
  },
  specLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  scenariosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  scenarioLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  scenarioTag: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default RecipeIndexScreen;