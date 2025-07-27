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
} from 'react-native';
import Video from 'react-native-video';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../store/movieStore';
import { userStore } from '../../store/userStore';
import Colors from '../../constants/Colors';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

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
                <Text style={styles.sectionTitle}>{row.rowTitle}</Text>
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
                        return <Card item={item} onPlayPress={() => setPlayingVideoUrl(require('../../assets/videos/trailer.mp4'))} />;
                    }}
                    keyExtractor={(item) => item.id}
                    style={styles.rowFlatList}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.7}
                    ListFooterComponent={loadingRows[row.rowTitle] ? (
                        <View style={styles.loadingFooter}>
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
        <TouchableOpacity style={styles.gridItem}>
            <ImageBackground
                source={{ uri: item.imageUrl }}
                style={styles.gridItemImage}
                resizeMode="cover"
            >
                <View style={styles.gridItemOverlay} />
            </ImageBackground>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView onMomentumScrollEnd={loadMoreData} scrollEventThrottle={400}>
                <Header onLogout={handleLogout} />
                {/* HERO SECTION */}
                {heroMovie && (
                    <View style={styles.heroContainer}>
                        {isHeroVideoPlaying ? (
                            <View style={styles.heroVideoContainer}>
                                <Video
                                    source={require('../../assets/videos/trailer.mp4')}
                                    style={styles.heroVideo}
                                    resizeMode="cover"
                                    paused={!isHeroVideoPlaying}
                                    onEnd={() => setIsHeroVideoPlaying(false)}
                                    repeat={false}
                                    controls={false}
                                />
                                {/* Button wrapper at bottom */}
                                <View style={styles.heroButtonWrapper}>
                                    <TouchableOpacity
                                        style={styles.pauseButton}
                                        onPress={() => setIsHeroVideoPlaying(false)}
                                    >
                                        <Ionicons name="pause" size={20} color="#000" />
                                        <Text style={styles.buttonText}>Pause</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ) : (
                            <ImageBackground
                                source={{ uri: heroMovie.imageUrl }}
                                style={styles.heroImageBackground}
                                resizeMode="cover"
                                onLoadStart={() => setHeroLoading(true)}
                                onLoadEnd={() => setHeroLoading(false)}
                            >
                                {heroLoading && (
                                    <FastImage
                                        source={require('../../assets/images/logo.png')}
                                        style={styles.heroLogoImage}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                )}
                                <View style={styles.heroImageOverlay} />

                                <View style={styles.heroContent}>
                                    <Text style={styles.heroTitle}>
                                        {heroMovie.title}
                                    </Text>
                                    <Text style={styles.heroTags}>
                                        {heroMovie.tags?.join(' • ')}
                                    </Text>
                                    <View style={styles.heroButtonsContainer}>
                                        <TouchableOpacity
                                            style={styles.playButton}
                                            onPress={() => setIsHeroVideoPlaying(true)}
                                        >
                                            <Ionicons name="play" size={20} color="#000" />
                                            <Text style={styles.buttonText}>Play</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.myListButton}>
                                            <Ionicons name="add" size={20} color="#fff" />
                                            <Text style={[styles.buttonText, styles.whiteText]}>My List</Text>
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
                <Text style={styles.sectionTitleWithMargin}>All Movies</Text>
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
                            <View style={styles.gridLoadingFooter}>
                                <ActivityIndicator size="large" color={Colors.accent} />
                            </View>
                        ) : null
                    }
                />
            </ScrollView>

        </View>
    );
});
