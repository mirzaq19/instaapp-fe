import { cn } from '@/lib/utils';

type AppContainerProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function AppContainer({ children, className, ...rest }: AppContainerProps) {
  return (
    <div className={cn('w-full lg:max-w-5xl mx-auto', className)} {...rest}>
      {children}
    </div>
  );
}

export default AppContainer;
