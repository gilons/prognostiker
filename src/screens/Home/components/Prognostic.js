import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PImage from '../../../components/PImage';
import colors from '../../../meta/colors';
//import PropTypes from "prop-types"

export default function Prognostic(props) {
  const {reverse, navigation, defaultTeam} = props;

  const [score, setScore] = useState('1');
  const [teamPhoto, setTeamPhoto] = useState(
    defaultTeam.url || defaultTeam.flag,
  );
  function changeScore(val) {
    setScore(val);
  }
  const selectTeam = (team) => {
    setTeamPhoto(team.url || team.flag);
  };
  function changePhoto() {
    navigation.navigate('Teams', {selectTeam});
  }
  return (
    <View style={styles.prognosticItem(reverse)}>
      <TouchableOpacity onPress={changePhoto}>
        <PImage
          resizeMode={'stretch'}
          style={styles.prognosticImage}
          source={{uri: teamPhoto}}
          rounded
          large
        />
      </TouchableOpacity>
      <TextInput
        autoFocus
        keyboardType={'numeric'}
        value={score}
        style={styles.score(reverse)}
        onChange={changeScore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  prognosticItem(reverse) {
    return {
      flexDirection: reverse ? 'row-reverse' : 'row',
      justifyContent: reverse ? 'flex-end' : 'flex-start',
      alignItems: 'center',
    };
  },
  prognosticImage: {
    backgroundColor: colors.transparentChampions,
    opacity: 1,
  },
  score(reverse) {
    const radius = 5;
    return {
      backgroundColor: colors.transparentChampions,
      borderRadius: radius,
      opacity: 0.8,
      color: colors.background,
      borderBottomRightRadius: !reverse ? 0 : radius,
      borderBottomLeftRadius: reverse ? 0 : radius,
      fontWeight: 'bold',
      fontSize: 20,
      borderTopRightRadius: !reverse ? 0 : radius,
      borderTopLeftRadius: reverse ? 0 : radius,
      textAlign: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: !reverse ? 'flex-end' : 'flex-start',
      marginLeft: !reverse ? 10 : null,
      marginRight: reverse ? 10 : null,
      maxWidth: 50,
    };
  },
});
