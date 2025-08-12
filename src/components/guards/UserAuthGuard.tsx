"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  getAccessToken,
  refreshAccessToken,
  clearTokens,
  hasTokens,
} from "@/utils/tokenManager";
import { handleAuthenticationError } from "@/utils/apiErrorHandler";

export default function UserAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if tokens exist
      if (!hasTokens()) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const token = getAccessToken();

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Try to validate current token
        const URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${URL}/api/users/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200 && res.data.valid) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Token validation failed, attempting refresh...");

        // Check if it's an authentication error that we should handle specifically
        if (axios.isAxiosError(error) && error.response) {
          // Create a Response-like object for the error handler
          const mockResponse = {
            status: error.response.status,
            ok: false,
          } as Response;
          
          const handled = handleAuthenticationError(
            mockResponse,
            error.response.data
          );
          
          if (handled) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
        }

        // Try to refresh token
        const newToken = await refreshAccessToken();

        if (newToken) {
          setIsAuthenticated(true);
        } else {
          // Refresh failed, clear tokens and redirect
          clearTokens();
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push("/sign-in");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="text-gray-800 font-medium">
                Checking authentication
              </p>
              <p className="text-gray-500 text-sm">Please wait...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-500 p-6 max-w-md w-full">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sign In Required
              </h3>
              <p className="text-gray-600 mb-3">
                You are not logged in as a user.
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  Redirecting to{" "}
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                    /sign-in
                  </code>{" "}
                  in 5 seconds...
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Auto-redirecting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
