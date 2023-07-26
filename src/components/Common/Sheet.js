import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {forwardRef, useCallback} from 'react';
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const Sheet = forwardRef((props, ref) => {
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {pressBehavior = 'none'} = props;

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={pressBehavior}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      {...props}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      handleComponent={null}>
      <BottomSheetView
        // style={contentContainerStyle}
        onLayout={handleContentLayout}>
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
});

export default Sheet;

const styles = StyleSheet.create({});
