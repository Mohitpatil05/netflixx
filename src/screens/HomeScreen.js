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
    StyleSheet
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../store/movieStore';
import { userStore } from '../store/userStore';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Card from '../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default observer(function HomeScreen({ navigation }) {

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

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

    const renderRow = (row) => {
        return (
            <View key={row.rowTitle}>
                <Text style={sectionTitleStyle}>{row.rowTitle}</Text>
                <FlatList
                    data={row.movies}
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
                />
            </View>
        );
    };

    // Get hero movie from the first row and first movie
    const heroMovie = movieStore.movies[0]?.movies[0];

    // Combine all movies into one list for grid
    const allMovies = useMemo(() => {
        return movieStore.movies.flatMap(row => row.movies);
    }, [movieStore.movies]);

    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / 2 - 15; // 2 columns with spacing

    // Pagination variables
    const ITEMS_PER_PAGE = 10; // 5 rows (2 per row)
    const paginatedMovies = allMovies.slice(0, page * ITEMS_PER_PAGE);

    const loadMoreData = () => {
        if (loadingMore) return;
        if (paginatedMovies.length >= allMovies.length) return;

        setLoadingMore(true);
        setTimeout(() => {
            setPage(prev => prev + 1);
            setLoadingMore(false);
        }, 2000); // 2 seconds loader
    };

    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={{
            flex: 1,
            margin: 5,
            borderRadius: 8,
            overflow: 'hidden',
        }}>
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
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />


            <ScrollView>
                <Header onLogout={handleLogout} />
                {/* HERO SECTION */}
                {heroMovie && (
                    <View style={{
                        height: 500,
                        marginBottom: 10,
                        width: "90%",
                        alignSelf: 'center',
                        marginTop: 70,
                        borderRadius: 16,
                        overflow: 'hidden',  // important for rounded corners
                        backgroundColor: '#000'
                    }}>
                        <ImageBackground
                            source={{ uri: heroMovie.imageUrl }}
                            style={{ flex: 1, justifyContent: 'flex-end' }}
                            resizeMode="cover"
                        >
                            {/* Dark overlay inside the card */}
                            <View style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: 'rgba(0,0,0,0.4)'
                            }} />

                            {/* Content */}
                            <View style={{
                                padding: 20,
                                alignItems: 'center'
                            }}>
                                {/* Movie Title */}
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginBottom: 10
                                }}>
                                    {heroMovie.title}
                                </Text>

                                {/* Tags */}
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    marginBottom: 20
                                }}>
                                    {heroMovie.tags?.join(' • ')}
                                </Text>

                                {/* Buttons */}
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#fff',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 6,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 8
                                    }}>
                                        <Ionicons name="play" size={20} color="#000" />
                                        <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Play</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        backgroundColor: 'rgba(68,68,68,0.9)',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 6,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 8
                                    }}>
                                        <Ionicons name="add" size={20} color="#fff" />
                                        <Text style={{ fontWeight: 'bold', marginLeft: 5, color: '#fff' }}>My List</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )}


                {/* Render horizontal rows */}
                {movieStore.movies.map((row) => renderRow(row))}

                {/* GRID SECTION */}
                <Text style={[sectionTitleStyle, { marginTop: 20 }]}>All Movies</Text>
                <FlatList
                    data={paginatedMovies}
                    keyExtractor={(item) => item.id}
                    renderItem={renderGridItem}
                    numColumns={2}
                    scrollEnabled={false} // scroll with parent ScrollView
                    initialNumToRender={ITEMS_PER_PAGE}
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
