import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Text, View, Button, TextInput, Alert, Pressable } from "react-native";
import styles from "../styles";

export default function ChangePasswordView({ passwordView }){
    const [ newPassword, setNewPassword ] = useState('')

    const goPrevious = () => {
        passwordView(false);
    }

    const newPasswordHandler = () => {
        const auth = getAuth();
        if (newPassword !== ('') || newPassword !== undefined || newPassword !== null){
            updatePassword(auth.currentUser, newPassword ).then(() => {
                setNewPassword('');
                console.log("Profile updated");
                Alert.alert("Success", "Password set");
            }).catch((error) => {
                console.log(error.code)
                console.log(error.message)
                if(error.code === 'auth/weak-password'){
                    Alert.alert("Error", "Password should be at least 6 characters long")
                } else {
                    Alert.alert("Error", "Password no good")
                }
            });
        } else {
            Alert.alert("Error", "Password cannot be empty")
        }
        
    }

    return (
        <View style = { styles.container }> 
            <Text style = { styles.profileTextField }>Change password: </Text>
                <TextInput placeholder="Insert new password" 
                                value = { newPassword } 
                                keyboardType = 'visible-password' 
                                onChangeText={ text => setNewPassword(text)}>
                </TextInput>
                <View>
                    <View style = { styles.buttonItem} >
                        <Pressable style = { styles.loginViewButton } onPress = { newPasswordHandler }>
                            <Text>Set new password</Text>
                        </Pressable>
                    </View>
                    <View style = { styles.buttonItem} >
                        <Pressable style = { styles.loginViewButton } onPress = { goPrevious }>
                            <Text>Back</Text>
                        </Pressable>
                    </View>
                </View>
            
            
        </View>
    );
}