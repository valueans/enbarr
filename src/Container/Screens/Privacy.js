import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleLayout from '../../components/Layout/SimpleLayout';
import fonts from '../../utils/fonts';
import {getPrivacy} from '../../APIs/api';
import RenderHtml from 'react-native-render-html';
const Privacy = ({navigation}) => {
  const [privacyContent, setPrivacyContent] = useState('');
  const data = async () => {
    const x = await getPrivacy();

    setPrivacyContent(x[1][0]?.content);
  };
  useEffect(() => {
    data();
  }, []);
  return (
    <SimpleLayout
      title={'Privacy policy'}
      navigation={navigation}
      paddingHorizontal={0}>
      <ScrollView
        contentContainerStyle={{paddingTop: 12}}
        showsVerticalScrollIndicator={false}>
        <RenderHtml
          contentWidth={400}
          source={{
            html: `
    ${privacyContent}`,
          }}
        />
      </ScrollView>
    </SimpleLayout>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
});
