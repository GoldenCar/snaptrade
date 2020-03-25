import React from 'react';
import { View } from 'react-native';

import { colors, dimensions, padding } from '../../styles/base';
import appJSON from '../../../app.json';
import StyledText from '../StyledText';

const DebugInfoComponent = () => (
  <View style={styles.containerStyle}>
    <StyledText numberOfLines={2} style={styles.text}>
      {`Version: ${appJSON.expo.version}`}
    </StyledText>
  </View>
);

const styles = {
  containerStyle: {
    width: dimensions.fullWidth - 20,
    padding: padding.medium,
    margin: padding.medium,
    alignItems: 'center',
  },
  text: {
    color: colors.gray,
    fontSize: 12,
    textAlign: 'center',
  },
};

export default DebugInfoComponent;
