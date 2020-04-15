import React from 'react';
import { 
View, 
Text,
StyleSheet,
TouchableOpacity

} from 'react-native';

const CustomActionButton = ({children, onPress}) => (
<TouchableOpacity onPress={onPress}>
        <View style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#432e7b'}}>
        
        {children}
        </View>
        </TouchableOpacity>

);

export default CustomActionButton;
const styles = StyleSheet.create ({

    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});