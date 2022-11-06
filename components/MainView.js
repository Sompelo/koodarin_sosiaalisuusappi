import { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Pressable, ScrollView, TextInput, Button } from 'react-native'
import ActivityMap from './ActivityMap'
import ProfileView from './ProfileView'
import styles from '../styles'
import { convertFirebaseTimeStampToJs} from './Functions/Functions'
import { USERS, ACTIVITIES, firestore, query, onSnapshot, addDoc, collection, serverTimestamp, orderBy, getAuth, where, doc } from '../config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { getDocs, updateDoc } from 'firebase/firestore'


export default function MainView({ setLogin }){ 
    const [ activityMapPressed, setActivityMapPressed ] = useState(false);
    const [ profilePressed, setProfilePressed ] = useState(false);
    const [ activities, setActivities ] = useState([]);
    const [ newActivity, setNewActivity ] = useState('');
    const [ newActivityPoints, setNewActivityPoints ] = useState('');
    const [ userPoints, setUserPoints ] = useState(0);
    const [ userId, setUid ] = useState('');

    // const [ itemPoints, setItemPoints ] = useState(0);


    useEffect(() => {
        fetchActivityData()
    }, []);

    useEffect(() => {
        fetchUserId()
        fetchUserData()
    }, [userId])

    useEffect(() => {
        savePoints()
    }, [userPoints])

    const fetchActivityData = () => {

        /**
         * Tässä haetaan päänäkymän aktiviteettiselaimeen lista aktiviteeteista ja niiden suorittamisesta 
         * saatavista pisteistä. 
         */
        const q = query(collection(firestore, ACTIVITIES), orderBy('created', 'desc'))

        // console.log("mainview userdata: " + userData.username)

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempActivities = []

            querySnapshot.forEach((doc) => {
                const activityObject = {
                    id: doc.id,
                    activity: doc.data().activity,
                    points: doc.data().points,
                    created: convertFirebaseTimeStampToJs(doc.data().created)
                }
                tempActivities.push(activityObject)
            })
            setActivities(tempActivities);
            activities.forEach((item) => {
                console.log(item.activity + ' ' + item.points  + ' pts')})
                console.log('-------------------------')
        })

        return () => {
            unsubscribe()
        }
    }

    const fetchUserId = () => {
        /**
         * Hakee firebasen käyttäjätietokannasta käyttäjän id:n.
         */
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
        return true
    }

    const fetchUserData = () => {
        /**
         * Funktio, jolla haetaan käyttäjädata tietokannasta firebase käyttäjätietokannan käyttäjäid:n perusteella. 
         * Päänäkymässä tällä hetkellä tästä datasta tarvitaan vain pisteet,
         * mutta muutakin dataa on saatavilla myöhempää kehitystyötä ajatellen. 
         */
        const userRef = collection(firestore, USERS)
        const q = query(userRef, where("uid","==", userId))

        // console.log("mainview userdata: " + userData.username)

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tempPoints = 0;

            querySnapshot.forEach((doc) => {
                const userObject = {
                    id: doc.data().uid,
                    user: doc.data().user,
                    points: doc.data().points,
                }
                tempPoints = userObject.points;
            })
            setUserPoints(tempPoints)
            console.log("temppoints: " + userPoints)
        })
        
        return () => {
            unsubscribe()
        }
    }

    const saveActivity = async() => {
        /**
         * Funktio uuden aktiviteetin lisäämiseksi tietokantaan. Lopulliseen sovellukseen en ajatellut 
         * tätä ominaisuutta käyttäjille tarjota, mutta jätän sen nyt tähän versioon kuitenkin kokeiltavaksi. 
         */
        const docRef = await addDoc(collection(firestore, ACTIVITIES), {
            activity: newActivity,
            points: newActivityPoints,
            created: serverTimestamp()
        }).catch(error => console.log(error))
        

        setNewActivity('')
        setNewActivityPoints('')
        console.log('Activity Saved')
        
    }

    const setPoints = (docPoints) => {
        setUserPoints( +userPoints + +docPoints )
        
    }

    const savePoints = async() => {
        try {
            let firestoreUid = "";
            const q = query(collection(firestore, USERS), where("uid", "==", userId));

            const querySnap = await getDocs(q);
            querySnap.forEach((doc) => {
                firestoreUid = doc.id
            })

            const pointsString = userPoints.toString()
            console.log("pointsString: " + pointsString)

            const pointsRef = doc(firestore, USERS, firestoreUid);
            const data = {
                points: pointsString
            };
            await updateDoc(pointsRef, data);
        } catch(error) {
            console.log(error)
        }
    }

    

    const onPressActivityMap = () => {
        setActivityMapPressed(true);
    }

    const onPressProfile = () => {
        setProfilePressed(true);
    }

    const signoutFunction = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setLogin( false )
        }).catch((error) => {
            console.log(error.code)
            console.log(error.message)
        })
    }

    

    if(activityMapPressed){
        return <ActivityMap activityView = { setActivityMapPressed } />
    } else if(profilePressed) {
        return <ProfileView profileView = { setProfilePressed } /* userD = { userData } *//>
    } else {
        return (
            <SafeAreaView style = { styles.mainViewContainer }>
                <View style = { styles.mainViewTopContainer}>
                    <Text style = { styles.mainViewTitle }>Activities</Text>
                    <Pressable style = { styles.signoutButton }
                                onPress = { signoutFunction }>
                        <Text>Sign Out</Text>
                    </Pressable>
                </View>
                <View style = { styles.mainViewNamePointsContainer}>
                    <Text style = { styles.heading }>
                    </Text>
                    <Text style = { styles.heading }>
                        Points: { userPoints.valueOf() }
                    </Text>
                </View>
                <View style = { styles.mainViewActivityTitleContainer}>
                    <Text style = { styles.heading2 }>
                        Activities: 
                    </Text>
                    <Text style = { styles.heading2 }>
                        Points: 
                    </Text>
                </View>
                <View style = { styles.mainViewActivityBrowser}>
                    <ScrollView style = {{ width: '100%'}}>
                        {
                            activities.map((doc) => (
                                    <Pressable onPress = { () => setPoints(+doc.points) }>
                                        <View style = { styles.mainViewActivityItem } key = { doc.id }>
                                            <Text style = { styles.textField }>{ doc.activity } </Text>
                                            <Text style = { styles.textField }>{ doc.points } </Text>
                                        </View>
                                    </Pressable>
                                )
                            )
                        }
                    </ScrollView>
                </View>
                <View style = { styles.mainViewActivityTitleContainer /*Toiminnallisuus uuden aktiviteetin lisäämiseen tietokantaan.*/}>
                    <TextInput placeholder="act" 
                                value = { newActivity} 
                                keyboardType = 'default' 
                                onChangeText={ text => setNewActivity(text)}>
                    </TextInput>
                    <TextInput placeholder="pts" 
                                value = { newActivityPoints} 
                                keyboardType='decimal-pad' 
                                onChangeText={ text => setNewActivityPoints(text)}>
                    </TextInput>
                    <Pressable style = { styles.signoutButton } onPress = { saveActivity } >
                        <Text>save</Text>
                    </Pressable>
                    {/* <Button title="Save points" onPress = { savePoints } /> Nappi pisteiden manuaalista tallentamista varten, ennen kuin sain useEffectin pelittämään*/}
                </View>
                <View style = { styles.bottomNavBar } >
                    <Pressable style = { styles.bottomNavBarItem}
                                onPress = { onPressActivityMap }>
                        <Text>Activity Map</Text>
                    </Pressable>
                    <Pressable style = { styles.bottomNavBarItem}
                                onPress = { onPressProfile }>
                        <Text>Profile</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
            )}
}