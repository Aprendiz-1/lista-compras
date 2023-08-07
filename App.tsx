import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './src/components/Item';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ItemProps = {
  id: number;
  title: string;
};

export default function App() {
  const ref = useRef(null);
  const [itemTitle, setItemTitle] = useState('');
  const [items, setItems] = useState<Array<ItemProps>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageData = await AsyncStorage.getItem('list_items');

      if (storageData) {
        setItems(JSON.parse(storageData));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  function addItem() {
    let data = {
      id: items.length !== 0 ? items[items.length - 1].id + 1 : 0,
      title: itemTitle,
    };

    setItems(listItems => [...listItems, data]);
    saveStorage([...items, data]);
    setItemTitle('');
  }

  function checkClearList() {
    Alert.alert('Esvaziar lista', 'Tem certeza que quer esvaziar a lista?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => clearList(),
      },
    ]);
  }

  async function clearList() {
    setItems([]);
    await AsyncStorage.clear();
  }

  function removeItem(id: number) {
    let filteredList = items.filter(allItems => allItems.id !== id);
    setItems(filteredList);
    saveStorage(filteredList);
  }

  async function saveStorage(data: Array<ItemProps>) {
    await AsyncStorage.setItem('list_items', JSON.stringify(data));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <View style={styles.inputContent}>
        <TextInput
          placeholder="Adicionar item"
          placeholderTextColor="#949494"
          value={itemTitle}
          onChangeText={e => setItemTitle(e)}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={addItem}
          disabled={itemTitle === '' ? true : false}
          style={styles.addButton}>
          <Ionicons name="send" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.itemsContent}>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 90,
            }}>
            <ActivityIndicator size={60} color="#ddd" />
          </View>
        ) : (
          <>
            {items.length === 0 ? (
              <Text style={styles.emptyList}>Nenhum item na lista</Text>
            ) : (
              <GestureHandlerRootView>
                <DraggableFlatList
                  data={items}
                  ref={ref}
                  keyExtractor={item => String(item.id)}
                  onDragEnd={({data}) => setItems(data)}
                  renderItem={({item, drag}) => (
                    <ScaleDecorator>
                      <OpacityDecorator activeOpacity={0.5}>
                        <Item
                          data={item}
                          first={items[0].id}
                          drag={drag}
                          remove={() => removeItem(item.id)}
                        />
                      </OpacityDecorator>
                    </ScaleDecorator>
                  )}
                />
              </GestureHandlerRootView>
            )}
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={checkClearList}
        disabled={items.length === 0 ? true : false}
        style={styles.clearButton}>
        <MaterialCommunityIcons
          name="checkbox-multiple-marked-outline"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  inputContent: {
    width: '100%',
    height: '22%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '78%',
    height: 55,
    color: '#222',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  addButton: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3867DF',
    borderRadius: 8,
  },
  itemsContent: {
    width: '100%',
    height: '78%',
    backgroundColor: '#333',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 25,
  },
  emptyList: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3867DF',
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
