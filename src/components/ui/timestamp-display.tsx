import React from 'react';
import { formatSecurityActivityTime, formatToIST } from '@/utils/dateFormatter';
import { Clock } from 'lucide-react';

interface TimestampDisplayProps {
  timestamp: string;
  className?: string;
  showIcon?: boolean;
  showTooltip?: boolean;
  prefix?: string;
}

export const TimestampDisplay: React.FC<TimestampDisplayProps> = ({
  timestamp,
  className = "flex items-center gap-1",
  showIcon = true,
  showTooltip = true,
  prefix = "",
}) => {
  const relativeTime = formatSecurityActivityTime(timestamp);
  const fullTime = formatToIST(timestamp);

  return (
    <span 
      className={className}
      title={showTooltip ? `Full time: ${fullTime}` : undefined}
    >
      {showIcon && <Clock className="h-3 w-3" />}
      {prefix}{relativeTime}
    </span>
  );
};
