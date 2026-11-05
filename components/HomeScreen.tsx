import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaterBottle from '../components/WaterBottle';

const DAILY_GOAL_ML: number = 2500; // Obiettivo giornaliero in mL
const STORAGE_KEY = '@water_amount_today';

export default function HomeScreen(): React.JSX.Element {
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  // 1. Carica il dato salvato quando l'app si avvia
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedValue !== null) {
          setCurrentAmount(Number(savedValue));
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
      }
    };

    loadSavedData();
  }, []);

  // 2. Funzione per aggiornare e salvare lo stato
  const updateAmount = async (value: number) => {
    setCurrentAmount(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value.toString());
    } catch (error) {
      console.error('Errore nel salvataggio dei dati:', error);
    }
  };

  const handleReset = async () => {
    await updateAmount(0);
  };

  const percentage: number = Math.min((currentAmount / DAILY_GOAL_ML) * 100, 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Idratazione Oggi</Text>
      
      <Text style={styles.counterText}>
        {(currentAmount / 1000).toFixed(2)} / {DAILY_GOAL_ML / 1000} L
      </Text>
      <Text style={styles.percentageText}>{Math.round(percentage)}% completato</Text>

      {/* Componente Borraccia */}
      <WaterBottle percentage={percentage} />

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Sposta per regolare la quantità:</Text>
        <Slider
          style={{ width: 280, height: 40 }}
          minimumValue={0}
          maximumValue={DAILY_GOAL_ML}
          step={50}
          value={currentAmount}
          onValueChange={(val: number) => updateAmount(val)}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
          thumbTintColor="#2980b9"
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Azzera Conteggio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3498db',
  },
  percentageText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetText: {
    color: '#fff',
    fontWeight: '600',
  },
});