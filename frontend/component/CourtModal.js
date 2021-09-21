import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, Pressable, View, ImageBackgroundBase } from "react-native";


const CourtModal = ({visible,court,setModalShowable}) => {
  const [modalVisible,setModalVisible] = useState(visible)

  
const Separator = () => (
  <View style={styles.separator} />
);


  useEffect(() =>{
    toggleModal()
  },[visible])

   const toggleModal = () =>{
     if(visible){
       setModalVisible(true)
     }else{
       setModalVisible(false)
     }
   }

  return(
    <Modal   visible={modalVisible} transparent={true} animationType='slide'>
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={styles.img}
          source={{uri:'https://www.noozhawk.com/images/made/images/uploads/042120-SBHS-Peabody-Stadium-4-bh-1600_1320_880_80_c1.jpg'}}
          resizeMode ='contain'
          />
        <Text style={styles.title}>{court.title}</Text>
        <Separator/>

        <Text>{court.activeHoopers}</Text>
        <Pressable onPress={()=> setModalShowable(false)}><Text>Hide</Text></Pressable>
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
    backgroundColor: "white",
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
    backgroundColor: '#E4EFFE',
    width:370,
    height: 400

  },
  img:{
    marginTop:-50,
    width:320,
    height:350,
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

})

export default CourtModal
