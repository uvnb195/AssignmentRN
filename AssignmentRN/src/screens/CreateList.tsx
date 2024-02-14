import {StyleSheet} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {styles as homeStyles} from '../screens/Home';
import HomeActionBar, {arrowLeftIcon} from '../components/HomeActionBar';
import InputField from '../components/InputField';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {primaryColor} from '../../theme';

export default function CreateList() {
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar title="Create a new listing" leftIcon={arrowLeftIcon} />
      <InputField
        title="Title"
        placeHolder="Listing Title"
        onTextChange={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <InputField
        title="Category"
        placeHolder="Select the category"
        icon={
          <FeatherIcons name="chevron-down" size={24} color={primaryColor} />
        }
        enable={false}
        onTextChange={value => console.log(value)}
      />
      <InputField
        title="Price"
        placeHolder="Enter price in USD"
        keyboardType="number-pad"
        onTextChange={value => console.log(value)}
      />

      <InputField
        title="Description"
        placeHolder={`Tell us more...`}
        numOfLines={5}
        onTextChange={value => console.log(value)}
      />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({});
