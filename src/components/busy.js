import React, {
    useState,
    useEffect,
    useMemo,
    memo,
    useCallback,
    useRef,
  } from 'react';
  import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
    TouchableOpacity,
    Image,
    ActivityIndicator,
  } from 'react-native';

export const Busy = ({isBussy, children, ...props}) => {
    return (
      <View {...props}>
        {children}
        {isBussy && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  };