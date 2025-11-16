import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"


export const MealItem = ({ title, imageUrl, affordability, complexity, duration , onPressMeal}) => {
    return (
        <View style={styles.mealItem}>
            <Pressable 
            android_ripple={{color: '#ccc' , foreground : true}} 
            style = {({pressed}) => pressed ? styles.buttonPressed : null}
            onPress={onPressMeal}
            >
                <View style={styles.innerContainer}>
                <View>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailItem}>{duration}</Text>
                    <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
                    <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
                </View>
                </View>

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        // overflow : 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.select({ ios: 'visible', android: 'hidden' })
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 8,
        justifyContent: 'center'
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    buttonPressed  : {
        opacity : 0.25
    }
})
