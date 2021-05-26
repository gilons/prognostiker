import React from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import PImage, { rounder } from '../../../components/PImage';
import colors from '../../../meta/colors';
import Feather from 'react-native-vector-icons/Feather';
import { useState, useRef } from 'react';

export default function Teams(props) {

    const [search, setSearch] = useState('');
    const { selectItem, data } = props;
    const timerRef = useRef(null)
    const FilteredData = data.filter(ele => (ele.name||ele.country).toLowerCase().includes(search.toLowerCase()));
    const renderItem = ({ item, index }) => {
        const select = () => {
            selectItem(item);
        };
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={select}>
                <PImage
                    source={{ uri: item.flag || item.url }}
                    rounded
                    small
                    style={rounder(60, colors.transparent)}
                />
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
        <View style={styles.main}>
            <View style={styles.header}>
            <View style={styles.iconContainer}>
                <Feather name="arrow-left" style={styles.iconStyle} />
                </View>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.titleStyle}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}>
                        {'Select team'}
                    </Text>
                </View>
                <View>
                    <TextInput
                        placeholder={'search team'}
                        style={styles.textInput}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
            <View style={styles.mainContainer}>
                <StatusBar barStyle={'dark-content'} />
                <FlatList
                    data={FilteredData}
                    numColumns={5}
                    getItemLayout={getItemLayout}
                    columnWrapperStyle={styles.contentContainerStyle}
                    keyExtractor={keyExtractor}
                    style={styles.mainContainer}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        height: '100%',
        alignSelf: 'center',
        width: '98%',
        flex: 1,
    },
    iconContainer:{
        width:40,
    },
    main: {
        height: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
    },
    textInput: {
        fontSize: 14,
        height: 33,
        borderRadius:20,
        borderWidth: 1,
        minWidth:200
    },
    titleStyle: {
        fontSize: 23,
        fontWeight:'bold'
    },
    iconStyle: {
        fontSize: 25,
        color: 'black',
    },
    header: {
        height: 90,
        padding: 5,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-end',
        elevation: 4,
    },
    contentContainerStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
