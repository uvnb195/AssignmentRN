import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import {primaryColor} from '../../theme';
import {ReactNode, useState} from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';

type HomeActionBarProps = {
  leftIcon?: ReactNode;
  onLeftClick?: () => void;
  rightIcon?: ReactNode;
  onRightClick?: () => void;
  title: string;
};

export const arrowLeftIcon: ReactNode = (
  <FeatherIcons name="chevron-left" size={30} color={primaryColor} />
);

export default function HomeActionBar({
  leftIcon,
  onLeftClick,
  rightIcon,
  onRightClick,
  title,
}: HomeActionBarProps) {
  const [visibleSearch, setVisibleSearch] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        {leftIcon ? (
          <TouchableOpacity style={styles.leftIcon} onPress={onLeftClick}>
            {leftIcon}
          </TouchableOpacity>
        ) : null}
        {rightIcon ? (
          <TouchableOpacity style={styles.rightIcon} onPress={onRightClick}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftIcon: {
    position: 'absolute',
    start: 0,
  },
  rightIcon: {
    position: 'absolute',
    end: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    height: 30,
  },
});
