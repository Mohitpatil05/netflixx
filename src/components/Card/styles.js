import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
  },
  top10Container: {
    width: 140,
  },
  regularContainer: {
    width: 120,
  },
  rankText: {
    position: 'absolute',
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  placeholderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  titleText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  }
});