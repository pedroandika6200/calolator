import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function TabTwoScreen() {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  const getUserData = async () => {
    try {
      let response = await fetch(
        'https://calolator.000webhostapp.com/getlistmakanan.php'
      );
      let json = await response.json();
      setFilterData(json.data);
      setMasterData(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUserData();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.nama ? item.nama.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  }

  const renderItem = ({ item }) => {
    return (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            padding: 5,
            paddingBottom: 10,
          }}>
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={{uri:item.gambar}} style={styles.Image} />
              </View>
              <View style={{flex: 1,}}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nama}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.kalori} kalori per porsi</Text>
                <Text></Text>
                <Text>Terbuat dari {item.bahan}</Text>
              </View>
            </View>
        </View>
    );
  };

  return (
    <View style={{justifyContent: "flex-end", flex: 1, backgroundColor: 'lightgreen',}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={search}
          placeholder="Cari Makanan"
          onChangeText={(text) => searchFilter(text)}
        />
        <View style={styles.separator} />
      </View>
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.flatlist}>
      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen'
  },
  flatlist: {
    backgroundColor: 'lightgreen'
  },
  Image: {
    margin:5,
    width: 120,
    height: 120,
    marginLeft: 10,
    borderRadius: 20
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    marginTop: 10,
    height: 50,
    width: 300,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 25,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  separator: {
    marginVertical: 10,
  },
});
