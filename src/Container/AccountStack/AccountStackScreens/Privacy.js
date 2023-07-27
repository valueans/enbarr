import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SimpleLayout from '../../../components/Layout/SimpleLayout';
import fonts from '../../../utils/fonts';

const Privacy = ({navigation}) => {
  return (
    <SimpleLayout
      title={'Privacy policy'}
      navigation={navigation}
      paddingHorizontal={0}>
      <ScrollView
        contentContainerStyle={{paddingTop: 12}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit mi
          aliquet quis orci. Accumsan blandit tempus, dictum nunc nisl ac, at
          leo. Donec condimentum mus bibendum tempor, semper id lectus. Nisl,
          vestibulum, massa et pellentesque lobortis vitae commodo, in congue.
          Sit tincidunt ultricies amet etiam. Lectus viverra scelerisque ac
          ullamcorper massa. Bibendum nisl, lorem sit nunc. Sit at ultrices
          purus habitasse feugiat. Massa ipsum turpis non nibh convallis dui
          volutpat ac. Urna suspendisse vel feugiat elit. Eget non sed nisl
          nisl, magna. Sed condimentum aliquam sed purus enim nisi, nec mattis
          tortor. Volutpat amet nunc eu nisi amet tristique lacus nisl.
          Tincidunt scelerisque venenatis mi scelerisque pulvinar. Elit
          pellentesque sed maecenas ut quis ullamcorper feugiat. Mi turpis sit
          eget quam mus vitae at ullamcorper. Nunc vitae nec et in id adipiscing
          egestas ac. Ut ut condimentum in nisi est odio risus. Fusce amet est
          dolor nunc. Sed nulla purus donec vestibulum facilisis massa. Arcu
          aliquet quis id pretium a. Lobortis cursus nec ridiculus volutpat sed
          sodales ultrices. Eu porttitor eleifend ac lectus magnis porttitor
          euismod viverra nunc. Vestibulum vulputate sollicitudin accumsan arcu
          enim, est fermentum. Morbi duis nec volutpat pharetra at elit. Nunc
          morbi amet risus eget eget. Diam faucibus posuere vivamus mauris quis
          proin massa mauris. Eget arcu proin sodales ut netus eu, nisi, et
          ornare. Nunc, sed in amet enim tortor, turpis elit. Sed sodales vitae
          a ut tempor, id nec. Tortor est non aenean pellentesque in quis. In
          suspendisse tristique et mi odio sollicitudin at. Dictum semper varius
          tincidunt cursus massa sit elit. Rhoncus blandit vel sed sit posuere.
          Vulputate nec, at habitant porta nulla quis sed in. Nec, tristique
          facilisi urna id egestas. Velit nisi, pulvinar scelerisque mattis
          ornare dolor, nunc eu faucibus. Mattis eget arcu, senectus ut at nisi
          consequat. Maecenas cras sit fringilla enim facilisi. Est tincidunt in
          ultrices facilisis lectus. In interdum ut pellentesque eleifend nibh
          nisl. Sit adipiscing id ultrices feugiat turpis. Pretium ullamcorper
          ut aliquet arcu eu, pellentesque pharetra. Vestibulum lobortis vitae,
          quam quisque vel. Eu quam at mauris tortor, blandit. Vitae, enim
          condimentum ac, mauris, porttitor purus, varius egestas. Feugiat
          ullamcorper leo, nibh at vitae. Eget lacinia in amet, lobortis leo
          facilisi arcu. Orci elementum in sit sed egestas eget sed. Orci, et
          viverra massa curabitur sit. Ultricies sed orci aliquet arcu vitae
          augue adipiscing. Pellentesque tempor, non porttitor est vitae aenean
          fusce sed blandit. In lectus velit augue a habitasse sit nisi, tortor,
          purus. Ultrices faucibus massa euismod.
        </Text>
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
