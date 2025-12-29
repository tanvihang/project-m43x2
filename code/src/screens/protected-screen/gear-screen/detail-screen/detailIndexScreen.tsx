import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { M43x2RouteParams } from '../../../../navigation/routes';
import { GearCategoryEnum } from '../../../../types/enums';
// Import your data source
// import { cameras } from '../../../../data/gear-wiki/cameras';

const DetailIndexScreen = () => {

  const { id, category } = useLocalSearchParams<M43x2RouteParams['gearDetail']>();

  // Fetch/lookup the item using the id
  const item = useMemo(() => {
    if (!id) return null;
    
    // TODO: Replace with your actual data lookup logic
    // For cameras: return cameras.find(camera => camera.Id === id);
    // For lens: return lenses.find(lens => lens.Id === id);
    
    return null;
  }, [id]);

  const renderItem = () => {
    if (!item) return <Text>Item not found</Text>;
    
    switch (category) {
      case GearCategoryEnum.CAMERA: 
        return <Text>Camera details coming soon</Text>;
      case GearCategoryEnum.LENS:
        return <Text>Lens details coming soon</Text>;
      default:
        return null;
    }
  }


  return (
    <View>
      <Text>DetailIndexScreen {id}</Text>
      {renderItem()}
    </View>
  )
}

export default DetailIndexScreen