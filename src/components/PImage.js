import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Image from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import colors from '../meta/colors';

export default function PImage(props) {
  const {source, small, rounded, large,resizeMode} = props;
  let style = props.style||{}
  function isSVG() {
    const url = source.uri || '';
    const urlArr = url.split('.');
    const type = urlArr[urlArr.length - 1];
    return type.includes('svg') ? true : false;
  }
  const svg = isSVG();
  return svg ? (
      <View style={style}><SvgUri {...style} uri={source.uri}></SvgUri></View>
  ) : (
    <Image
      {...props}
      resizeMode={(large || small) ? 'cover' : (resizeMode || 'contain')}
      style={[
        props.style,
        rounded
          ? styles.rounded(small, large, style.backgroundColor)
          : {},
      ]}></Image>
  );
}

const styles = StyleSheet.create({
  rounded(small, large, color, size) {
    size = small ? 60 : large ? 100 : size || 70;
    color = color || colors.background;
    return {
      height: size,
      width: size,
      borderRadius: size - 5,
      backgroundColor: color,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: color,
      shadowOffset: 3,
      shadowOpacity: 0.4,
      shadowRadius: 3,
    };
  },
});

export function rounder(size, backgroundColor) {
  return styles.rounded(null, null, backgroundColor, size);
}
