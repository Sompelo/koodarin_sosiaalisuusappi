import { useState } from "react";
import { Alert, Button, SafeAreaView, TextInput, View, Text, Pressable } from "react-native";
import { USERS, firestore, createUserWithEmailAndPassword, getAuth, addDoc, collection, serverTimestamp, orderBy } from '../config'
import styles from "../styles";

export default function Register({ registerViewOpen, emailAddr, pw }) {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('');
    const [ userId, setUid ] = useState('');

    /**
     * Tämä on käyttäjätunnuksen rekisteröintikomponentin koodia. 
     * 
     * Koodi ottaa syötetyt arvot ja tallentaa ne kahteen eri tietokantaan: Firebase autentikaation käyttäjätietokantaan 
     * ja omaan 'users' tietokantaani (tämä pisteenlaskua varten).
     *   
     */

    const saveCheck = () => {
        
        emailAddr( email )
        pw( password )
        createNewUser()
        
        
        if (userId !== ''){                     //Async-Promise-systeemin kanssa ongelmia, niin tämä on tälläinen karvalakki-
            save()                              //ratkaisu siihen, että se tallentaa käyttäjä-id:n tilamuuttujaan.
            registerViewOpen( false )           //Voi olla, että "register"-nappia joutuu painamaan pari kertaa.
        }
        
    }

    const createNewUser = async() => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            setUid(user.uid);                       // Tässä yritän tallentaa käyttäjän id:n myöhempää tiedonhakua varten 
        })                                          // tilamuuttujaan ja 'users'-tietokantaan. Synccaamisen kanssa ongelmia.
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        })
    }

    const save = async() => {
        await addDoc(collection(firestore, USERS), {
            uid: userId,                            // Tallentaa käyttäjän tiedot myös 'users' nimiseen tietokantaan
            email: email,                           // pisteiden laskua varten. Alunperin en käyttänyt firebasen autentikaatiota
            user: username,                         // vaan vain pelkästään tätä tietokantaa. Autentikaation implementoinnin 
            points: 0,                              // myötä koodi monimutkistui hieman ja tuli näitä async ongelmia. 
            created: serverTimestamp()
        }).catch(error => console.log(error))
        
        console.log(userId);

        setUsername('')
        setPassword('')
        setEmail('')
        console.log('User Saved')
    }

    const goPrevious = () => {
        registerViewOpen(false);
    }

    return (
        <SafeAreaView style = { styles.mainViewContainer }>
            <View style = { styles.container}>
                <TextInput placeholder="email" 
                            value = { email } 
                            keyboardType = 'email-address' 
                            onChangeText={ text => setEmail(text)}>
                </TextInput>
                <TextInput placeholder="username" 
                            value = { username } 
                            keyboardType = 'default' 
                            onChangeText={ text => setUsername(text)}>
                </TextInput>
                <TextInput placeholder="password" 
                            value = { password } 
                            secureTextEntry = { true }
                            keyboardType = 'default' 
                            onChangeText={ text => setPassword(text)}>
                </TextInput>
                <View>
                    <Pressable style = { styles.loginViewButton } onPress = { saveCheck }>
                        <Text>Register</Text>
                    </Pressable>
                </View>
                
                <Text></Text>
                <View>
                    <Pressable style = { styles.loginViewButton } onPress = { goPrevious }>
                        <Text>Back</Text>
                    </Pressable>
                </View>
                
            </View>
            <View>
                <Text style = {{marginBottom: 30, marginHorizontal: 50 , color: '#aaa'}}>
                    If it doesn't register the first time, click again. Async issue. 
                </Text>
            </View>
        </SafeAreaView>
    )
}