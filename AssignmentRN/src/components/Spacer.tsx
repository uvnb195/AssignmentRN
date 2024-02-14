import {View} from 'react-native';

type SpacerProps = {
  flex?: number;
  height?: number;
  width?: number;
  color?: string;
};

export default function Spacer(props: SpacerProps) {
  return (
    <View
      style={{
        flex: props.flex || undefined,
        height: props.height || 0,
        width: props.width || 0,
        backgroundColor: props.color || 'transparent',
      }}
    />
  );
}
