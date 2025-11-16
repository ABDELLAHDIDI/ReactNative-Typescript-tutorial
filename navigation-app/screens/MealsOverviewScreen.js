import { FlatList, StyleSheet, Text, View } from "react-native"
import { useEffect, useLayoutEffect } from "react";
import { CATEGORIES, MEALS } from "../data/dummay-data";
import { MealItem } from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";

 

export const MealsOverviewScreen = ({route , navigation }) => {
    const catId = route.params.categoryId ; 

    const displayedMeals = MEALS.filter((meal)=>{
        return meal.categoryIds.indexOf(catId) >=  0 ; 
    })
    const categoryTitle = CATEGORIES.find((item) => item.id === catId).title
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation, categoryTitle]);


   return <MealsList items={displayedMeals}/>
}


