import { View , TextInput , Pressable, Dimensions, useWindowDimensions,KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { StyleSheet , Alert } from "react-native";
import { useEffect, useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Tite";
import { Text } from "react-native";
import Card from "../components/ui/Card";
import InsturctionText from "../components/ui/InstructionText";

function StratGameScreen({onPickNumber}){

    const [enteredNumber , setEnteredNumber]= useState('');

const {width , height } = useWindowDimensions(); 
 
function numberInputHandler(number){ 
        setEnteredNumber(number) 
}

const resetInputHandler =  ()=> setEnteredNumber('') ; 

function confirmInputHandler(){
const chosenNumber = parseInt(enteredNumber)  ;
if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
Alert.alert('Invalid number!' ,
    'The number has to be a number brtween 1 and 99',
    [{text : 'Okay' , style: "destructive" , onPress : resetInputHandler }]
)
    return;
}

onPickNumber(chosenNumber);


}


const marginTopDistance = height < 400 ? 10 : 100 ;  



return(
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
    <View style={[styles.rootContainer, {marginTop : marginTopDistance}]}>
        <Title>Guess My Number</Title>
        <Card>
<InsturctionText>Enter a Number</InsturctionText> 
<TextInput
style={styles.numberInput}
maxLength={2} 
keyboardType="number-pad"
autoCapitalize="none" 
autoCorrect={false}
value = {enteredNumber}
onChangeText={numberInputHandler}
/> 
<View style={styles.buttonsContainer}>
    <View style={styles.buttonContainer}>
        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
    </View>
    <View style={styles.buttonContainer}>
        <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
    </View>
    </View>
    </Card>
</View>
</KeyboardAvoidingView>
</ScrollView>
)

}

// const deviceHigth = Dimensions.get("window").height  

const styles = StyleSheet.create({
    screen :{
        flex: 1 ,
    },
rootContainer:{
flex:1,
// marginTop :deviceHigth < 400 ?  10 : 100 ,
alignItems:'center'
    },
numberInput : {
height : 70 ,
width : 50, 
fontSize: 32,
borderBottomColor : Colors.accent500 , 
borderBottomWidth : 2, 
color : Colors.accent500 ,
marginVertical : 8 , 
fontWeight : 'bold', 
textAlign : "center"
},
buttonsContainer : {
flexDirection : 'row', 
},
buttonContainer : {
    flex : 1 , 
} 

})

export default StratGameScreen ; 