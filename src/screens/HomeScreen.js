import React, { useMemo, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../store/movieStore';
import { userStore } from '../store/userStore';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Card from '../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

export default observer(function HomeScreen({ navigation }) {
    // Constants for pagination
    const COLUMNS = 2;
    const VERTICAL_ROWS_TO_LOAD = 3;
    const HORIZONTAL_CARDS_TO_LOAD = 3;
    const MOVIES_PER_PAGE = COLUMNS * VERTICAL_ROWS_TO_LOAD;
    const ROWS_PER_PAGE = 5;

    // States for pagination & loading
    const [rowPage, setRowPage] = useState(1);
    const [moviePage, setMoviePage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [heroLoading, setHeroLoading] = useState(true);
    const [rowItemsCount, setRowItemsCount] = useState({});
    const [loadingRows, setLoadingRows] = useState({});
    const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);

    // New state for video playing
    const [playingVideoUrl, setPlayingVideoUrl] = useState(null);

    const handleLogout = async () => {
        await userStore.logout();
        navigation.replace('Login');
    };

    const sectionTitleStyle = {
        fontSize: 18,
        color: Colors.accent,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
    };

    // Render horizontal row cards with incremental loading
    const renderRow = (row) => {
        const currentCount = rowItemsCount[row.rowTitle] || HORIZONTAL_CARDS_TO_LOAD;
        const slicedMovies = row.movies.slice(0, currentCount);

        const handleEndReached = () => {
            if (currentCount >= row.movies.length) return;

            setLoadingRows(prev => ({ ...prev, [row.rowTitle]: true }));

            setTimeout(() => {
                setRowItemsCount(prev => ({
                    ...prev,
                    [row.rowTitle]: Math.min(currentCount + HORIZONTAL_CARDS_TO_LOAD, row.movies.length),
                }));
                setLoadingRows(prev => ({ ...prev, [row.rowTitle]: false }));
            }, 1500);
        };

        return (
            <View key={row.rowTitle}>
                <Text style={sectionTitleStyle}>{row.rowTitle}</Text>
                <FlatList
                    data={slicedMovies}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        // Modify Card to accept onPlayPress callback
                        if (row.type === 'top_10') {
                            return (
                                <Card
                                    item={item}
                                    isTop10
                                    rank={index + 1}
                                    onPlayPress={() => setPlayingVideoUrl()}
                                />
                            );
                        }
                        return <Card item={item} onPlayPress={() => setPlayingVideoUrl(require('../assets/videos/trailer.mp4'))} />;
                    }}
                    keyExtractor={(item) => item.id}
                    style={{ marginVertical: 10 }}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.7}
                    ListFooterComponent={loadingRows[row.rowTitle] ? (
                        <View style={{
                            height: 200,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                        }}>
                            <ActivityIndicator size="large" color={Colors.accent} />
                        </View>
                    ) : null}
                />
            </View>
        );
    };

    const heroMovie = movieStore.movies[0]?.movies[0];
    const paginatedRows = movieStore.movies.slice(0, rowPage * ROWS_PER_PAGE);

    const allMovies = useMemo(() => {
        return movieStore.movies.flatMap(row => row.movies);
    }, [movieStore.movies]);

    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / COLUMNS - 15;

    const paginatedMovies = allMovies.slice(0, moviePage * MOVIES_PER_PAGE);

    const loadMoreData = () => {
        if (loadingMore) return;
        const canLoadMoreRows = paginatedRows.length < movieStore.movies.length;
        const canLoadMoreMovies = paginatedMovies.length < allMovies.length;
        if (!canLoadMoreRows && !canLoadMoreMovies) return;
        setLoadingMore(true);
        setTimeout(() => {
            if (canLoadMoreRows) setRowPage(prev => prev + 1);
            if (canLoadMoreMovies) setMoviePage(prev => prev + 1);
            setLoadingMore(false);
        }, 1500);
    };

    const renderGridItem = ({ item }) => (
        <TouchableOpacity
            style={{
                flex: 1,
                margin: 5,
                borderRadius: 8,
                overflow: 'hidden',
            }}
        >
            <ImageBackground
                source={{ uri: item.imageUrl }}
                style={{ height: 200, width: itemWidth }}
                resizeMode="cover"
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }} />
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView onMomentumScrollEnd={loadMoreData} scrollEventThrottle={400}>
                <Header onLogout={handleLogout} />

                {/* HERO SECTION */}
                {heroMovie && (
                    <View
                        style={{
                            height: 500,
                            marginBottom: 10,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 70,
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: '#000',
                        }}
                    >
                        {isHeroVideoPlaying ? (
                            <View style={{ flex: 1 }}>
                                <Video
                                    source={require('../assets/videos/trailer.mp4')}
                                    style={StyleSheet.absoluteFillObject}
                                    resizeMode="cover"
                                    paused={!isHeroVideoPlaying}
                                    onEnd={() => setIsHeroVideoPlaying(false)}
                                    repeat={false}
                                    controls={false}
                                />

                                {/* Button wrapper at bottom */}
                                <View style={{
                                    position: 'absolute',
                                    bottom: 30,
                                    width: '100%',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#fff',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 6,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => setIsHeroVideoPlaying(false)}
                                    >
                                        <Ionicons name="pause" size={20} color="#000" />
                                        <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Pause</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ) : (
                            <ImageBackground
                                source={{ uri: heroMovie.imageUrl }}
                                style={{ flex: 1, justifyContent: 'flex-end' }}
                                resizeMode="cover"
                                onLoadStart={() => setHeroLoading(true)}
                                onLoadEnd={() => setHeroLoading(false)}
                            >
                                {heroLoading && (
                                    <FastImage
                                        source={require('../assets/images/logo.png')}
                                        style={{ ...StyleSheet.absoluteFillObject }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                )}
                                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }} />

                                <View style={{ padding: 20, alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            marginBottom: 10,
                                        }}
                                    >
                                        {heroMovie.title}
                                    </Text>

                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            textAlign: 'center',
                                            marginBottom: 20,
                                        }}
                                    >
                                        {heroMovie.tags?.join(' • ')}
                                    </Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#fff',
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                borderRadius: 6,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: 8,
                                            }}
                                            onPress={() => setIsHeroVideoPlaying(true)}
                                        >
                                            <Ionicons name="play" size={20} color="#000" />
                                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Play</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: 'rgba(68,68,68,0.9)',
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                borderRadius: 6,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: 8,
                                            }}
                                        >
                                            <Ionicons name="add" size={20} color="#fff" />
                                            <Text style={{ fontWeight: 'bold', marginLeft: 5, color: '#fff' }}>My List</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        )}
                    </View>
                )}


                {/* Render horizontal rows */}
                {paginatedRows.map((row) => renderRow(row))}

                {/* GRID SECTION */}
                <Text style={[sectionTitleStyle, { marginTop: 20 }]}>All Movies</Text>
                <FlatList
                    data={paginatedMovies}
                    keyExtractor={(item) => item.id}
                    renderItem={renderGridItem}
                    numColumns={COLUMNS}
                    scrollEnabled={false}
                    initialNumToRender={MOVIES_PER_PAGE}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreData}
                    ListFooterComponent={
                        loadingMore ? (
                            <View style={{ padding: 20 }}>
                                <ActivityIndicator size="large" color={Colors.accent} />
                            </View>
                        ) : null
                    }
                />
            </ScrollView>

        </View>
    );
});
