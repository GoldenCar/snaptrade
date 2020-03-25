import React from 'react';
import type { ChildrenArray, Element } from 'react';
import { View } from 'react-native';

import { borderColor, backgroundColor, padding } from '../../styles/base.js';

type Props = {
  children: ChildrenArray<Element<any>>,
};

const CardSection = (props: Props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: padding.small,
    backgroundColor: backgroundColor.primary,
    borderColor: borderColor.primary,
    position: 'relative',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
};

export default CardSection;
