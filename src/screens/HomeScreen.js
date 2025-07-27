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
import { observer } from 'mobx-react-lite';
import { movieStore } from '../store/movieStore';
import { userStore } from '../store/userStore';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Card from '../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

export default observer(function HomeScreen({ navigation }) {
    // Pagination constants
    const COLUMNS = 2;          // Number of columns in vertical grid
    const INITIAL_ROWS = 5;     // Number of rows to show initially
    const MOVIES_PER_PAGE = COLUMNS * INITIAL_ROWS; // 10 cards initially (5 rows * 2 columns)

    const ROWS_PER_PAGE = 5;      // For horizontal rows pagination
    const CARDS_PER_ROW = 2;      // Cards per horizontal row

    // States
    const [rowPage, setRowPage] = useState(1);
    const [moviePage, setMoviePage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [heroLoading, setHeroLoading] = useState(true);
    const [rowItemsCount, setRowItemsCount] = useState({});
    const [loadingRows, setLoadingRows] = useState({});

    // Logout handler
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

    // Render each horizontal row of movies
    const renderRow = (row) => {
        const currentCount = rowItemsCount[row.rowTitle] || CARDS_PER_ROW;
        const slicedMovies = row.movies.slice(0, currentCount);

        const handleEndReached = () => {
            if (currentCount >= row.movies.length) return;

            setLoadingRows(prev => ({ ...prev, [row.rowTitle]: true }));

            setTimeout(() => {
                setRowItemsCount(prev => ({
                    ...prev,
                    [row.rowTitle]: Math.min(currentCount + CARDS_PER_ROW, row.movies.length),
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
                        if (row.type === 'top_10') {
                            return <Card item={item} isTop10 rank={index + 1} />;
                        }
                        return <Card item={item} />;
                    }}
                    keyExtractor={(item) => item.id}
                    style={{ marginVertical: 10 }}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.7}
                    ListFooterComponent={loadingRows[row.rowTitle] ? (
                        <View
                            style={{
                                height: 200,  // match card height for vertical centering
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <ActivityIndicator size="large" color={Colors.accent} />
                        </View>
                    ) : null}
                />
            </View>
        );
    };

    // Get hero movie (top left)
    const heroMovie = movieStore.movies[0]?.movies[0];

    // Horizontal rows pagination
    const paginatedRows = movieStore.movies.slice(0, rowPage * ROWS_PER_PAGE);

    // Flatten all movies to array for grid section
    const allMovies = useMemo(() => {
        return movieStore.movies.flatMap(row => row.movies);
    }, [movieStore.movies]);

    // Dimensions and sizing for grid cards
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / COLUMNS - 15; // Margin adjustment

    // Movies slice for vertical grid based on pagination
    const paginatedMovies = allMovies.slice(0, moviePage * MOVIES_PER_PAGE);

    // Load more handler (load more rows & movies)
    const loadMoreData = () => {
        if (loadingMore) return;

        const canLoadMoreRows = paginatedRows.length < movieStore.movies.length;
        const canLoadMoreMovies = paginatedMovies.length < allMovies.length;

        if (!canLoadMoreRows && !canLoadMoreMovies) return;

        setLoadingMore(true);
        setTimeout(() => {
            if (canLoadMoreRows) {
                setRowPage(prev => prev + 1);
            }
            if (canLoadMoreMovies) {
                setMoviePage(prev => prev + 1);
            }
            setLoadingMore(false);
        }, 1500);
    };

    // Render single movie card in vertical grid
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
                        {heroLoading && (
                            <FastImage
                                source={require('../assets/images/logo.png')}
                                style={{ ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        )}

                        <ImageBackground
                            source={{ uri: heroMovie.imageUrl }}
                            style={{ flex: 1, justifyContent: 'flex-end' }}
                            resizeMode="cover"
                            onLoadStart={() => setHeroLoading(true)}
                            onLoadEnd={() => setHeroLoading(false)}
                        >
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
                    </View>
                )}

                {/* Render horizontal rows with pagination */}
                {paginatedRows.map((row) => renderRow(row))}

                {/* GRID SECTION */}
                <Text style={[sectionTitleStyle, { marginTop: 20 }]}>All Movies</Text>
                <FlatList
                    data={paginatedMovies}
                    keyExtractor={(item) => item.id}
                    renderItem={renderGridItem}
                    numColumns={COLUMNS}
                    scrollEnabled={false}
                    initialNumToRender={MOVIES_PER_PAGE} // initial 10 cards
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
