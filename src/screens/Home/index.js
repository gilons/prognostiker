import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import colors from '../../meta/colors';
import * as football from '../../meta/football.json';
import Prognostic from './components/Prognostic';

export default class Home extends Component {
  backgroundImage = require('../../../images/top-image.jpg');
  championsLeagueLogo = require('../../../images/index.jpeg');
  team1Initial = football.clubs.find((ele) =>
    ele.name.toLowerCase().includes('liverpool'),
  );
  team2Initial = football.clubs.find((ele) =>
    ele.name.toLowerCase().includes('barcelona'),
  );
  shooter = null;
  shoot = () => {
    this.shooter.capture().then((uri) => {
      this.onShare(uri);
    });
  };
  onShare = async (url) => {
    try {
      await Share.open({url});
    } catch (error) {
      alert(error);
    }
  };

  createShotRef = (ref) => {
    this.shooter = ref;
  };
  render() {
    return (
      <ViewShot ref={this.createShotRef}>
      <ImageBackground
        resizeMode={'cover'}
        source={this.backgroundImage}
        style={styles.backgroundStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
            <View style={styles.prognosticContainer}>
              <Prognostic
                defaultTeam={this.team1Initial}
                navigation={this.props.navigation}
              />
              <Prognostic
                reverse
                defaultTeam={this.team2Initial}
                navigation={this.props.navigation}
              />
            </View>
            <View style={styles.footballImageContainer}>
              <Image
                resizeMode="cover"
                style={styles.footballImage}
                source={this.championsLeagueLogo}
              />
              <View style={styles.separatorContainer}>
                <Text style={styles.separator}>-</Text>
              </View>
            </View>
        </ScrollView>
        <TouchableOpacity onPress={this.shoot} style={styles.capturer}>
          <Text style={styles.capturerText}>{'CAPTURE'}</Text>
        </TouchableOpacity>
      </ImageBackground>
      </ViewShot>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
    width: '100%',
  },
  capturer: {
    marginBottom: '20%',
    backgroundColor: colors.transparentChampions,
    height: 40,
    width: 80,
    shadowColor: colors.text,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },
  capturerText: {
    color: colors.background,
  },
  separator: {
    fontWeight: '900',
    fontSize: 30,
    color: colors.background,
  },
  separatorContainer: {
    marginTop: '5%',
  },
  footballImage: {
    borderRadius: 25,
    height: 30,
    marginTop: '15%',
    width: 30,
  },
  footballImageContainer: {
    position: 'absolute',
    width: '99%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  prognosticContainer: {
    marginTop: '20%',
    width: '99%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 300,
  },
});
