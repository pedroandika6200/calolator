import { StyleSheet, TextInput, ScrollView, Pressable, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [activity, setActivity] = useState();
  const [bmr, setBMR] = useState(0);
  const [ideal, setIdeal] = useState(0);
  const [bmi, setBMI] = useState(0);

  useEffect (() => {
    setBMI(parseInt(weight)/((height/100)*(height/100)))
    if(gender == "Pria"){
      setBMR((88.362+(13.397*parseInt(weight))+(4.799*parseInt(height))-(5.677*parseInt(age))))
      setIdeal(bmr*activity)
    }
    else if(gender == "Wanita"){
      setBMR((447.593+(9.247*parseInt(weight))+(3.098*parseInt(height))-(4.330*parseInt(age))))
      setIdeal(bmr*activity)
    }
  })
  
  function prosesHitung (){
    if(gender == null || gender == ""){
      alert('Pilih Jenis Kelamin!');
      return;
    }
    else if(activity == null || activity == ""){
      alert('Pilih Seberapa Berat Aktivitas Anda!');
      return;
    }
    else if(weight == null || weight == "" || weight <= 0){
      alert('Masukan Berat Badan! Tidak boleh 0 atau kurang!');
      return;
    }
    else if(height == null || height == "" || height <= 0){
      alert('Masukan Tinggi Badan! Tidak boleh 0 atau kurang!');
      return;
    }
    else if(age == null || age == "" || age == 0){
      alert('Masukan Usia! Tidak boleh 0 atau kurang!');
      return;
    }
    else {
      navigation.navigate("Hasil", {ideal:ideal, bmi:bmi, bmr:bmr, activity:activity, age:age, weight:weight, height:height, gender:gender})
    }
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.inner}>
      <Text style={styles.title1}>Halo, ayo hitung konsumsi kalori idealmu sekarang</Text>
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title}>Pilih Jenis Kelamin Anda :</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Pilih Jenis Kelamin" />
          <Picker.Item label="Pria" value="Pria" />
          <Picker.Item label="Wanita" value="Wanita" />
        </Picker>

        <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title}>Pilih Level Aktivitas Anda :</Text>
        <Picker
          selectedValue={activity}
          onValueChange={(value) => setActivity(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Pilih level aktivitas anda sehari-hari" />
          <Picker.Item label="Tidak pernah olahraga dan jarang beraktivitas fisik" value={1} />
          <Picker.Item label="Hampir tidak pernah olahraga (beraktivitas ringan)" value={1.2} />
          <Picker.Item label="Jarang berolahraga (beraktivitas sedang)" value={1.3} />
          <Picker.Item label="Sering berolahraga (beraktivitas berat)" value={1.4} />
        </Picker>

      <View style={styles.separator} lightColor="black" darkColor="black" />
      <Text style={styles.title}>Masukan Berat Badan Anda : </Text>
        <TextInput
          placeholder="Masukan Berat Badan Anda"
          style={styles.textInput}
          keyboardType='numeric'
          contextMenuHidden={true}
          onChangeText={(bb) => setWeight( bb )}
        />

        <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title}>Masukan Tinggi Badan Anda : </Text>
        <TextInput
          placeholder="Masukan Tinggi Badan Anda"
          style={styles.textInput}
          keyboardType='numeric'
          contextMenuHidden={true}
          onChangeText={(tb) => setHeight( tb )}
        />

        <View style={styles.separator} lightColor="black" darkColor="black" />
      <Text style={styles.title}>Masukan Usia Anda : </Text>
        <TextInput
          placeholder="Masukan Usia Anda"
          style={styles.textInput}
          keyboardType='numeric'
          contextMenuHidden={true}
          onChangeText={(u) => setAge( u )}
        />

      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Pressable
          onPress= {prosesHitung}
          style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          })}>
          <FontAwesome
            name="calculator"
            size={50}
            color="green"
          />
          <Text style={{textAlign: "center"}}>Hitung </Text>
        </Pressable>        
    </View>
    </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  inner: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  title1: {
    paddingHorizontal: 10,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    width: 300,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  picker: {
    height: 40,
    width: 325,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    color:"#000"
  },
});
