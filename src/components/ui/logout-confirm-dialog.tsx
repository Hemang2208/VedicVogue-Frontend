'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { VVButton } from '@/components/ui/vv-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';

interface LogoutConfirmDialogProps {
  children: React.ReactNode;
  redirectTo?: string;
  onLogoutComplete?: () => void;
}

export function LogoutConfirmDialog({ 
  children, 
  redirectTo = '/user/logout',
  onLogoutComplete 
}: LogoutConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      if (redirectTo === '/user/logout') {
        // Use dedicated logout page for better UX
        router.push('/user/logout');
      } else {
        // Direct logout
        await logout(true);
        toast.success('Logged out successfully');
        router.push(redirectTo);
      }

      setIsOpen(false);
      onLogoutComplete?.();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
      setIsOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-destructive" />
            Confirm Logout
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? This will end your current session and you&apos;ll need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Security Notice:</strong> All active sessions will be terminated for your security.
            </p>
          </div>
        </div>

        <DialogFooter>
          <VVButton
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoggingOut}
          >
            Cancel
          </VVButton>
          <VVButton
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </>
            )}
          </VVButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutConfirmDialog;
