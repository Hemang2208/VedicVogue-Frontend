/**
 * Date and time utility functions for IST (Indian Standard Time) formatting
 */

/**
 * Converts ISO date string or Date object to IST format
 * @param date - ISO date string or Date object
 * @returns Formatted IST date string
 */
export const formatToIST = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Format: "Dec 16, 2024 at 2:30 PM IST"
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  
  const formatter = new Intl.DateTimeFormat('en-IN', options);
  return formatter.format(dateObj) + ' IST';
};

/**
 * Converts ISO date string or Date object to relative time in IST context
 * @param date - ISO date string or Date object
 * @returns Relative time string like "2 minutes ago", "3 hours ago", etc.
 */
export const formatToRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return 'Just now';
  }

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
    }
  }

  return 'Just now';
};

/**
 * Formats date for security activity display
 * Shows relative time for recent activities and full date for older ones
 * @param date - ISO date string or Date object
 * @returns Formatted date string optimized for security activity display
 */
export const formatSecurityActivityTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));

  // Show relative time for activities within the last 24 hours
  if (diffInHours < 24) {
    return formatToRelativeTime(date);
  }

  // Show full IST format for older activities
  return formatToIST(date);
};

/**
 * Formats date in a compact format suitable for tables and lists
 * @param date - ISO date string or Date object
 * @returns Compact date format like "16 Dec, 2:30 PM"
 */
export const formatToCompactIST = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  
  const formatter = new Intl.DateTimeFormat('en-IN', options);
  return formatter.format(dateObj);
};

/**
 * Gets the current IST time
 * @returns Current date and time in IST
 */
export const getCurrentIST = (): Date => {
  return new Date();
};

/**
 * Checks if a date is today (in IST)
 * @param date - ISO date string or Date object
 * @returns True if the date is today in IST
 */
export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  const dateInIST = new Date(dateObj.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const todayInIST = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
  return dateInIST.toDateString() === todayInIST.toDateString();
};

/**
 * Checks if a date is within the current week (in IST)
 * @param date - ISO date string or Date object
 * @returns True if the date is within this week in IST
 */
export const isThisWeek = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  const dateInIST = new Date(dateObj.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const todayInIST = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
  const startOfWeek = new Date(todayInIST);
  startOfWeek.setDate(todayInIST.getDate() - todayInIST.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return dateInIST >= startOfWeek && dateInIST <= endOfWeek;
};

/**
 * Checks if a date is within the current month (in IST)
 * @param date - ISO date string or Date object
 * @returns True if the date is within this month in IST
 */
export const isThisMonth = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  const dateInIST = new Date(dateObj.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const todayInIST = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
  return dateInIST.getMonth() === todayInIST.getMonth() && 
         dateInIST.getFullYear() === todayInIST.getFullYear();
};
