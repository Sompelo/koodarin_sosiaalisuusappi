import { Text, View, Button, Pressable } from "react-native";
import styles from "../styles";

export default function ActivityMap({ activityView }){

    const goPrevious = () => {
        activityView(false);
    }

    return (
        <View style = { styles.container }> 
            <Text style = {{fontSize: 20}}>This was supposed to be a map view to combine a completed activity with map coordinates 
                if the user so chooses. Due to current workload and me having problems with react async 
                functions and useEffect hook (getting the app to read data from the database, save it into a state variable 
                and render it right away was a huge problem for me), there was no time. </Text>
            <Pressable style = { styles.loginViewButton } onPress = { goPrevious }>
                <Text>Back</Text>
            </Pressable>
        </View>
    );
}