import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { primaryColor } from "../../theme";
import { Text } from "react-native-svg";

type LoadingComponentProps = {
    visible: boolean,
    message?: string
}

export default function LoadingComponent({ visible, message }: LoadingComponentProps) {
    return (
        <Modal style={[{ flex: 1 }]} transparent statusBarTranslucent visible={visible}>
            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', rowGap: 20 }]}>
                <ActivityIndicator size={'large'} color={'white'} />
                {message ? <Text>{message}</Text> : null}
            </View>
        </Modal>
    )
}