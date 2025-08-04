export type GeoInfo = {
  latitude: number | null;
  longitude: number | null;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  isp?: string;
  org?: string;
};

export type DeviceInfo = {
  userAgent: string;
  platform: string;
  language: string;
  cookieEnabled: boolean;
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    pixelDepth: number;
    availWidth: number;
    availHeight: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  battery?: {
    charging: boolean;
    level: number;
    chargingTime: number;
    dischargingTime: number;
  };
  permissions?: {
    notifications?: string;
    geolocation?: string;
    camera?: string;
    microphone?: string;
  };
};

export type BrowserInfo = {
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
  os: string;
  osVersion: string;
  device: string;
  deviceType: string;
  vendor: string;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

export type SecurityInfo = {
  doNotTrack?: string;
  secureContext: boolean;
  cookieEnabled: boolean;
  javaEnabled: boolean;
  onLine: boolean;
  webdriver: boolean;
  plugins: string[];
  mimeTypes: string[];
};

export type SessionInfo = {
  timestamp: number;
  sessionId: string;
  referrer: string;
  currentUrl: string;
  timeZone: string;
  timeZoneOffset: number;
  language: string;
  languages: string[];
  visitDuration?: number;
  pageLoadTime?: number;
};

export type UserData = {
  ip: string;
  geo: GeoInfo;
  device: DeviceInfo;
  browser: BrowserInfo;
  security: SecurityInfo;
  session: SessionInfo;
  headers: {
    userAgent: string;
    accept: string;
    acceptLanguage: string;
    acceptEncoding: string;
    secChUa?: string;
    secChUaPlatform?: string;
    secChUaMobile?: string;
    secFetchSite?: string;
    secFetchMode?: string;
    secFetchDest?: string;
  };
};

const getPublicIp = async (): Promise<string> => {
  try {
    const res = await fetch("https://api.ipify.org/?format=json", {
      method: "GET",
    });
    const data = await res.json();
    return data.ip ?? "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
};

const getGeoLocation = async (): Promise<GeoInfo> => {
  const geoData: GeoInfo = {
    latitude: null,
    longitude: null,
  };

  // Get GPS coordinates
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });
      geoData.latitude = position.coords.latitude;
      geoData.longitude = position.coords.longitude;
    } catch {
      // Geolocation failed, coordinates remain null
    }
  }

  // Get additional geo info from IP
  try {
    const response = await fetch("http://ip-api.com/json/", {
      method: "GET",
    });
    const ipGeoData = await response.json();
    if (ipGeoData.status === "success") {
      geoData.country = ipGeoData.country;
      geoData.region = ipGeoData.regionName;
      geoData.city = ipGeoData.city;
      geoData.timezone = ipGeoData.timezone;
      geoData.isp = ipGeoData.isp;
      geoData.org = ipGeoData.org;
      
      // If GPS coordinates not available, use IP-based coordinates
      if (!geoData.latitude && !geoData.longitude) {
        geoData.latitude = ipGeoData.lat;
        geoData.longitude = ipGeoData.lon;
      }
    }
  } catch {
    // IP geolocation failed, partial data is fine
  }

  // Get timezone if not available from IP
  if (!geoData.timezone) {
    geoData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  return geoData;
};

const getBrowserInfo = (): BrowserInfo => {
  const ua = navigator.userAgent;
  const browserInfo: BrowserInfo = {
    name: "Unknown",
    version: "Unknown",
    engine: "Unknown",
    engineVersion: "Unknown",
    os: "Unknown",
    osVersion: "Unknown",
    device: "Unknown",
    deviceType: "Unknown",
    vendor: navigator.vendor || "Unknown",
    mobile: /Mobi|Android/i.test(ua),
    tablet: /Tablet|iPad/i.test(ua),
    desktop: !/Mobi|Android|Tablet|iPad/i.test(ua),
  };

  // Browser detection
  if (ua.includes("Chrome") && !ua.includes("Edg")) {
    browserInfo.name = "Chrome";
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    browserInfo.version = match ? match[1] : "Unknown";
  } else if (ua.includes("Firefox")) {
    browserInfo.name = "Firefox";
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    browserInfo.version = match ? match[1] : "Unknown";
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    browserInfo.name = "Safari";
    const match = ua.match(/Safari\/(\d+\.\d+)/);
    browserInfo.version = match ? match[1] : "Unknown";
  } else if (ua.includes("Edg")) {
    browserInfo.name = "Edge";
    const match = ua.match(/Edg\/(\d+\.\d+)/);
    browserInfo.version = match ? match[1] : "Unknown";
  }

  // OS detection
  if (ua.includes("Windows")) {
    browserInfo.os = "Windows";
    if (ua.includes("Windows NT 10.0")) browserInfo.osVersion = "10";
    else if (ua.includes("Windows NT 6.3")) browserInfo.osVersion = "8.1";
    else if (ua.includes("Windows NT 6.2")) browserInfo.osVersion = "8";
    else if (ua.includes("Windows NT 6.1")) browserInfo.osVersion = "7";
  } else if (ua.includes("Mac OS X")) {
    browserInfo.os = "macOS";
    const match = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
    browserInfo.osVersion = match ? match[1].replace(/_/g, ".") : "Unknown";
  } else if (ua.includes("Linux")) {
    browserInfo.os = "Linux";
  } else if (ua.includes("Android")) {
    browserInfo.os = "Android";
    const match = ua.match(/Android (\d+\.\d+)/);
    browserInfo.osVersion = match ? match[1] : "Unknown";
  } else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) {
    browserInfo.os = "iOS";
    const match = ua.match(/OS (\d+_\d+)/);
    browserInfo.osVersion = match ? match[1].replace("_", ".") : "Unknown";
  }

  // Device type refinement
  if (browserInfo.mobile) {
    browserInfo.deviceType = "Mobile";
  } else if (browserInfo.tablet) {
    browserInfo.deviceType = "Tablet";
  } else {
    browserInfo.deviceType = "Desktop";
  }

  return browserInfo;
};

const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const deviceInfo: DeviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  // Device memory (if available)
  if ('deviceMemory' in navigator) {
    deviceInfo.deviceMemory = (navigator as typeof navigator & { deviceMemory?: number }).deviceMemory;
  }

  // Hardware concurrency
  if ('hardwareConcurrency' in navigator) {
    deviceInfo.hardwareConcurrency = navigator.hardwareConcurrency;
  }

  // Network information (if available)
  if ('connection' in navigator) {
    const connection = (navigator as typeof navigator & { 
      connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      }
    }).connection;
    if (connection) {
      deviceInfo.connection = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };
    }
  }

  // Battery information (if available)
  try {
    if ('getBattery' in navigator) {
      const battery = await (navigator as typeof navigator & {
        getBattery?: () => Promise<{
          charging: boolean;
          level: number;
          chargingTime: number;
          dischargingTime: number;
        }>;
      }).getBattery?.();
      
      if (battery) {
        deviceInfo.battery = {
          charging: battery.charging,
          level: battery.level,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      }
    }
  } catch {
    // Battery API not available or failed
  }

  // Permissions (if available)
  try {
    if ('permissions' in navigator) {
      const permissions = navigator.permissions;
      const permissionResults = await Promise.allSettled([
        permissions.query({ name: 'notifications' as PermissionName }),
        permissions.query({ name: 'geolocation' as PermissionName }),
        permissions.query({ name: 'camera' as PermissionName }),
        permissions.query({ name: 'microphone' as PermissionName }),
      ]);

      deviceInfo.permissions = {
        notifications: permissionResults[0].status === 'fulfilled' ? permissionResults[0].value.state : 'unknown',
        geolocation: permissionResults[1].status === 'fulfilled' ? permissionResults[1].value.state : 'unknown',
        camera: permissionResults[2].status === 'fulfilled' ? permissionResults[2].value.state : 'unknown',
        microphone: permissionResults[3].status === 'fulfilled' ? permissionResults[3].value.state : 'unknown',
      };
    }
  } catch {
    // Permissions API not available or failed
  }

  return deviceInfo;
};

const getSecurityInfo = (): SecurityInfo => {
  const plugins = Array.from(navigator.plugins).map(plugin => plugin.name);
  const mimeTypes = Array.from(navigator.mimeTypes).map(mimeType => mimeType.type);

  return {
    doNotTrack: navigator.doNotTrack || undefined,
    secureContext: window.isSecureContext,
    cookieEnabled: navigator.cookieEnabled,
    javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
    onLine: navigator.onLine,
    webdriver: (navigator as typeof navigator & { webdriver?: boolean }).webdriver || false,
    plugins,
    mimeTypes,
  };
};

const getSessionInfo = (): SessionInfo => {
  const now = Date.now();
  const sessionId = `session_${now}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    timestamp: now,
    sessionId,
    referrer: document.referrer,
    currentUrl: window.location.href,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneOffset: new Date().getTimezoneOffset(),
    language: navigator.language,
    languages: navigator.languages ? Array.from(navigator.languages) : [navigator.language],
    pageLoadTime: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : undefined,
  };
};

const getHeaders = (): UserData['headers'] => {
  // Note: Most headers are not accessible from client-side JavaScript
  // These will be populated on the server side
  return {
    userAgent: navigator.userAgent,
    accept: "*/*", // Default value, actual value set by browser
    acceptLanguage: navigator.language,
    acceptEncoding: "gzip, deflate, br", // Default value
    // sec-ch-ua, sec-ch-ua-platform, sec-ch-ua-mobile are set by browser automatically
    // and not accessible via JavaScript
  };
};

export const collectClientData = async (): Promise<UserData> => {
  const startTime = Date.now();
  
  const [ip, geo, device] = await Promise.all([
    getPublicIp(),
    getGeoLocation(),
    getDeviceInfo(),
  ]);
  
  const browser = getBrowserInfo();
  const security = getSecurityInfo();
  const session = getSessionInfo();
  const headers = getHeaders();

  // Update session with collection duration
  session.visitDuration = Date.now() - startTime;

  return {
    ip,
    geo,
    device,
    browser,
    security,
    session,
    headers,
  };
};
