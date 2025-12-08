import React, {useState, useMemo} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';

type Screen = 'home' | 'transactions';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  
  // QueryClient를 useMemo로 메모이제이션하여 재생성 방지
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* 간단한 탭 네비게이션 */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, currentScreen === 'home' && styles.tabActive]}
            onPress={() => setCurrentScreen('home')}>
            <Text style={[styles.tabText, currentScreen === 'home' && styles.tabTextActive]}>
              🏠 홈
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, currentScreen === 'transactions' && styles.tabActive]}
            onPress={() => setCurrentScreen('transactions')}>
            <Text style={[styles.tabText, currentScreen === 'transactions' && styles.tabTextActive]}>
              💰 거래 내역
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 화면 렌더링 */}
        <View style={styles.content}>
          {currentScreen === 'home' && <HomeScreen />}
          {currentScreen === 'transactions' && <TransactionsScreen />}
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});

export default App;

