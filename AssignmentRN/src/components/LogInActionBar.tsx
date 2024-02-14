import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {primaryColor} from '../../theme';

type ActionBarProps = {
  title: string;
  onClick: () => void;
};

export default function LogInActionBar(props: ActionBarProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <FeatherIcons name="chevron-left" size={40} color={primaryColor} />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 8,
  },
  text: {color: primaryColor, fontSize: 26, fontWeight: '600'},
});
