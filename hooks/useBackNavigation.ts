import { useEffect } from 'react';
import { BackHandler, TVEventControl } from 'react-native';
import { useRouter } from 'expo-router';

export const useBackNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    TVEventControl.enableTVMenuKey();
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        router.back();
        return true;
      },
    );
    return () => {
      subscription.remove();
      TVEventControl.disableTVMenuKey();
    };
  }, [router]);
};
