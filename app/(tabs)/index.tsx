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

  const COLORS = {
    Saladcolor: '#50C878', //salad color
    Sandwichcolor: '#b78b43', //sandwich color
    Appetizercolor: '#FFC0CB' //appetizer color

  }

const menuItems = [
  { id: 1, name: "Chicken Strips", price: 16, color: COLORS.Appetizercolor },
  { id: 2, name: "Potato Skins", price: 20, color: COLORS.Appetizercolor },
  { id: 3, name: "Goat Cheese Baguette", price: 23, color: COLORS.Appetizercolor },
  { id: 4, name: "Z Plate", price: 36 },
  { id: 5, name: "French Cheese Plate", price: 33 },
  { id: 6, name: "Crab Cake Appetizer", price: 30, color: COLORS.Appetizercolor },
  { id: 7, name: "Steamed Clams/Mussels Appetizer", price: 30, color: COLORS.Appetizercolor },
  { id: 8, name: "Roasted Garlic Bulbs", price: 14, color: COLORS.Appetizercolor },
  { id: 9, name: "Basket of Fries", price: 9, color: COLORS.Appetizercolor },
  { id: 10, name: "House Salad", price: 9, color: COLORS.Saladcolor },
  { id: 11, name: "Basket of Bread and Butter", price: 9, color: COLORS.Sandwichcolor },
  { id: 12, name: "Prosicutto Omelette", price: 23 },
  { id: 13, name: "Bacon Omelette", price: 23 },
  { id: 14, name: "Pork Omelette", price: 23 },
  { id: 15, name: "Brie Omelette", price: 23 },
  { id: 16, name: "Crab Cake Omelette", price: 26 },
  { id: 17, name: "Goat Cheese Omelette", price: 23 },
  { id: 18, name: "Quiche Florentine", price: 22 },
  { id: 19, name: "Quiche Lorraine", price: 22 },
  { id: 20, name: "Torte de Paris", price: 23 },
  { id: 21, name: "Eggs", price: 21 },
  { id: 22, name: "Steak and Eggs", price: 40 },
  { id: 23, name: "Croque Monsieur", price: 23, color: COLORS.Sandwichcolor },
  { id: 24, name: "Croque Madame", price: 24, color: COLORS.Sandwichcolor },
  { id: 25, name: "Grilled Chicken Sandwich", price: 24, color: COLORS.Sandwichcolor },
  { id: 26, name: "Sausage Sandwich", price: 24, color: COLORS.Sandwichcolor },
  { id: 27, name: "Salmon Sandwich", price: 30, color: COLORS.Sandwichcolor },
  { id: 28, name: "Seabass Sandwich", price: 30, color: COLORS.Sandwichcolor },
  { id: 29, name: "French Quickie", price: 21, color: COLORS.Sandwichcolor },
  { id: 30, name: "Prosciutto Brie Sandwich", price: 25, color: COLORS.Sandwichcolor },
  { id: 31, name: "Ham and Cheese Sandwich", price: 22, color: COLORS.Sandwichcolor },
  { id: 32, name: "Crab Cake Sandwich", price: 32, color: COLORS.Sandwichcolor },
  { id: 33, name: "Le Burger", price: 23, color: COLORS.Sandwichcolor },
  { id: 34, name: "Side of Bacon", price: 10 },
  { id: 35, name: "Side of Pasta", price: 9 },
  { id: 36, name: "Side of Duck Confit", price: 14 },
  { id: 37, name: "Side of Potatoes au Gratin", price: 10 },
  { id: 38, name: "Side of Veggies", price: 9 },
  { id: 39, name: "Side of Chicken", price: 10 },
  { id: 40, name: "Side of Crab Cake", price: 12 },
  { id: 41, name: "Mediterranean Salad", price: 24, color: COLORS.Saladcolor },
  { id: 42, name: "Walnut Salad", price: 23, color: COLORS.Saladcolor },
  { id: 43, name: "Salad de Coeur", price: 23, color: COLORS.Saladcolor },
  { id: 44, name: "Nicoise Salad", price: 30, color: COLORS.Saladcolor },
  { id: 45, name: "Large House Salad", price: 15, color: COLORS.Saladcolor },
  { id: 46, name: "Side of Salmon", price: 12 },
  { id: 47, name: "Side of Seabass", price: 12 },
  { id: 48, name: "Side of Shrimp", price: 10 },
  { id: 49, name: "Side of Scallops", price: 10 },
  { id: 50, name: "Small Fruit Plate", price: 12 },
  { id: 51, name: "Large Fruit Plate", price: 18 },
  { id: 52, name: "Add domestic cheese and baguette", price: 11 },
  { id: 53, name: "Small Soup", price: 9 },
  { id: 54, name: "Medium Soup", price: 10 },
  { id: 55, name: "Large Soup", price: 11 },
];


interface MenuItem {
  id: number;
  name: string;
  price: number;
  color?: string; //menuitem color
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
    setGratuityAmount(0);
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

const handleAddGratuity = () => {
  const gratuityPercentage = 0.18; // 18% gratuity
  const gratuityAmount = subtotal * gratuityPercentage;
  setGratuityAmount(gratuityAmount);
  setTotal(subtotal + gratuityAmount);
  setShowGratuity(true);
};

const [gratuityAmount, setGratuityAmount] = useState(0);
const [showGratuity, setShowGratuity] = useState(false);


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
      <Text style={{ fontSize: 24 }}>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text style={{ fontSize: 24 }}>Tax ({taxRate}%): ${tax.toFixed(2)}</Text>
      {gratuityAmount > 0.01 && ( //only shows gratuity if it's above 0.01
      <Text style={{ fontSize: 24 }}> {showGratuity ? 'Gratuity (18%):' : ''} ${gratuityAmount.toFixed(2)}</Text>
      )}
      <Text style={{ fontSize: 24 }}>Total: ${grandTotal.toFixed(2)}</Text>
      
      <ScrollView>
      <Grid container spacing={3} gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}>
  {menuItems.map((item) => (
    <Box key={item.id} sx={{ xs: 2, sm: 3, md: 4 }}>
      <TouchableOpacity onPress={() => handleAddItem(item)}>
        <Button variant="outlined" style={{ backgroundColor: item.color }}>
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
        <RNButton //button to add gratuity
  title="Add 18% Gratuity"
  onPress={handleAddGratuity}
  disabled={showGratuity}
/>
<RNButton //button to remove gratuity
  title="Remove Gratuity"
  onPress={() => {
    setGratuityAmount(0);
    setShowGratuity(false);
    setTotal(total - gratuityAmount);
  }}
/>
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