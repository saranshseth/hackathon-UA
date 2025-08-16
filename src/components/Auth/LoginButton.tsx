'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { User, LogOut } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function LoginButton({ variant = 'outline', size = 'sm' }: LoginButtonProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button variant={variant} size={size} disabled>
        Loading...
      </Button>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-brand-primary-midnight">
          Hi, {session.user.name?.split(' ')[0]}
        </span>
        <Button
          variant="ghost"
          size={size}
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => signIn()}
    >
      <User className="h-4 w-4 mr-2" />
      Sign In
    </Button>
  );
}