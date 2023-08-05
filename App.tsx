import {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Item from './src/components/Item';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const ref = useRef(null);

  const [items, setItems] = useState([
    {id: 1, title: 'Arroz'},
    {id: 2, title: 'Refri'},
    {id: 3, title: 'Queijo'},
    {id: 4, title: 'Brócolis'},
  ]);

  function addItem() {}

  function removeItem() {}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <View style={styles.inputContent}>
        <TextInput
          placeholder="Adicionar item"
          placeholderTextColor="#949494"
          style={styles.input}
        />

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="send" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.itemsContent}>
        <GestureHandlerRootView>
          <DraggableFlatList
            data={items}
            ref={ref}
            keyExtractor={item => String(item.id)}
            onDragEnd={({data}) => setItems(data)}
            renderItem={({item, drag}) => (
              <ScaleDecorator>
                <OpacityDecorator activeOpacity={0.5}>
                  <Item data={item} first={items[0].id} drag={drag} />
                </OpacityDecorator>
              </ScaleDecorator>
            )}
          />
        </GestureHandlerRootView>
      </View>
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
});
