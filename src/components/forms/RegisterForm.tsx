import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router';
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
import { cn } from '@/lib/utils';
import appLogo from '@/assets/app-logo.svg';

type RegisterInputProps = {
  handleRegister: (
    data: {
      name: string,
      email: string,
      username: string,
      password: string,
      passwordConfirmation: string
    }
  ) => Promise<void>;
} & React.HTMLAttributes<HTMLDivElement>;


const formSchema = z
  .object({
    name: z.string().min(4, {
      message: 'Name be at least 4 characters.',
    }),
    email: z
      .string()
      .min(5, {
        message: 'Email must be at least 5 characters.',
      })
      .email({ message: 'Please enter a valid email address' }),
    username: z.string().min(4, {
      message: 'Username must be at least 4 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    passwordConfirmation: z.string().min(6, {
      message: 'Password confirmation must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const RegisterForm = ({ handleRegister, className, ...rest }: RegisterInputProps) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await handleRegister(values)
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
        <h1 className="font-title font-bold text-center mb-6">
          Register to InstaCode
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* // change border color based on validation */}
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password confirmation"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal text-sm" />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              className="text-foreground font-semibold hover:underline"
              to="/Login"
            >
              Login
            </Link>
          </p>
          <Button disabled={loading} className={`w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
