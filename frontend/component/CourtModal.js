import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, Pressable, View, ScrollView} from "react-native";
import Modal from "react-native-modal";
import courtService from '../services/courts'


const CourtModal = ({visible,court,setModalShowable}) => {
  const [modalVisible,setModalVisible] = useState(visible)
  const [courtPhotos,setCourtPhotos] = useState(null)

  
const Separator = () => (
  <View style={styles.separator} />
);

const toggleModal = () =>{
  if(visible){
    setModalVisible(true)
  }else{
    setModalVisible(false)
  }
}
useEffect(() =>{
  console.log(court.id)
  toggleModal()
},[visible])

  useEffect(() =>{
    if(visible){
    (async () =>{

    const photos = await courtService.fetchCourtPhotos(court.id)
    console.log(photos)
    setCourtPhotos(photos.img_url)
    })()
  }
  },[visible])

  const renderPhotos = () =>{
    if (courtPhotos)
    return(
      courtPhotos.map((image,index) =>(
        <Image
        style={styles.img}
        key={index}
        source={{uri:image}} />
      ))
    )
    return null
  }


  return(
    <Modal visible={modalVisible} 
            transparent={true} 
            animationType='slide'
            swipeDirection={["down"]}
            onSwipeComplete={() => setModalShowable(false)}>
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView 
          pagingEnabled 
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.gallery}
          >
          {renderPhotos()}
          </ScrollView>
        <Text style={styles.title}>{court.title}</Text>
        <Separator/>
        <Text style={styles.hooper}>Current Hoopers: {court.activeHoopers}</Text>
        <Pressable style={styles.button} onPress={()=> setModalShowable(false)}><Text style={styles.buttonText}>Hide</Text></Pressable>
      </View>
      </View>

    </Modal>
  )


}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    marginHorizontal:20,
    borderRadius: 20,
    paddingHorizontal:35,
    paddingTop:20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'rgba(228,239,254,.9)',
    width:370,
    height: 400

  },
  img:{
    width:320,
    height:350,
    resizeMode:'contain'
  },
  title:{
    marginTop:-45,
    fontSize:20,
    fontWeight:"bold",
    fontFamily:'serif'
  } ,
  separator: {
    width:300,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hooper:{
    fontSize:17,
    fontFamily:'serif',
    marginBottom:5
  }, 
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 38,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#54a5ed',
  },
  buttonText :{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  gallery:{
    width:320,
    height:350,
    marginTop:-50,
  },

})

export default CourtModal
