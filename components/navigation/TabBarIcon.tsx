import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export function TabBarIcon(props: {
  name: 'home-sharp' | 'play-square' | 'person';
  color: string;
}) {
  return (
    <Ionicons
      size={24}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
