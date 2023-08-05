import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ItemProps = {
  id: number;
  title: string;
};

interface CardData {
  data: ItemProps;
  first: number;
}

export default function Item({data, first, drag}: CardData) {
  const [itemChecked, setItemChecked] = useState(false);

  function checkItem() {
    setItemChecked(!itemChecked);
  }

  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={checkItem}
      style={[
        styles.card,
        {backgroundColor: data.id === first ? '#3867DF' : '#555'},
      ]}>
      <Text style={styles.title}>{data.title}</Text>
      <View
        style={[
          styles.box,
          {backgroundColor: itemChecked ? '#46d64d' : '#ddd'},
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 2,
  },
});
