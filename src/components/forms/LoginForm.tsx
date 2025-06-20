import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import appLogo from '@/assets/app-logo.svg';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type LoginFormProps = {
  handleLogin: (data: { email: string, password: string }) => Promise<void>;
} & React.HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'You must enter an email address.',
    }),
  password: z.string().min(1, {
    message: 'You must enter a password.',
  }),
}).refine((data) => {
  // Check if email is a valid email address or username
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data.email) || data.email.length >= 4;
}, {
  path: ['email'],
  message: 'Please enter a valid email address or username.',
});

function LoginForm({ handleLogin, className, ...rest }: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await handleLogin(values);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        'max-w-3xl w-full mx-auto',
        'bg-white rounded-md p-8',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <img
          src={appLogo}
          alt="Codev logo"
          className="w-8 h-8 md:w-12 md:h-12"
        />
        <h1 className="font-title font-bold text-center mb-6">Co-Dev Login</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email / Username</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              className="text-foreground font-semibold hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
          <Button disabled={loading} className={`w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Login</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default LoginForm;
