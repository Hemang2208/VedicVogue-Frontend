'use client';

import { useEffect, useState } from 'react';
import { getAccessToken, getUserData } from '@/utils/tokenManager';

interface TokenInfo {
  hasToken: boolean;
  hasUserData: boolean;
  userData: Record<string, unknown> | null;
  token: string | null;
}

export default function DebugTokenPage() {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    hasToken: false,
    hasUserData: false,
    userData: null,
    token: null,
  });

  useEffect(() => {
    const token = getAccessToken();
    const userData = getUserData();
    
    setTokenInfo({
      hasToken: !!token,
      hasUserData: !!userData,
      userData: userData as Record<string, unknown> | null,
      token: token ? `${token.substring(0, 20)}...` : null, // Only show first 20 chars for security
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Token Debug Information</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Access Token</h2>
            <p className="text-sm">Has Token: {tokenInfo.hasToken ? '✅ Yes' : '❌ No'}</p>
            {tokenInfo.token && (
              <p className="text-xs text-gray-600 mt-1">Token Preview: {tokenInfo.token}</p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">User Data</h2>
            <p className="text-sm">Has User Data: {tokenInfo.hasUserData ? '✅ Yes' : '❌ No'}</p>
            {tokenInfo.userData && (
              <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                {JSON.stringify(tokenInfo.userData, null, 2)}
              </pre>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">Storage Check</h2>
            <p className="text-xs text-gray-600">
              localStorage keys: {typeof window !== 'undefined' ? Object.keys(localStorage).filter(k => k.startsWith('vv_')).join(', ') : 'N/A'}
            </p>
            <p className="text-xs text-gray-600">
              sessionStorage keys: {typeof window !== 'undefined' ? Object.keys(sessionStorage).filter(k => k.startsWith('vv_')).join(', ') : 'N/A'}
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              If you have tokens but still get errors, there might be an issue with the token retrieval logic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
