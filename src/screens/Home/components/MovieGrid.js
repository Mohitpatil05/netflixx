// src/screens/Home/components/MovieGrid.js
import React from 'react';
import { View, FlatList, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../../constants/Colors';
import { styles } from '../styles';

export default function MovieGrid({ movies, loading, onLoadMore, heroLoading, setHeroLoading }) {
    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={styles.gridItem}>
            {heroLoading && (
                <FastImage
                    source={require('../../../assets/images/logo.png')}
                    style={styles.heroLogoImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )}
            <ImageBackground
                source={{ uri: item.imageUrl }}
                style={styles.gridItemImage}
                resizeMode="cover"
                onLoadStart={() => setHeroLoading(true)}
                onLoadEnd={() => setHeroLoading(false)}
            >
                <View style={styles.gridItemOverlay} />
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <>
            <Text style={styles.sectionTitleWithMargin}>All Movies</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={renderGridItem}
                numColumns={2}
                scrollEnabled={false}
                onEndReachedThreshold={0.5}
                onEndReached={onLoadMore}
                ListFooterComponent={
                    loading ? (
                        <View style={styles.gridLoadingFooter}>
                            <ActivityIndicator size="large" color={Colors.accent} />
                        </View>
                    ) : null
                }
            />
        </>
    );
}
