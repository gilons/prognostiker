import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PImage, { rounder } from '../../../components/PImage';
import colors from '../../../meta/colors';

export default function Teams(props) {
    const { selectItem, data } = props
    const renderItem = ({ item, index }) => {
        const select = () => {
            selectItem(item)
        }
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={select}>
                <PImage source={{ uri: item.flag || item.url }} rounded small style={rounder(60,colors.transparent)} />
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.textItem}>
                    {item.name || item.country}
                </Text>
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item, index) => {
        return item.name || item.country;
    };

    const getItemLayout = (item, index) => {
        return { length: 100, offset: index * 100, index };
    };
    return (
        <View style={styles.mainContainer}>
        <StatusBar barStyle={'dark-content'} />
        <FlatList
            data={data}
            numColumns={5}
            getItemLayout={getItemLayout}
            columnWrapperStyle={styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            style={styles.mainContainer}
            renderItem={renderItem}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        height: '100%',
        alignSelf:'center',
        width: '98%',
        flex: 1,
    },
    contentContainerStyle:{
        justifyContent: 'space-between',
        flexDirection:'row'
    },  
    textItem: {
        textAlign: 'left',
    },
    itemContainer: {
        maxWidth: '20%',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
