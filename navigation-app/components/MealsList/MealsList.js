import { FlatList, StyleSheet, View } from "react-native";
import { MealItem } from "./MealItem";
import { useNavigation } from "@react-navigation/native";


export default function MealsList({items}) {
    const navigation =useNavigation()
    function renderMealItem (itemData){
        const item = itemData.item ; 
        function pressMealHandler(){
            navigation.navigate('MealDetails' , {
                mealId : item.id
            })
        }
        const mealItemProps = {
            id : item.id,
            title : item.title , 
            imageUrl : item.imageUrl , 
            affordability : item.affordability , 
            complexity : item.complexity , 
            duration : item.duration,
            onPressMeal : pressMealHandler,
        }
   return <MealItem {...mealItemProps}/>
    }
  return (
    <View style={styles.container}> 
         <FlatList
         data={items} 
         keyExtractor={item => item.id} 
         renderItem={renderMealItem}
         /> 
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1 , 
        padding : 16
    }
    })
