import type { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/theme';

type TabBarRoute = {
  key: string;
  name: string;
  params?: object;
};

type Props = {
  state: {
    index: number;
    routes: TabBarRoute[];
  };
  descriptors: Record<
    string,
    {
      options: {
        title?: string;
        tabBarLabel?: string;
        tabBarIcon?: (props: {
          focused: boolean;
          color: string;
          size: number;
        }) => ReactNode;
      };
    }
  >;
  navigation: {
    emit: (event: {
      type: string;
      target?: string;
      canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
    navigate: (name: string, params?: object) => void;
  };
};

const ROUTE_HREFS: Record<string, Href> = {
  index: '/',
  study: '/study',
  prayer: '/prayer',
  notes: '/notes',
  plans: '/plans',
  quizzes: '/quizzes',
  profile: '/profile',
};

export function ScrollableTabBar({ state, descriptors }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'web' ? 10 : 6);

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const focused = state.index === index;
          const color = focused ? colors.accentSoft : colors.textDim;
          const icon = options.tabBarIcon?.({
            focused,
            color,
            size: 20,
          });
          const href = ROUTE_HREFS[route.name] ?? (`/${route.name}` as Href);

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: focused }}
              testID={`tab-${route.name}`}
              onPress={() => {
                if (!focused) {
                  router.navigate(href);
                }
              }}
              style={focused ? styles.itemFocused : styles.item}
            >
              {icon}
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.navy,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  item: {
    width: '13%',
    minWidth: 72,
    maxWidth: 110,
    flexGrow: 1,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    gap: 2,
  },
  itemFocused: {
    width: '13%',
    minWidth: 72,
    maxWidth: 110,
    flexGrow: 1,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    gap: 2,
    backgroundColor: colors.accentMuted,
  },
  label: {
    ...typography.label,
    fontSize: 11,
    textAlign: 'center',
  },
});
