import { useEffect, useState } from "react";
import { Text, View, Button, Pressable } from "react-native";
import { USERS, firestore, query, onSnapshot, addDoc, collection, serverTimestamp, orderBy, getAuth, onAuthStateChanged, where, getDocs, getDoc, doc } from "../config";
import styles from "../styles";
import ChangePasswordView from './ChangePasswordView'
import { convertFirebaseTimeStampToJs } from "./Functions/Functions";

export default function ProfileView({ profileView }){
    const [ changePasswordView, setChangePasswordView ] = useState(false);
    const [ userId, setUid ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ userPoints, setPoints ] = useState('');
    const [ userCreated, setCreated ] = useState('');
    const [ userEmail, setEmail] = useState('');
    const [ isLoaded, setIsLoaded ] = useState(false);

    /**
     * Tämä on profiilinäkymä, jossa käyttäjä voi katsella profiilinsa tietoja ja vaihtaa salasanansa. En kerennyt 
     * rakentaa CRUD-operaatioita muille tiedoille. 
     * 
     */


    useEffect(() => {
        const auth = getAuth();
        console.log("on getAuth()");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                console.log("setting user.uid")
                console.log("uid: " + user.uid + " set as userId")
                console.log(userId)
            }
        })
    }, [])

    useEffect(() => {                       //Meni pitkään, että tajusin tän useEffectin käytön. Aiemmin profiilin tiedot
        getDbData()                         //piti ladata erillisestä napista.
    }, [userId])

    const getDbData = async() => {
        const userRef = collection(firestore, 'users');
        console.log("accessing firestore db")
        const q = query(userRef, where("uid", '==', userId))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            if(doc.data().uid !== ('')){
                console.log("doc.uid: " + doc.data().uid)
                console.log("useState userId: " + userId)
                setUsername(doc.data().user);
                setEmail(doc.data().email);
                setPoints(doc.data().points);
                setCreated(convertFirebaseTimeStampToJs(doc.data().created)); 

                setIsLoaded(true);
            } 
        })
    }
   
    const goPrevious = () => {
        profileView(false);
    }

    const changePw = () => {
        setChangePasswordView(true)
    }

    if(isLoaded && changePasswordView) {
        return (
            <ChangePasswordView passwordView = { setChangePasswordView } />
        );
    } else if( isLoaded ) {
        return (
            <View style = { styles.container }> 
                <Text style = { styles.profileTextField }>Username: { username }</Text>
                <Text style = { styles.profileTextField }>Email: { userEmail }</Text>
                <Text style = { styles.profileTextField }>Points: { userPoints }</Text>
                <Text style = { styles.profileTextField }>Account created: { userCreated }</Text>
                <View /* style = { styles.buttonContainer } */>
                    <View style = { styles.buttonItem }>
                        <Pressable style = { styles.loginViewButton } onPress = { changePw }>
                            <Text>Change password</Text>
                        </Pressable>
                    </View>
                    <View style = { styles.buttonItem }>
                        <Pressable style = { styles.loginViewButton } onPress = { goPrevious }>
                            <Text>Back</Text>
                        </Pressable>
                    </View>
                </View>  
            </View>
        );
    } else { 
        return (
            <View style={ styles.container }>
                <Text style = {{ marginBottom: 50}}>Loading...</Text>
                <View style = { styles.buttonItem }>
                        <Button title = "Back" onPress = { goPrevious } />      
                </View>
            </View>
        );
    }
}