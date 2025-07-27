import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

export default function Card({ item, isTop10 = false, rank }) {
    const [loading, setLoading] = useState(true);

    return (
        <TouchableOpacity style={[styles.cardContainer, isTop10 ? styles.top10Container : styles.regularContainer]}>
            {isTop10 && (
                <Text style={styles.rankText}>
                    {rank}
                </Text>
            )}

            <View style={styles.imageContainer}>
                {/* Placeholder logo when loading */}
                {loading && (
                    <FastImage
                        source={require('../../assets/images/logo.png')}
                        style={styles.placeholderImage}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                )}

                {/* Actual image */}
                <FastImage
                    source={{ uri: item.imageUrl }}
                    style={styles.cardImage}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>

            {!isTop10 && (
                <Text
                    style={styles.titleText}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
