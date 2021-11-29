import React from 'react'
import { Image, ImageBackground, View } from 'react-native'
import styles from "./styles";

const LoadingScreen = () => {
  return (
    <View>
      <ImageBackground
        source={require('../../../assets/loadingScreen/mockup.png')}
        style={styles.background}>
        <Image
          source={require('../../../assets/loadingScreen/guruji_photo.png')}
          style={styles.gurujiPic} />
        <Image
          style={styles.banner}
          source={require('../../../assets/loadingScreen/banner.gif')}
        />
      </ImageBackground>
    </View>
  )
}

export default LoadingScreen