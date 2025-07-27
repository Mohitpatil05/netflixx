// src/screens/Home/components/HeroSection.js
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles';

export default function HeroSection({ heroMovie, isPlaying, setIsPlaying, loading, setLoading }) {
    if (!heroMovie) return null;

    return (
        <View style={styles.heroContainer}>
            {isPlaying ? (
                <View style={styles.heroVideoContainer}>
                    <Video
                        source={require('../../../assets/videos/trailer.mp4')}
                        style={styles.heroVideo}
                        resizeMode="cover"
                        paused={!isPlaying}
                        onEnd={() => setIsPlaying(false)}
                        repeat={false}
                        controls={false}
                    />
                    <View style={styles.heroButtonWrapper}>
                        <TouchableOpacity
                            style={styles.pauseButton}
                            onPress={() => setIsPlaying(false)}
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
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                >
                    {loading && (
                        <FastImage
                            source={require('../../../assets/images/logo.png')}
                            style={styles.heroLogoImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    )}
                    <View style={styles.heroImageOverlay} />

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>{heroMovie.title}</Text>
                        <Text style={styles.heroTags}>{heroMovie.tags?.join(' • ')}</Text>
                        <View style={styles.heroButtonsContainer}>
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => setIsPlaying(true)}
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
    );
}
