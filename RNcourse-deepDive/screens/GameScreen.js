import { View , Text , StyleSheet, Alert , FlatList, useWindowDimensions } from "react-native";
import Title from "../components/ui/Tite";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import NumberContainer from "../components/Game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InsturctionText from "../components/ui/InstructionText";
import {Ionicons} from '@expo/vector-icons'
import GuessLogItem from "../components/Game/GuessLogItem";
import { SafeAreaView } from "react-native-safe-area-context";


function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  let minBoundary = 1 
  let maxBoundary = 100


function GameScreen({userNumber , onGameOver}){

    const initalGuess = generateRandomBetween(1,100 ,userNumber)
    const [currentGuess , setCurrentGuess] = useState(initalGuess);
    const [guessRounds , setGuessRounds ] = useState([])
    const {width , height} =useWindowDimensions();


useEffect(()=>{
if(currentGuess === userNumber ){
onGameOver(guessRounds.length)
}
},[currentGuess,userNumber,onGameOver])

useEffect(()=>{ // it will be exc 1 time when the app first rendering
      minBoundary = 1 
      maxBoundary = 100
},[])

 

function nextGuessHandler(direction){ // direction => 'lower' , 'greater'

    if(
        (direction === 'lower' && currentGuess < userNumber) ||
         (direction === 'greater' && currentGuess > userNumber)
    ) 
    {
        Alert.alert("Don't lie!" , "You know this is wrong ..." ,   [{
            text : 'Sorry' , style:'cancel'
        }])
return ; 
    }

if(direction === 'lower' ){
    maxBoundary = currentGuess-1 
}
else {
    minBoundary = currentGuess+1;
}
const newRndNumber = generateRandomBetween(minBoundary,maxBoundary,currentGuess); 
setCurrentGuess(newRndNumber)
setGuessRounds(pervGuessRounds => [newRndNumber , ...pervGuessRounds ])
}

const guessRoundsListLength= guessRounds.length;
let content  = <> 
<NumberContainer>
{currentGuess}
</NumberContainer>
<Card>
<InsturctionText styleProp={styles.instructionText}>Higher or lower ? </InsturctionText>
<View style = {styles.buttonsContainer}>
<View style = {styles.buttonContainer} >
<PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
  <Ionicons name="remove"size={24} color="white" />
    </PrimaryButton>
</View>
<View   style = {styles.buttonContainer}>
<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
  <Ionicons name="add"size={24} color="white" />
    </PrimaryButton>
</View>
</View>
</Card>
</>

if(width > 500 ){
    content = <>
{/* <InsturctionText styleProp={styles.instructionText}> 
    Higher or lower ?  
    </InsturctionText> */}
    <View style={styles.buttonContainerWide}>
    <View style = {styles.buttonContainer} >
<PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
  <Ionicons name="remove"size={24} color="white" />
    </PrimaryButton>
</View>
        <NumberContainer>{currentGuess}</NumberContainer>
<View   style = {styles.buttonContainer}>
<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
  <Ionicons name="add"size={24} color="white" />
    </PrimaryButton>
</View>
    </View>

    </>
}

return (
    <View  style = {styles.screen}>
            <Title>
            Opponent's Guess
            </Title>
           {content }
<View style={styles.listContainer}>
     {/* {guessRounds.map((guessRound , index) =>{
            return (
                <Text key={index}>{guessRound}</Text>
            )
        })} */}
<FlatList
        data={guessRounds}
        renderItem={(itemData) => 
        <GuessLogItem 
            guess={itemData.item}
            roundNumber={guessRoundsListLength - itemData.index} />}
        keyExtractor={item => item}
      />
</View>
</View> 
)
}

export default GameScreen ; 

const styles = StyleSheet.create({
    screen : {
        flex :1 ,
        padding : 40, 
        alignItems : "center"
    },
    title : {
        fontSize: 24 , 
        fontWeight : 'bold' , 
        color : Colors.accent500,
        textAlign:"center",
        borderWidth : 2 , 
        borderColor : Colors.accent500, 
        padding : 11
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonsContainer : {
        flexDirection : 'row', 
        },
        buttonContainer : {
            flex : 1 , 
        } ,
        instructionText : {
            marginBottom : 12,
        },
        listContainer : {
            flex : 1 , 
            padding  : 4 ,  
        },
        buttonContainerWide:{
            flexDirection : 'row' , 
            alignItems: "center"
        }
})