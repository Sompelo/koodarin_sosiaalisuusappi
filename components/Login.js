import { useState } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, Alert, Pressable } from 'react-native';
import {  getAuth, signInWithEmailAndPassword } from '../config'
import styles from '../styles';
import Register from './Register';

export default function Login({ setLogin }){
    const [ password, setPassword ] = useState('123456');       //Kehitystyötä varten valmiit, toimivat tunnukset.
    const [ email, setEmail ] = useState('A@a.com');            //mutta mitkä tahansa rekisteröidyt tunnukset toimivat.
    const [ registerPressed, setRegisterPressed ] = useState(false);
    // const [ registerFormLogin, setRegisterFormLogin ] = useState(false)
    
    /**
     * Hei! Tässä koodia login-komponentista. Tämän kanssa oli jonkin verran säätöä, sillä en aluksi käyttänyt
     * Firebasen Autentikaatiota käyttäjätunnusten hallintaan, vaan toteutin tämän Firestore-tietokannan avulla.
     * Latasin tietokannasta listan käyttäjätunnuksista ja frontendissä seuloin sen läpi for-loopilla 
     * etsien mätsäävää tunnusta. Jälkeenpäin mietittynä tämä ei oikean sovelluksen kanssa olisi kovin kätevää, 
     * jos käyttäjiä olisi esimerkiksi muutama miljoona <:)
     */
    
    /**=============================================================================================================
     * Kommentteja alla olevasta, pois kommentoidusta koodista kehityksen aiemmassa vaiheessa:
     * =============================================================================================================
     * 
     * Tässä haetaan tietokannasta lista käyttäjätiedoista tilamuuttujaan, jota sitten verrataan annettuihin 
     * käyttäjätunnukseen ja salasanaan.
     * Tämä varmastikin kannattaisi hoitaa backendissä oikeassa sovelluksessa, mutta nyt en oikeen kerkeä sitä alkaa  
     * tähän opettelemaan. Olkoon tämä harjoitusversio nyt pienten tietokantojensa kanssa tälläinen. 
     *
     * =============================================================================================================
     * KORJAUS! 
     * 
     * Löysinkin materiaaleista, miten autentikaatio pitäisi oikeasti tehdä ja se on toteutettu alempana. Tässä 
     * kommentoituna oma toimiva, mutta "hiukkasen" huonompi ja tietoturvattomampi tapani. Mutta kukas sitä 
     * tietoturvasta tai applikaation nopeudesta niin välittää :)
     * =============================================================================================================
     */

    // useEffect(() => {
    //     const q = query(collection(firestore, USERS))
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const tempUsers = []

    //         querySnapshot.forEach((doc) => {
    //             const userObject = {
    //                 username: doc.data().user,
    //                 password: doc.data().userPassword,
    //                 points: doc.data().userPoints,
    //                 created: convertFirebaseTimeStampToJs(doc.data().created)
    //             }
    //             tempUsers.push(userObject)
    //         })
    //         setUsers(tempUsers)
    //     })

    //     return () => {
    //         unsubscribe()
    //     }
    // }, []);
    

    // const login = () => {
    //     console.log("username = " + username + " password = " + password)
    //     if(checkUsername()){
    //         setLogin( true )
    //     } else {
    //         Alert.alert(
    //             "Username not found or password incorrect"
    //         )
    //     } 
    // }

    // const checkUsername = () => {
    //     let userFound = false;
    //     users.forEach((user) => {
    //         if(user.username === username && user.password === password){
    //             console.log("match found: " + user.username)
    //             userFound = true
    //             setUserDt( user )
    //             return
    //         } 
    //     })
    //     return userFound;
    // }
    // setLogin(registerFormLogin);

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setLogin(true);
        }).catch ((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                alert("Invalid credentials!");
            } else if(error.code === 'auth/too-many-requests'){
                alert("Too many attempts, your account was has been suspended and you will be sent to Gulag :)")
            } else {
                console.log(error.code);
                console.log(error.message);
                alert(error.message);
            }
        })
    }

    const register = () => {
        setRegisterPressed( true )
    }

    const forgotPw = () => {
        Alert.alert(
            "Haha",
            "lol"
        )
    }

    if(registerPressed){
        return <Register registerViewOpen = { setRegisterPressed }  emailAddr = { setEmail } pw = { setPassword } /* setLogin = { setRegisterFormLogin } *//>
    } else {
        return (
            <SafeAreaView style = { styles.loginContainer }>
                <View style = { styles.container }>
                    <View style = {{ marginBottom: 70 }}>
                        <Text style = {{fontSize: 24}}>Coder's Activity Tracker</Text>
                    </View>
                    <View style={{marginBottom: 50}}>
                        <Text style={{marginBottom: 10, fontSize: 20}}>Login</Text>
                        <TextInput  style={{marginBottom: 10}} 
                                    keyboardType='email-address' 
                                    placeholder='Email' 
                                    value = { email } 
                                    onChangeText = { (text) => setEmail(text) }/>
                        <TextInput  style={{marginBottom: 30}} 
                                    // keyboardType='visible-password'
                                    secureTextEntry = { true }
                                    placeholder='Password' 
                                    value = { password } 
                                    onChangeText = { (text) => setPassword(text) }/>
                        <View >
                            <Pressable style = { styles.loginViewButton } onPress = { login }>
                                <Text>Login</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                    <View style={{marginBottom: 0}}>
                        <Text style={{marginBottom: 10}}>Not a user?</Text>
                        <View>
                            <Pressable style = { styles.loginViewButton } onPress = { register }>
                                <Text>Register</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View>
                <View style = {{ paddingBottom: 10, alignContent: 'center'}}>
                    <Text style={{marginBottom: 10, textAlign: 'center'}}>Forgot password?</Text>
                    <View>
                        <Pressable style = { styles.loginViewButton } onPress = { forgotPw }>
                            <Text style = {{ textAlign: 'center' }}>Yes i am noob :(</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </SafeAreaView>        
        )
    }
}