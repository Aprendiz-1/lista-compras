import {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ItemProps = {
  id: number;
  title: string;
};

interface CardData {
  data: ItemProps;
  first: number;
  remove: (id: number) => void;
}

export default function Item({data, first, drag, remove}: CardData) {
  const animation = useRef(new Animated.Value(0)).current;
  const [itemChecked, setItemChecked] = useState(false);

  function checkItem() {
    setItemChecked(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      remove(data.id);
    });
  }

  return (
    <TouchableOpacity onLongPress={drag}>
      <Animated.View
        style={[
          styles.card,
          {backgroundColor: data.id === first ? '#3867DF' : '#555'},
          {
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.leftContent}>
          <MaterialCommunityIcons name="drag-vertical" size={25} color="#fff" />
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <TouchableOpacity onPress={checkItem} style={styles.box}>
          {itemChecked && (
            <Ionicons name="checkmark-outline" size={15} color="#222" />
          )}
        </TouchableOpacity>
      </Animated.View>
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
    paddingLeft: 8,
    paddingRight: 18,
    marginBottom: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },
  box: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
});
