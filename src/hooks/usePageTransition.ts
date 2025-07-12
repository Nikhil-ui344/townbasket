import { useLoading } from '../contexts/LoadingContext';

export const usePageTransition = () => {
  const { showLoader, setIsLoading } = useLoading();

  const navigateWithLoading = async (
    navigationCallback: () => void,
    minDuration: number = 1000
  ) => {
    await showLoader(minDuration);
    navigationCallback();
  };

  const quickTransition = (navigationCallback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      navigationCallback();
      setIsLoading(false);
    }, 500);
  };

  return {
    navigateWithLoading,
    quickTransition
  };
};
