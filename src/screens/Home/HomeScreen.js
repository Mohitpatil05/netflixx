// src/screens/Home/HomeScreen.js
import React, { useMemo, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../store/movieStore';
import { userStore } from '../../store/userStore';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HomeSections/HeroSection';
import MovieRow from '../../components/HomeSections/MovieRow';
import MovieGrid from '../../components/HomeSections/MovieGrid';
import { styles } from './styles';

export default observer(function HomeScreen({ navigation }) {
    const COLUMNS = 2;
    const VERTICAL_ROWS_TO_LOAD = 3;
    const HORIZONTAL_CARDS_TO_LOAD = 3;
    const MOVIES_PER_PAGE = COLUMNS * VERTICAL_ROWS_TO_LOAD;
    const ROWS_PER_PAGE = 5;

    const [rowPage, setRowPage] = useState(1);
    const [moviePage, setMoviePage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [heroLoading, setHeroLoading] = useState(true);
    const [rowItemsCount, setRowItemsCount] = useState({});
    const [loadingRows, setLoadingRows] = useState({});
    const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);
    const [playingVideoUrl, setPlayingVideoUrl] = useState(null);

    const heroMovie = movieStore.movies[0]?.movies[0];
    const paginatedRows = movieStore.movies.slice(0, rowPage * ROWS_PER_PAGE);

    const allMovies = useMemo(() => {
        return movieStore.movies.flatMap(row => row.movies);
    }, [movieStore.movies]);

    const paginatedMovies = allMovies.slice(0, moviePage * MOVIES_PER_PAGE);

    const handleLogout = async () => {
        await userStore.logout();
        navigation.replace('Login');
    };

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

    const renderRow = (row) => {
        const currentCount = rowItemsCount[row.rowTitle] || HORIZONTAL_CARDS_TO_LOAD;
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
            <MovieRow
                key={row.rowTitle}
                row={row}
                currentCount={currentCount}
                loading={loadingRows[row.rowTitle]}
                onLoadMore={handleEndReached}
                setPlayingVideoUrl={setPlayingVideoUrl}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView onMomentumScrollEnd={loadMoreData} scrollEventThrottle={400}>
                <Header onLogout={handleLogout} />
                <HeroSection
                    heroMovie={heroMovie}
                    isPlaying={isHeroVideoPlaying}
                    setIsPlaying={setIsHeroVideoPlaying}
                    loading={heroLoading}
                    setLoading={setHeroLoading}
                />
                {paginatedRows.map((row) => renderRow(row))}
                <MovieGrid
                    movies={paginatedMovies}
                    loading={loadingMore}
                    onLoadMore={loadMoreData}
                    heroLoading={heroLoading}
                    setHeroLoading={setHeroLoading}
                />
            </ScrollView>
        </View>
    );
});
