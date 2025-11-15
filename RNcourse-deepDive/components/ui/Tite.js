import { Text , StyleSheet, Dimensions , Platform } from "react-native";
import Colors from "../../constants/colors";

function Title({children}){
    return <Text style = {styles.title} >{children}</Text>
}

export default Title ; 

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
   title : {
    fontFamily : 'open-sans-bold',
        fontSize: deviceWidth < 380 ? 12: 24 , 
        // fontWeight : 'bold' , 
        color : 'white',
        textAlign:"center",
        // borderWidth : Platform.OS === 'ios' ?  0: 2 ,
        borderWidth : Platform.select({ios: 0 , android : 2}) ,
        borderColor : 'white', 
        padding : 11,
        maxWidth: '80%' ,
        width: 300
    }
})