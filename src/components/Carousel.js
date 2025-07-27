import React from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Carousel({ data }) {
    return (
        <FlatList
            horizontal
            data={data}
            keyExtractor={(item) => item.id}
            pagingEnabled
            renderItem={({ item }) => (
                <View style={{ width, height: 200 }}>
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} />
                </View>
            )}
        />
    );
}
