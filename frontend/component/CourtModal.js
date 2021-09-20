import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const CourtModal = ({visible,court,setModalShowable}) => {
  const [modalVisible,setModalVisible] = useState(visible)

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
        <Text>{court.title}</Text>
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})

export default CourtModal
