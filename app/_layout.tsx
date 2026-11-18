import '../global.css';
import '../src/i18n';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{ headerStyle: { backgroundColor: '#C2410C' }, headerTintColor: '#fff', title: 'Addo.' }}
    />
  );
}
