import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { useState } from 'react';

export function Button({
  label,
  onPress,
  selected,
  disabled,
}: {
  label: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-touch min-w-touch items-center justify-center rounded-full border border-brand px-4 py-2 focus:outline focus:outline-2 focus:outline-brand-dark ${selected ? 'bg-brand' : 'bg-white'} ${disabled ? 'opacity-50' : ''}`}
    >
      <Text className={`text-base font-semibold ${selected ? 'text-white' : 'text-brand'}`}>{label}</Text>
    </Pressable>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="flex-1 min-w-[140px]">
      <Text className="text-sm text-muted">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="min-h-touch rounded-lg border border-muted px-3 text-base text-ink focus:border-brand focus:outline focus:outline-2 focus:outline-brand-dark"
      />
    </View>
  );
}

export const Card = ({ children }: { children: React.ReactNode }) => (
  <View className="rounded-card border border-brand-light bg-white p-4">{children}</View>
);

export function Poster({ uri, alt, missing }: { uri: string; alt: string; missing: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <View
        accessible
        accessibilityLabel={missing}
        className="h-40 w-full items-center justify-center rounded-card bg-brand-light"
      >
        <Text className="text-muted">{missing}</Text>
      </View>
    );
  return (
    <Image
      accessibilityLabel={alt}
      alt={alt}
      source={{ uri }}
      onError={() => setFailed(true)}
      className="h-40 w-full rounded-card"
      resizeMode="cover"
    />
  );
}
