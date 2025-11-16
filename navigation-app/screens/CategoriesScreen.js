import { FlatList, StyleSheet, View } from "react-native";
import { CATEGORIES } from "../data/dummay-data";
import CategoryGridTile from "../components/CategoryGridTile";


function CategoriesScreen({navigation}) {

    function renderCategoryItem(itemData) {

        function PressHandler() {
    navigation.navigate('MealsOverview' , {
        categoryId : itemData.item.id,
    })
        }
    
        return <CategoryGridTile
            onPressNavigation={PressHandler}
            title={itemData.item.title}
            color={itemData.item.color}
        />
    }

    
    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={item => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    )
}

export default CategoriesScreen;

const styles = StyleSheet.create({

})