import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// Define your menu items as an array of objects
const menuItems = [
  { id: 1, name: "French Crepes", price: 20 },
  { id: 2, name: "French Toast", price: 20 },
  { id: 3, name: "French Quickie", price: 21 },
  { id: 4, name: "Fresh Fruit", price: 12 },
  { id: 5, name: "Grande Fresh Fruit", price: 18 },
  { id: 6, name: "Eggs Benedict", price: 21 },
];

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export default function Index() {
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  const handleAddItem = (item: MenuItem) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const handleRemoveLastItem = () => {
    if (selectedItems.length > 0) {
      const lastItem = selectedItems[selectedItems.length - 1];
      setSelectedItems((prevItems) => prevItems.slice(0, -1));
      setTotal((prevTotal) => prevTotal - lastItem.price);
    }
  };

  const handleResetTotal = () => {
    setSelectedItems([]);
    setTotal(0);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Total: ${total.toFixed(2)}</Text>
      {menuItems.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleAddItem(item)}>
          <Text>{item.name} - ${item.price}</Text>
        </TouchableOpacity>
      ))}
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <TouchableOpacity onPress={handleRemoveLastItem}>
        <Button variant="contained">Undo</Button>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleResetTotal}>
          <Button variant="contained" startIcon={<DeleteIcon />}>Reset Total</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}