// src/screens/Home/components/MovieRow.js
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Card from '../Card/Card';
import Colors from '../../constants/Colors';
import { styles } from '../../screens/Home/styles';


export default function MovieRow({
    row,
    currentCount,
    loading,
    onLoadMore,
    setPlayingVideoUrl
}) {
    const slicedMovies = row.movies.slice(0, currentCount);

    return (
        <View key={row.rowTitle}>
            <Text style={styles.sectionTitle}>{row.rowTitle}</Text>
            <FlatList
                data={slicedMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <Card
                        item={item}
                        isTop10={row.type === 'top_10'}
                        rank={index + 1}
                        onPlayPress={() => setPlayingVideoUrl(require('../../assets/videos/trailer.mp4'))}
                    />
                }
                keyExtractor={(item) => item.id}
                style={styles.rowFlatList}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.7}
                ListFooterComponent={loading ? (
                    <View style={styles.loadingFooter}>
                        <ActivityIndicator size="large" color={Colors.accent} />
                    </View>
                ) : null}
            />
        </View>
    );
}
