import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const COLUMNS = 2;
const itemWidth = screenWidth / COLUMNS - 15;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  scrollView: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.accent,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  sectionTitleWithMargin: {
    fontSize: 18,
    color: Colors.accent,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    marginTop: 20
  },
  rowFlatList: {
    marginVertical: 10
  },
  loadingFooter: {
    height: 200,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  gridLoadingFooter: {
    padding: 20
  },
  heroContainer: {
    height: 500,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 70,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  heroVideoContainer: {
    flex: 1
  },
  heroVideo: {
    ...StyleSheet.absoluteFillObject
  },
  heroButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroImageBackground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  heroLogoImage: {
    ...StyleSheet.absoluteFillObject
  },
  heroContent: {
    padding: 20,
    alignItems: 'center'
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroTags: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  myListButton: {
    backgroundColor: 'rgba(68,68,68,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 5
  },
  whiteText: {
    color: '#fff'
  },
  gridItem: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridItemImage: {
    height: 200,
    width: itemWidth
  },
  gridItemOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});