import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const CourtModal = ({visible,court}) => {
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
    <Modal style={styles.modalBackground} transparent visible={modalVisible}>
      <Text>{court.title}</Text>

    </Modal>
  )


}

const styles = StyleSheet.create({
  modalBackground:{
    flex:1,
    width: 50
  }
})

export default CourtModal