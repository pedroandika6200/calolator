import { useState, useEffect } from 'react';
import { StyleSheet, Platform, ScrollView, Pressable, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen({route}) {
  const [ks, setKs] = useState(0);
  const [ks1, setKs1] = useState(0);
  const [ts, setTs] = useState(0);
  const [ts1, setTs1] = useState(0);
  const [ket, setKet] = useState('')

  useEffect (() => {
    setKs(route.params.ideal-500);
    setKs1(route.params.ideal-1000);
    setTs(route.params.ideal+500);
    setTs1(route.params.ideal+1000);
    if(route.params.bmi < 17){
      setKet('sangat kurus. Segera tambahkan asupan kalori anda agar berat anda bertambah.')
    }
    else if(route.params.bmi >= 17 && route.params.bmi <18.5){
      setKet('kurus. Tambahkan sedikit asupan kalori anda agar berat anda bertambah.')
    }
    else if(route.params.bmi >= 18.5 && route.params.bmi <25){
      setKet('normal. Anda memiliki berat badan yang ideal, jaga asupan kalori anda.')
    }
    else if(route.params.bmi >= 25 && route.params.bmi <27){
      setKet('gemuk. Kurangi sedikit asupan kalori anda agar berat anda berkurang.')
    }
    else if(route.params.bmi >= 27){
      setKet('sangat gemuk. Segera kurangi asupan kalori anda agar berat anda berkurang.')
    }
  })

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.inner}>
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title1}>Keterangan</Text>
      <View style={styles.separator} lightColor="black" darkColor="black" />
      <View style={styles.content}>
        <Text style={styles.title}>Usia : {route.params.age} tahun</Text>
        <Text style={styles.title}>Berat Badan : {route.params.weight} kg</Text>
        <Text style={styles.title}>Tinggi Badan : {route.params.height} cm</Text>
        <Text style={styles.title}>Jenis Kelamin : {route.params.gender}</Text>
        
      </View>
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title1}>Body Mass Index (BMI)</Text>
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.content}>Body Mass Index (BMI) atau Indeks Massa Tubuh (IMT) adalah salah satu cara untuk mencapai kesetimbangan energi. Kesetimbangan energi dapat dicapai jika makanan yang dikonsumsi dapat menghasilkan energi dalam jumlah yang sama dengan energi yang dikeluarkan.</Text>
      <View style={styles.content}>
        <Text></Text>
        <Text style={styles.title}>BMI anda adalah {route.params.bmi.toFixed(2)} . Anda memiliki berat badan yang termasuk {ket}</Text>
      </View>
      
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.title1}>Basal Metabolic Rate (BMR)</Text>
      <View style={styles.separator} lightColor="black" darkColor="black" />
        <Text style={styles.content}>Basal Metabolic Rate (BMR) atau Angka Metabolisme Basal (AMB) adalah kebutuhan minimal energi untuk melakukan proses tubuh vital. Proses tubuh vital meliputi mempertahankan tonus otot, sistem peredaran darah, pernapasan, metabolisme sel, dan mempertahankan suhu tubuh. Ada beberapa faktor yang mempengaruhi BMR, antara lain jenis kelamin, umur, ukuran tubuh (berat badan), komposisi tubuh, tingkat kesehatan, suhu lingkungan, suhu tubuh, aktivitas, sekresi hormon, status gizi, kebiasaan merokok, dan keadaan hamil dan menyusui.</Text>
      <View style={styles.content}>
        <Text></Text>
      <Text style={styles.title}>BMR anda adalah {route.params.bmr.toFixed(2)} kkal perharinya.</Text>
        <Text></Text>
      <Text style={styles.title2}>Konsumsi kalori ideal anda adalah {route.params.ideal.toFixed(2)} kkal perharinya.</Text>
      
      <Text style={styles.title2}>Untuk BB - 0,5 kg per minggu konsumsi {ks.toFixed(2)} kkal perharinya.</Text>
      <Text style={styles.title2}>Untuk BB - 1 kg per minggu konsumsi {ks1.toFixed(2)} kkal perharinya.</Text>
      <Text style={styles.title2}>Untuk BB + 0,5 kg per minggu konsumsi {ts.toFixed(2)} kkal perharinya.</Text>
      <Text style={styles.title2}>Untuk BB + 1 kg per minggu konsumsi {ts1.toFixed(2)} kkal perharinya.</Text>
      </View>

    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  content: {
    alignItems: 'baseline',
    backgroundColor: 'lightgreen',
    paddingHorizontal: 30,
    textAlign: 'justify',
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
  title2: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
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
