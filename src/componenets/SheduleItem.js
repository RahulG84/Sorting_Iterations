import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SheduleItem = () => {
  const sheduleUrl = 'https://fakestoreapi.com/products';

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    fetch(sheduleUrl)
      .then(resp => resp.json())
      .then(respjeson => {
        setData(respjeson);
        setOldData(respjeson);
      });
  }, []);

  const onSearch = text => {
    if (text === '') {
      setData(oldData);
    } else {
      let tempList = data.filter(item => {
        return item.title.toUpperCase().indexOf(text.toUpperCase()) > -1;
      });
      setData(tempList);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.inputAndIconView}>
        <TextInput
          style={styles.inputView}
          placeholder="search item here.."
          value={search}
          onChangeText={text => {
            onSearch(text);
            setSearch(text);
          }}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            onSearch('');
            setSearch('');
          }}>
          <Entypo name="cross" size={30} color={'black'} />
        </TouchableOpacity>
        <ScrollView style={styles.optionButton}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modalView}>
              <View style={styles.headerView}>
                <Text style={styles.headerText}>Get Sorted</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.modleCrossButton}>
                  <Entypo name="cross" size={30} color={'black'} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.modleItemView}
                onPress={() => {
                  const tempList = data.sort((a, b) =>
                    a.title > b.title ? 1 : -1,
                  );
                  setModalVisible(!modalVisible);
                  setData(tempList);
                }}>
                <Text style={styles.modleItemText}>Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modleItemView}
                onPress={() => {
                  const tempList = data.sort((a, b) => (a.id > b.id ? 1 : -1));
                  setModalVisible(!modalVisible);
                  setData(tempList);
                }}>
                <Text style={styles.modleItemText}>ID</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modleItemView}
                onPress={() => {
                  //the operator returns 1, which indicates that "b" should come before "a" in the sorted array
                  setModalVisible(!modalVisible);
                  const tempListPriceLowToHigh = data.sort((a, b) =>
                    a.price > b.price ? 1 : -1,
                  );
                  setData(tempListPriceLowToHigh);
                }}>
                <Text style={styles.modleItemText}>Low To High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modleItemView}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  const tempListPriceHighToLow = data.sort((a, b) =>
                    a.price < b.price ? 1 : -1,
                  );
                  setData(tempListPriceHighToLow);
                }}>
                <Text style={styles.modleItemText}>High To Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modleItemView}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // 1. < 0 ---- a comes first
                  // 2. =0  ----  nothing will change
                  // 3. > 0 ----  b comes first
                  const tempListRating = data.sort((a, b) => {
                    return a.rating.rate - b.rating.rate;
                  });
                  setData(tempListRating);
                }}>
                <Text style={styles.modleItemText}>Rating</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="md-options-sharp" size={35} color={'black'} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.containerView}>
            <View style={styles.mainView}>
              <View style={styles.titleAndIdView}>
                <Text style={styles.idText}>{item.id}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <View style={styles.priceAndRateView}>
                <Text style={styles.priceText}>Price: ${item.price}</Text>
                <Text style={styles.rateText}>
                  Rating: {item.rating.rate} *
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SheduleItem;

const styles = StyleSheet.create({
  containerView: {
    margin: 5,
  },
  mainView: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  titleAndIdView: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    borderWidth: 0,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    width: 320,
  },
  idText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    marginStart: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    paddingStart: 5,
  },
  priceAndRateView: {
    flexDirection: 'row',
    flex: 1,
  },
  priceText: {
    flex: 0.5,
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  rateText: {
    flex: 0.5,
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
  inputAndIconView: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputView: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    width: 310,
    fontSize: 16,
    height: 45,
    paddingLeft: 10,
  },
  searchIcon: {
    marginLeft: -40,
  },
  optionButton: {
    marginLeft: 25,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 160,
    alignContent: 'center',
    marginHorizontal: 80,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modleCrossButton: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  headerText: {
    flex: 0.5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  modleItemView: {
    alignSelf: 'flex-start',
    padding: 5,
  },
  modleItemText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
