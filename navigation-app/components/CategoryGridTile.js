import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

function CategoryGridTile({ title, color, onPressNavigation }) {
    return <View style={styles.gridItem}>
        <Pressable
            onPress={onPressNavigation}
            android_ripple={{ color: '#ccc', foreground: true }}
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null]}
        >
            <View style={[styles.innerContainer, { backgroundColor: color }]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View>
}

export default CategoryGridTile

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.select({ ios: 'visible', android: 'hidden' })

    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    }

})