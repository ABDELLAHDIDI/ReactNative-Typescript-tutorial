import {View , Text , Pressable , StyleSheet} from 'react-native'
import Colors from '../../constants/colors';

function PrimaryButton ({children , onPress}){
    function pressHandler(){
        console.log('Pressed');
        onPress();
    }
return(
    <View style = {styles.buttonOuterContainer}>
    <Pressable 
    // onPress={pressHandler}
    onPress={onPress}
    android_ripple={{color : 'red' , foreground: true  }} 
     style={({pressed})=> pressed ? 
     [styles.buttonInnerContainer,styles.pressed]
      : styles.buttonInnerContainer}
     >
        <Text style={styles.buttonText}>{children}</Text>
       </Pressable>
       </View>
)
}

export default PrimaryButton ;

const styles = StyleSheet.create({
    buttonOuterContainer:{
             margin : 4 , 
             borderRadius : 28 , 
             overflow : 'hidden', 
            },
    buttonInnerContainer :{
            backgroundColor :  Colors.primary500 , //'#72063c' ,
             paddingVertical : 8 , 
             paddingHorizontal : 16 , 
             elevate : 2 ,  
    },
    buttonText: {
        color: 'white',
        textAlign : 'center'
    },
    pressed:{
        opacity : 0.75,

    }
})