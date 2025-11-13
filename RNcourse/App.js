import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View ,Button , ScrollView , FlatList} from 'react-native';
import { TextInput } from 'react-native';

import GoalItem from './components/GoalItem';
import GolaInput from './components/GoalInput';

export default function App() {
  const [courseGoals , setCourseGoals] = useState([])
  const [modalIsVisible , setModalIsVisible] = useState(false)
 
  function addGoalHandler(enteredGoalText) {
    if(!enteredGoalText) {
      alert('You should enter your goal !!!')
      return ;} 
    console.log("---------------------------------------------------\n ");
    console.log(enteredGoalText);
    // setCourseGoals([...courseGoals , enteredGoalText])  // Works good
    setCourseGoals(CurrentCourseGoals => [
      ...CurrentCourseGoals ,
       {text : enteredGoalText , id : Math.random().toString()}
      ])  // Better 

      endAddGoalHandler()
  }

  function deleteGoalHandler(id){
    console.log("DELETE ");
    setCourseGoals(CurrentCourseGoals =>{
      return CurrentCourseGoals.filter((elt) => elt.id !== id)
    })
}
function startAddGoalHandler(){
  setModalIsVisible(true)
}

function endAddGoalHandler(){
  setModalIsVisible(false)
}


  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer} >
      <Button 
      title='Add New Goal' 
      color="#5e0acc"
      onPress={startAddGoalHandler}
      />
      <GolaInput  
      visible={modalIsVisible}
      onAddGoal = {addGoalHandler} 
      onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
     {/* <ScrollView>
         {courseGoals.map((goal , id) => 
         <View  key={id} style={styles.goalsInList} >
         <Text
          style={styles.goalsText} 
           >{goal}</Text> 
           </View>
           )}
      </ScrollView>*/}
      <FlatList 
      data = {courseGoals} 
      renderItem={elt => {
        return (
        <GoalItem  
        text={elt.item.text}
        onDeleteItem = {deleteGoalHandler}
        id={elt.item.id}
        />
        )}}
        keyExtractor={(item , index ) => item.id}
      />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer : {
    flex : 1,
    padding: 50 , 
    paddingHorizontal: 16,
   
  },
  goalsContainer : {
    flex : 10,
  },


});
