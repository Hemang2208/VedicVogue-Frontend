import { UserData } from "./collectData";

/**
 * Export collected client data as JSON for debugging and analysis
 */
export const exportClientDataAsJSON = (data: UserData): string => {
  return JSON.stringify(data, null, 2);
};

/**
 * Export collected client data as a formatted report
 */
export const exportClientDataAsReport = (data: UserData): string => {
  const report = `
=== CLIENT DATA COLLECTION REPORT ===
Generated: ${new Date().toISOString()}

IP INFORMATION:
- Public IP: ${data.ip}

GEOGRAPHIC INFORMATION:
- Country: ${data.geo.country || 'Unknown'}
- Region: ${data.geo.region || 'Unknown'}
- City: ${data.geo.city || 'Unknown'}
- Timezone: ${data.geo.timezone || 'Unknown'}
- ISP: ${data.geo.isp || 'Unknown'}
- Organization: ${data.geo.org || 'Unknown'}
- Latitude: ${data.geo.latitude || 'Unknown'}
- Longitude: ${data.geo.longitude || 'Unknown'}

DEVICE INFORMATION:
- Platform: ${data.device.platform}
- Language: ${data.device.language}
- Cookie Enabled: ${data.device.cookieEnabled}
- Screen Resolution: ${data.device.screen.width}x${data.device.screen.height}
- Viewport Size: ${data.device.viewport.width}x${data.device.viewport.height}
- Color Depth: ${data.device.screen.colorDepth}
- Pixel Depth: ${data.device.screen.pixelDepth}
- Available Screen: ${data.device.screen.availWidth}x${data.device.screen.availHeight}
- Device Memory: ${data.device.deviceMemory ? data.device.deviceMemory + 'GB' : 'Unknown'}
- CPU Cores: ${data.device.hardwareConcurrency || 'Unknown'}

NETWORK INFORMATION:
- Connection Type: ${data.device.connection?.effectiveType || 'Unknown'}
- Download Speed: ${data.device.connection?.downlink ? data.device.connection.downlink + 'Mbps' : 'Unknown'}
- Latency: ${data.device.connection?.rtt ? data.device.connection.rtt + 'ms' : 'Unknown'}
- Data Saver: ${data.device.connection?.saveData || 'Unknown'}

BATTERY INFORMATION:
- Charging: ${data.device.battery?.charging || 'Unknown'}
- Level: ${data.device.battery?.level ? (data.device.battery.level * 100).toFixed(1) + '%' : 'Unknown'}
- Charging Time: ${data.device.battery?.chargingTime || 'Unknown'}
- Discharging Time: ${data.device.battery?.dischargingTime || 'Unknown'}

BROWSER INFORMATION:
- Name: ${data.browser.name}
- Version: ${data.browser.version}
- Engine: ${data.browser.engine}
- Engine Version: ${data.browser.engineVersion}
- Vendor: ${data.browser.vendor}
- Mobile: ${data.browser.mobile}
- Tablet: ${data.browser.tablet}
- Desktop: ${data.browser.desktop}
- Device Type: ${data.browser.deviceType}

OPERATING SYSTEM:
- OS: ${data.browser.os}
- OS Version: ${data.browser.osVersion}

SECURITY INFORMATION:
- Do Not Track: ${data.security.doNotTrack || 'Not set'}
- Secure Context: ${data.security.secureContext}
- Cookies Enabled: ${data.security.cookieEnabled}
- Java Enabled: ${data.security.javaEnabled}
- Online Status: ${data.security.onLine}
- Webdriver: ${data.security.webdriver}
- Installed Plugins: ${data.security.plugins.length} plugins
- MIME Types: ${data.security.mimeTypes.length} types

PERMISSIONS:
- Notifications: ${data.device.permissions?.notifications || 'Unknown'}
- Geolocation: ${data.device.permissions?.geolocation || 'Unknown'}
- Camera: ${data.device.permissions?.camera || 'Unknown'}
- Microphone: ${data.device.permissions?.microphone || 'Unknown'}

SESSION INFORMATION:
- Session ID: ${data.session.sessionId}
- Timestamp: ${new Date(data.session.timestamp).toISOString()}
- Referrer: ${data.session.referrer || 'Direct'}
- Current URL: ${data.session.currentUrl}
- Time Zone: ${data.session.timeZone}
- Time Zone Offset: ${data.session.timeZoneOffset} minutes
- Primary Language: ${data.session.language}
- All Languages: ${data.session.languages.join(', ')}
- Visit Duration: ${data.session.visitDuration ? data.session.visitDuration + 'ms' : 'Unknown'}
- Page Load Time: ${data.session.pageLoadTime ? data.session.pageLoadTime + 'ms' : 'Unknown'}

HEADERS INFORMATION:
- User Agent: ${data.headers.userAgent}
- Accept: ${data.headers.accept}
- Accept Language: ${data.headers.acceptLanguage}
- Accept Encoding: ${data.headers.acceptEncoding}

====================================
`;

  return report;
};

/**
 * Download client data as a file (for debugging purposes)
 */
export const downloadClientData = (data: UserData, format: 'json' | 'report' = 'json'): void => {
  const content = format === 'json' ? exportClientDataAsJSON(data) : exportClientDataAsReport(data);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `client-data-${Date.now()}.${format === 'json' ? 'json' : 'txt'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Log client data summary to console
 */
export const logClientDataSummary = (data: UserData): void => {
  console.group('🔍 Client Data Collection Summary');
  console.log('📍 Location:', `${data.geo.city || 'Unknown'}, ${data.geo.region || 'Unknown'}, ${data.geo.country || 'Unknown'}`);
  console.log('💻 Device:', `${data.browser.deviceType} - ${data.browser.os} ${data.browser.osVersion}`);
  console.log('🌐 Browser:', `${data.browser.name} ${data.browser.version}`);
  console.log('📱 Screen:', `${data.device.screen.width}x${data.device.screen.height} (${data.device.viewport.width}x${data.device.viewport.height} viewport)`);
  console.log('🔒 Security:', `Secure: ${data.security.secureContext}, DNT: ${data.security.doNotTrack || 'Not set'}`);
  console.log('🔗 Network:', `${data.device.connection?.effectiveType || 'Unknown'} (${data.device.connection?.downlink || '?'}Mbps)`);
  console.log('🔋 Battery:', `${data.device.battery?.level ? (data.device.battery.level * 100).toFixed(1) + '%' : 'Unknown'} ${data.device.battery?.charging ? '(Charging)' : ''}`);
  console.log('⏱️ Performance:', `Load: ${data.session.pageLoadTime || '?'}ms, Collection: ${data.session.visitDuration || '?'}ms`);
  console.groupEnd();
};
