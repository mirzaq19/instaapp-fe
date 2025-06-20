import { Link } from 'react-router';
import { LogOut } from 'lucide-react';
import AppContainer from '@/components/layout/AppContainer';
import { cn } from '@/lib/utils';
import appLogo from '@/assets/app-logo.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { asyncLogoutUser } from '@/app/thunks/authThunk';

type NavbarProps = {
  classname?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Navbar = ({ classname, ...rest }: NavbarProps) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(asyncLogoutUser());
  };

  return (
    <nav
      className={cn(
        'bg-white sticky top-0 z-10 border-b border-gray-200',
        classname,
      )}
      {...rest}
    >
      <AppContainer>
        <div className="flex justify-between items-center py-4 px-4 lg:px-0">
          <div className="flex items-center gap-3">
            <img src={appLogo} alt="Codev logo" className="w-8 h-8" />
            <Link to="/" className="text-lg md:text-xl font-title font-bold">
              InstaCode
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              {!authState.authenticated && (
                <>
                  <li>
                    <Link to="/login">
                      <Button className='cursor-pointer' size="sm">Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <Button className='cursor-pointer' size="sm" variant="outline">
                        Register
                      </Button>
                    </Link>
                  </li>
                </>
              )}
              {authState.authenticated && !authState.loading && (
                <>
                  <li className="flex items-center">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${authState.user?.username}&background=random`} />
                          <AvatarFallback>
                            {authState.user?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          <p>{authState.user?.name}</p>
                          <p className="text-gray-500 text-xs">
                            {authState.user?.email}
                          </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="space-x-1 cursor-pointer"
                          onClick={logoutHandler}
                        >
                          <LogOut className="h-4 w-4 text-gray-600" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </>
              )}
              {authState.authenticated && authState.loading && (
                <li className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </AppContainer>
    </nav>
  );
}

export default Navbar;
