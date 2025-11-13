import { StyleSheet, View , Text , Pressable } from "react-native";
function GoalItem( props ){


 
 return (  
 
 <View style={styles.goalsInList}> 
 <Pressable 
 onPress={props.onDeleteItem.bind(this, props.id)}
 android_ripple={{color : 'white'}}
 style =  {({pressed}) => pressed && styles.pressedItem }
 >
    <Text
  style={styles.goalsText} 
   >{props.text}</Text> 
     </Pressable>
  </View>

  )}


export default GoalItem ; 


const styles = StyleSheet.create({
    goalsInList : {
      
        margin : 2,
        width : '80%' , 
        height:50,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#gggggggggg',
        backgroundColor : 'blue',
            justifyContent :'center'
        },
        goalsText : {
            color : 'white',
            padding : 2,
        },
        pressedItem : {
            opacity : 0.5
        }
      
})