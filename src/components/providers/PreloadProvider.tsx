import AuthProvider from '@/components/providers/AuthProvider';

type PreloadProviderProps = {
  children: React.ReactNode;
};

const PreloadProvider = ({ children }: PreloadProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default PreloadProvider;
