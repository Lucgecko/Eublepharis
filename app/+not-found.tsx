import { View, StyleSheet } from 'react-native';
import { Link, Stack, RelativePathString } from 'expo-router';
import { Fragment } from 'react';

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href={"/" as RelativePathString} style={styles.button}> {/*This works but the linter is trippin wtf..... https://docs.expo.dev/tutorial/add-navigation/ */}
          Go back to the Home screen!
        </Link>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
