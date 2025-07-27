import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Card({ item, isTop10 = false, rank }) {
    const [loading, setLoading] = useState(true);

    return (
        <TouchableOpacity style={{ marginHorizontal: 5, width: isTop10 ? 140 : 120 }}>
            {isTop10 && (
                <Text style={{
                    position: 'absolute',
                    fontSize: 50,
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 1,
                }}>
                    {rank}
                </Text>
            )}

            <View
                style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 8,
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    position: 'relative',
                }}
            >
                {/* Placeholder logo when loading */}
                {loading && (
                    <FastImage
                        source={require('../assets/images/logo.png')}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                )}

                {/* Actual image */}
                <FastImage
                    source={{ uri: item.imageUrl }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                    }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>

            {!isTop10 && (
                <Text
                    style={{
                        color: 'white',
                        marginTop: 5,
                        fontSize: 12,
                    }}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
