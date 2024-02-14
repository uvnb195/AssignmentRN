import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor} from '../../theme';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

type OptionButtonProps = {
  title: string;
  subTitle?: string;
  onClick: () => void;
};

export default function OptionButton({
  title,
  subTitle,
  onClick,
}: OptionButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text style={styles.title}>{title}</Text>
      {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}

      <View style={styles.icon}>
        <FontAwesomeIcons name="angle-right" size={24} color={primaryColor} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    rowGap: 5,
    justifyContent: 'center',
    minHeight: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: primaryColor,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#909090',
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    end: 0,
  },
});
