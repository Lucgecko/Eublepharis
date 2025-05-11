import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button as RNButton } from 'react-native';
import { Alert } from 'react-native';
import { Box, Grid, Button } from '@mui/material';
import { ScrollView } from 'react-native';
import { Modal, MenuItem } from '@mui/material';


// A point of sale system by Lucgecko@gmail.com


// menu items
const menuItems = [
  { id: 1, name: "Chicken Strips", price: 16 },
  { id: 2, name: "Potato Skins", price: 20 },
  { id: 3, name: "Goat Cheese Baguette", price: 23 },
  { id: 4, name: "Z Plate", price: 36 },
  { id: 5, name: "French Cheese Plate", price: 33 },
  { id: 6, name: "Crab Cake", price: 0 },
  { id: 7, name: "Steamed Clams/Mussels", price: 30 },
  { id: 8, name: "Roasted Garlic Bulbs", price: 14 },
  { id: 9, name: "Basket of Fries", price: 9 },
  { id: 10, name: "House Salad", price: 9 },
  { id: 11, name: "Basket of Bread and Butter", price: 9 },
  { id: 12, name: "Prosicutto Omelette", price: 23 },
  { id: 13, name: "Bacon Omelette", price: 23 },
  { id: 14, name: "Pork Omelette", price: 23 },
  { id: 15, name: "Brie Omelette", price: 23 },
  { id: 16, name: "Crab Cake Omelette", price: 26 },
  { id: 17, name: "Goat Cheese Omelette", price: 23 },
  { id: 18, name: "Quiche Florentine", price: 22 },
  { id: 19, name: "Quiche Lorraine", price: 22 },
  { id: 20, name: "Quiche Lorraine", price: 22 },
];


interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export default function Index() {
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [taxRate, setTaxRate] = useState(7.25); // default tax rate
  const [newTaxRate, setNewTaxRate] = useState('');

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

 const handleUpdateTaxRate = () => {
  if (newTaxRate !== '') {
    const taxRateValue = parseFloat(newTaxRate);
    if (isNaN(taxRateValue)) {
      Alert.alert('Warning', 'Invalid tax rate value');
    } else {
      setTaxRate(taxRateValue);
      setNewTaxRate('');
    }
  }
};




  const subtotal = total;
  const tax = subtotal * (taxRate / 100);
  if (isNaN(tax)) {
  Alert.alert('Warning', 'Invalid calculation'); //NaN checks
}
  const grandTotal = subtotal + tax;
  if (isNaN(grandTotal)) {
  Alert.alert('Warning', 'Invalid calculation');
}

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text>Tax ({taxRate}%): ${tax.toFixed(2)}</Text>
      <Text>Total: ${grandTotal.toFixed(2)}</Text>
      <ScrollView>
      <Grid container spacing={2} gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}>
  {menuItems.map((item) => (
    <Box key={item.id} sx={{ xs: 2, sm: 3, md: 4 }}>
      <TouchableOpacity onPress={() => handleAddItem(item)}>
        <Button variant="contained">
          {item.name} - ${item.price}
        </Button>
      </TouchableOpacity>
    </Box>
  ))}
</Grid>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
        <TouchableOpacity onPress={handleRemoveLastItem}>
          <Button variant="contained" color ="secondary">Undo</Button>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleResetTotal}>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Reset Total</Button>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ width: 82, height: 40, borderColor: 'green', borderWidth: 1 }}
            value={newTaxRate}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9.]/g, '');
              setNewTaxRate(numericText);
            }}
            placeholder="Edit Tax Rate"
            keyboardType="numeric"
          />
          
          <RNButton title="Update Tax Rate" color="green" onPress={handleUpdateTaxRate} />
        </View>
      </View>
    </View>
  );
}