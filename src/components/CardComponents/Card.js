import React from 'react';
import type { ChildrenArray, Element } from 'react';
import { View } from 'react-native';

import { borderColor, shadowColor } from '../../styles/base.js';

type Props = {
  children: ChildrenArray<Element<any>>,
};

const Card = (props: Props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: borderColor.primary,
    borderBottomWidth: 0,
    shadowColor: shadowColor.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

export default Card;
