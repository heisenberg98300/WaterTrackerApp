import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Mask } from 'react-native-svg';

// Definiamo le props del componente con TypeScript
interface WaterBottleProps {
  percentage: number; // Valore compreso tra 0 e 100
}

export default function WaterBottle({ percentage }: WaterBottleProps) {
  const width = 120;
  const height = 240;
  
  // Calcolo sicuro per evitare overflow o valori negativi
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));
  const fillHeight = (height * clampedPercentage) / 100;
  const yPosition = height - fillHeight;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Mask id="bottleMask">
          {/* Tappo */}
          <Rect x="45" y="0" width="30" height="20" rx="5" fill="#FFFFFF" />
          {/* Corpo principale */}
          <Rect x="10" y="25" width="100" height="210" rx="25" fill="#FFFFFF" />
        </Mask>
        
        {/* Sfondo borraccia vuota */}
        <Rect x="10" y="25" width="100" height="210" rx="25" fill="#E0E0E0" />
        
        {/* Livello dell'acqua animato/dinamico */}
        <Rect
          x="0"
          y={yPosition}
          width={width}
          height={fillHeight}
          fill="#3498db"
          mask="url(#bottleMask)"
        />
        
        {/* Contorno della borraccia */}
        <Rect x="10" y="25" width="100" height="210" rx="25" fill="none" stroke="#2c3e50" strokeWidth="4" />
        <Rect x="45" y="0" width="30" height="20" rx="5" fill="none" stroke="#2c3e50" strokeWidth="4" />
      </Svg>
    </View>
  );
}