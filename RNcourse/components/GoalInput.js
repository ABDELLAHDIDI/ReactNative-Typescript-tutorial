import { useState } from "react";
import { StyleSheet , TextInput , Button , View , Modal , Image } from "react-native";

function GolaInput (props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        console.log("****************************************\n ");
          console.log(enteredText);
          setEnteredGoalText(enteredText);
    }

    // function addGoalHandler2 (enteredGoalText){
    //     props.onAddGoal(enteredGoalText)
            // setEnteredGoalText('')
    // }
 
     return ( 
            <Modal visible={props.visible} animationType="slide">
                <View style={styles.inputContainer} >
                    <Image
                     style={styles.image}
                     source={require('../assets/images/goal.png')} 
                     />
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Enter your goal here ...'
                        onChangeText={goalInputHandler} 
                        value={enteredGoalText}
                    />
                    <View  style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Button title="Cancel" 
                    onPress={props.onCancel}  />
                    </View>
                    <View style={styles.button}>
                    <Button  title='Add Goal' onPress={() => {
                        setEnteredGoalText('')
                        return props.onAddGoal(enteredGoalText)} 
                    } /> 
                    </View>
                   </View>
                    {/* <Button  title='Add Goal' onPress={addGoalHandler2} />  */}
                </View>
            </Modal>
        
     )
}

export default GolaInput ; 

const styles  = StyleSheet.create({
    textInput : {
        borderWidth : 1,
        borderColor : 'white',
        backgroundColor : '#e4d0ff', 
        borderRadius : 6,
        width: '100%',
        padding : 8,

      },
      inputContainer : {
        flex : 1,
        padding : 16,
        justifyContent : 'center',
        backgroundColor : '#311b6b',
        alignItems : 'center' ,  
      },
      buttonContainer : {
     marginTop : 16  ,
    flexDirection : 'row',
    marginLeft: 20
      },
      button : {  
        width : '40%',
        marginHorizontal : 8 , 
      },
      image : {
        width : 100 , 
        height : 100,
        margin: 20
      }
})