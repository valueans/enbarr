import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleLayout from '../../components/Layout/SimpleLayout';
import fonts from '../../utils/fonts';
import {getTerms} from '../../APIs/api';
// import {WebView} from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
const Terms = ({navigation}) => {
  const [privacyContent, setPrivacyContent] = useState('');
  const data = async () => {
    const x = await getTerms();

    setPrivacyContent(x[1][0]?.content);
    console.log(x[1][0]?.content);

    const source = {
      html: `
    <p style='text-align:center;'>
      Hello World!
    </p>`,
    };
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <SimpleLayout
      title={'Terms\nand Conditions'}
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

export default Terms;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
});
