'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  if (!providers) {
    return (
      <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-brand-primary-midnight">
            Sign in to Urban Adventures
          </h1>
          <p className="text-center text-brand-primary-midnight-weak">
            Save your favorite trips and access exclusive content
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.values(providers).map((provider: any) => (
            <Button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="w-full"
              variant="outline"
            >
              Sign in with {provider.name}
            </Button>
          ))}
          
          <div className="text-center">
            <a 
              href="/"
              className="text-sm text-brand-primary-intrepid-red hover:underline"
            >
              Continue as guest
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}