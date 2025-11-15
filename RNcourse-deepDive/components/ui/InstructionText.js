import { Text,StyleSheet } from "react-native";
import Colors from "../../constants/colors.js";

function InsturctionText({children , styleProp }){
   
    return  <Text style={[styles.insturctionText,styleProp]}>{children}</Text>
}

export default InsturctionText ; 


const styles = StyleSheet.create({
insturctionText : {
    color: Colors.accent500, 
    fontSize : 24 ,
    fontFamily:'open-sans'
}

})