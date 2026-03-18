import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, 
  SafeAreaView, StatusBar, Animated, Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

// --- DUMMY DATA ---
const DEVELOPERS = [
  { id: '1', name: 'Furkan Demir', role: 'React Native Expert', color: '#61DBFB', initialXp: 80 },
  { id: '2', name: 'Selin Işık', role: 'Cyber Security', color: '#FF4757', initialXp: 40 },
  { id: '3', name: 'Mert Akın', role: 'Backend / Go', color: '#2ED573', initialXp: 10 },
  { id: '4', name: 'Deniz Can', role: 'UI/UX Designer', color: '#FFA502', initialXp: 90 },
];

// --- COMPONENTS ---
const DeveloperCard = ({ item }) => {
  const [xp, setXp] = useState(item.initialXp);
  const [jobsDone, setJobsDone] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  const handleHire = () => {
    // Click Animation
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    setXp(prev => prev + 25); // Her iş +25 XP kazandırır
    setJobsDone(prev => prev + 1);
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      {/* Header: Avatar & Info */}
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.devName}>{item.name}</Text>
          <Text style={styles.devRole}>{item.role}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lvl {level}</Text>
        </View>
      </View>

      {/* Gamification: XP Bar */}
      <View style={styles.xpSection}>
        <View style={styles.xpLabelRow}>
          <Text style={styles.xpLabelText}>Tecrübe (XP)</Text>
          <Text style={styles.xpPercentText}>%{progress}</Text>
        </View>
        <View style={styles.xpTrack}>
          <Animated.View style={[styles.xpFill, { width: `${progress}%`, backgroundColor: item.color }]} />
        </View>
      </View>

      {/* Stats & Action */}
      <View style={styles.footer}>
        <View style={styles.stats}>
          <Text style={styles.statNumber}>{jobsDone}</Text>
          <Text style={styles.statLabel}>Tamamlanan İş</Text>
        </View>
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={[styles.hireButton, { shadowColor: item.color }]} 
          onPress={handleHire}
        >
          <Text style={styles.buttonText}>PROJEYE EKLE</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mainHeader}>
        <Text style={styles.title}>DevMarket 🚀</Text>
        <Text style={styles.subtitle}>En iyi yeteneklerle ekibini kur.</Text>
      </View>

      <FlatList
        data={DEVELOPERS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DeveloperCard item={item} />}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  mainHeader: { padding: 25, backgroundColor: '#FFF', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 4 },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 4 },
  listPadding: { padding: 20 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 6,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  nameContainer: { flex: 1, marginLeft: 15 },
  devName: { fontSize: 18, fontWeight: '700', color: '#334155' },
  devRole: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  levelBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  levelText: { fontWeight: 'bold', color: '#475569', fontSize: 12 },
  xpSection: { marginBottom: 20 },
  xpLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLabelText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  xpPercentText: { fontSize: 12, fontWeight: 'bold', color: '#334155' },
  xpTrack: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  xpFill: { height: '100%', borderRadius: 4 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
  stats: { alignItems: 'flex-start' },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 11, color: '#94A3B8' },
  hireButton: { 
    backgroundColor: '#1E293B', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, letterSpacing: 0.5 },
});