"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { 
  fetchActiveSessions, 
  terminateSession, 
  terminateAllSessions,
  SessionData
} from "@/redux/slice/user/security.slice";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardDescription,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Smartphone, Monitor, MapPin, Clock, Wifi, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SessionsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { sessions, loading, error } = useSelector((state: RootState) => state.userSecurity);

  useEffect(() => {
    dispatch(fetchActiveSessions());
  }, [dispatch]);

  const handleTerminateSession = async (sessionId: string) => {
    try {
      await dispatch(terminateSession(sessionId)).unwrap();
      toast.success("Session terminated successfully");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleTerminateAllSessions = async () => {
    try {
      await dispatch(terminateAllSessions()).unwrap();
      toast.success("All sessions terminated successfully");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("mobile") || device.toLowerCase().includes("android") || device.toLowerCase().includes("iphone")) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Monitor className="h-4 w-4" />;
  };

  if (loading.sessions) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">Loading sessions...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center text-red-600">Error: {error}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile/security">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Login Sessions</h1>
                <p className="text-gray-600">
                  Manage your active login sessions and secure your account
                </p>
              </div>
            </div>
          </motion.div>

          {/* Active Sessions */}
          <VVCard className="mb-6">
            <VVCardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <VVCardTitle className="text-xl">Active Sessions</VVCardTitle>
                <VVCardDescription>
                  These are the devices where you&apos;re currently logged in
                </VVCardDescription>
              </div>
              <VVButton
                variant="destructive"
                size="sm"
                onClick={handleTerminateAllSessions}
                disabled={!sessions || sessions.length <= 1}
              >
                Terminate All
              </VVButton>
            </VVCardHeader>
            <VVCardContent>
              <div className="space-y-4">
                {sessions && sessions.length > 0 ? (
                  sessions.map((session: SessionData) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-white/50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {getDeviceIcon(session.device)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {session.device}
                            </h3>
                            {session.current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{session.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Last active: {session.lastActive}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Wifi className="h-3 w-3" />
                              <span>IP: {session.ip}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <VVButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                        >
                          Terminate
                        </VVButton>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No active sessions found
                  </div>
                )}
              </div>
            </VVCardContent>
          </VVCard>

          {/* Security Tips */}
          <VVCard>
            <VVCardHeader>
              <VVCardTitle className="text-lg">Security Tips</VVCardTitle>
            </VVCardHeader>
            <VVCardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  • Regularly review your active sessions and terminate any unrecognized devices
                </p>
                <p>
                  • If you notice suspicious activity, change your password immediately
                </p>
                <p>
                  • Always log out from public or shared computers
                </p>
                <p>
                  • Enable two-factor authentication for enhanced security
                </p>
              </div>
            </VVCardContent>
          </VVCard>
        </div>
      </div>
      <Footer />
    </>
  );
}
