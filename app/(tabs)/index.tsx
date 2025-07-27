import { Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button as RNButton } from 'react-native';
import { Alert, ScrollView } from 'react-native';
import { Box, Grid, Button, MenuItem, Modal, ButtonBase } from '@mui/material';
import { blueGrey } from "@mui/material/colors";
import AntDesign from '@expo/vector-icons/AntDesign';




// menu colors

  const COLORS = {
    Saladcolor: '#50C878', //salad color
    Sandwichcolor: '#ac9f75', //sandwich color
    Appetizercolor: '#FFC0CB', //appetizer color
    Omelettecolor: '#fef65b' //omelette color

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
  { id: 12, name: "Prosicutto Omelette", price: 23, color: COLORS.Omelettecolor },
  { id: 13, name: "Bacon Omelette", price: 23, color: COLORS.Omelettecolor },
  { id: 14, name: "Pork Omelette", price: 23, color: COLORS.Omelettecolor },
  { id: 15, name: "Brie Cheese Omelette", price: 23, color: COLORS.Omelettecolor },
  { id: 16, name: "Crab Cake Omelette", price: 26, color: COLORS.Omelettecolor },
  { id: 17, name: "Goat Cheese Omelette", price: 23, color: COLORS.Omelettecolor },
  { id: 18, name: "Quiche Florentine", price: 22 },
  { id: 19, name: "Quiche Lorraine", price: 22 },
  { id: 20, name: "Torte de Paris", price: 23 },
  { id: 21, name: "Eggs", price: 21, color: COLORS.Omelettecolor },
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
  const [taxRate, setTaxRate] = useState(7.75); // default tax rate
  const [newTaxRate, setNewTaxRate] = useState('');

  const handleAddItem = (item: MenuItem) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + item.price);
  };

const handleRemoveLastItem = () => {
  if (selectedItems.length > 0) {
    const lastItem = selectedItems[selectedItems.length - 1];
    const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0) - lastItem.price;
    const taxAmount = subtotal * taxRate / 100;
    const gratuityAmount = showGratuity ? subtotal * 0.18 : 0;
    const newTotal = subtotal + taxAmount;
    const finalTotal = newTotal + (gratuityAmount / (1 + (taxRate / 100)));
    setGratuityAmount(gratuityAmount);
    setTotal(finalTotal);
    setSelectedItems((prevItems) => prevItems.slice(0, -1));
  }
};

const handleResetTotal = () => {
  setSelectedItems([]);
  const preTaxAmount = 0;
  const taxAmount = 0;
  setTotal(preTaxAmount + taxAmount);
  setGratuityAmount(0);
  setShowGratuity(false);
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

/*const handleAddGratuity = () => {
  const preTaxAmount = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const gratuityPercentage = 0.18; // 18% gratuity
  const gratuityAmount = preTaxAmount * gratuityPercentage;
  setGratuityAmount(gratuityAmount);
  setTotal(preTaxAmount + gratuityAmount + (preTaxAmount * taxRate / 100));
  setShowGratuity(true);
}; */

const [gratuityAmount, setGratuityAmount] = useState(0);
const [showGratuity, setShowGratuity] = useState(false);


const handleGratuity = () => {
  if (showGratuity) {
    // Remove gratuity
    const preTaxAmount = selectedItems.reduce((acc, item) => acc + item.price, 0);
    const taxAmount = preTaxAmount * taxRate / 100;
    setTotal(preTaxAmount + taxAmount);
    setGratuityAmount(0);
  } else {
    // Add gratuity
    const preTaxAmount = selectedItems.reduce((acc, item) => acc + item.price, 0);
    const gratuityPercentage = 0.18; // 18% gratuity
    const gratuityAmount = preTaxAmount * gratuityPercentage;
    setGratuityAmount(gratuityAmount);
    setTotal(preTaxAmount + gratuityAmount + (preTaxAmount * taxRate / 100));
  }
  setShowGratuity(!showGratuity);
};

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * (taxRate / 100);
  if (isNaN(tax)) {
  Alert.alert('Warning', 'Invalid calculation'); //NaN checks
}
  const grandTotal = subtotal + tax +gratuityAmount;
  if (isNaN(grandTotal)) {
  Alert.alert('Warning', 'Invalid calculation');
}



  return (
    <View className=""
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 12 }}>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text style={{ fontSize: 12 }}>Tax ({taxRate}%): ${tax.toFixed(2)}</Text>
      {gratuityAmount > 0.01 && ( //only shows gratuity if it's above 0.01
      <Text style={{ fontSize: 14 }}> {showGratuity ? 'Gratuity (18%):' : ''} ${gratuityAmount.toFixed(2)}</Text>
      )}
      <Text style={{ fontSize: 16 }}>Total: ${grandTotal.toFixed(2)}</Text>
      <ScrollView>
      <Grid container spacing={1} gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}>
  {menuItems.map((item) => (
    <Box key={item.id} sx={{ xs: 2, sm: 3, md: 4 }}>
      <TouchableWithoutFeedback onPress={() => handleAddItem(item)}>
        <Button variant="outlined" style={{ backgroundColor: item.color, opacity: 1 }} disableRipple={true}>
          {item.name} - ${item.price}
        </Button>
      </TouchableWithoutFeedback>
    </Box>
  ))}
</Grid>
      </ScrollView>
      <View
      style={{
        justifyContent: "flex-start"
      }}>
        <TouchableWithoutFeedback onPress={handleRemoveLastItem}>
          <Button variant="contained" color ="secondary" startIcon={ <AntDesign name="back" size={24} color="black" /> } disableRipple={true}>Undo</Button>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={handleResetTotal}>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} disableRipple={true}>Reset Total</Button>
        </TouchableWithoutFeedback>
        <Button style={{ backgroundColor: "#ADD8E6" }} disableRipple={true} onClick={handleGratuity}>
  {showGratuity ? 'Remove 18% Gratuity' : 'Add 18% Gratuity'}
</Button>
        <View className="" style={{ flexDirection: "row" }}>
          <TextInput
            value={newTaxRate}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9.]/g, '');
              setNewTaxRate(numericText);
            }}
            placeholder="Edit Tax Rate"
            keyboardType="decimal-pad"
          />
          <RNButton title="Update Tax Rate" color="green" onPress={handleUpdateTaxRate} />
        </View>
      </View>
    </View>
  );
}