// Device Information
interface IUserDevice {
  type: string;
  brand: string;
  model: string;
  browser: string;
  os: string;
  memory: number;
  cores: number;
}

// Browser Information
interface IUserBrowser {
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
  vendor: string;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

// Session Information
interface IUserSession {
  timestamp: number;
  sessionId: string;
  referrer: string;
  currentUrl: string;
  timeZone: string;
  timeZoneOffset: number;
  language: string;
  languages: string[];
  visitDuration: number;
  pageLoadTime: number;
}

// HTTP Headers Information
interface IUserHeaders {
  userAgent: string;
  accept: string;
  acceptLanguage: string;
  acceptEncoding: string;
  secChUa: string;
  secChUaPlatform: string;
  secChUaMobile: string;
  secFetchSite: string;
  secFetchMode: string;
  secFetchDest: string;
}

// Coordinates Interface
interface ICoordinates {
  latitude: number;
  longitude: number;
}

// User Account Information
interface IUserAccount {
  email: string;
  phone: string;
  password: string;
  gender?: "male" | "female" | "other";
  profilePictureUrl?: string;
}

// Security Token Information
interface ISecurityToken {
  token: string;
  createdAt: string; // Using string for frontend (ISO string)
  deviceInfo?: string;
  device: IUserDevice;
}

// User Security Information
interface IUserSecurity {
  role?: "user" | "admin" | "captain" | "kitchen";
  ipAddress?: string;
  tokens: ISecurityToken[];
}

// User Address Information
interface IUserAddress {
  label: string;
  houseNumber: string;
  street: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  coordinates: ICoordinates;
}

// Favorite Items
interface IFavoriteItem {
  kitchens: string; // Using string IDs instead of mongoose ObjectId
  dishes: string[];
}

// Cart Item
interface ICartItem {
  item: string; // Using string ID instead of mongoose ObjectId
  quantity: number;
}

// User Activity Information
interface IUserActivity {
  memberSince: string; // Using string for frontend (ISO string)
  favorites: IFavoriteItem[];
  cart: ICartItem[];
  orders: string[]; // Array of order IDs as strings
  contacts: string[]; // Array of contact IDs as strings
  loyaltyPoints: number;
}

// Meal Preferences
interface IMealPreferences {
  type: string;
  spice: string;
  restrictions: string;
  message: string;
}

// Notification Preferences
interface INotificationPreferences {
  order: boolean;
  reminders: boolean;
  menu: boolean;
  promotions: boolean;
}

// User Preferences
interface IUserPreferences {
  meals: IMealPreferences;
  notifications: INotificationPreferences;
  paymentMethod: string[];
}

// Ban Information
interface IBanInfo {
  isBanned: boolean;
  banReason: string | null;
  bannedAt: string | null; // Using string for frontend (ISO string)
}

// User Status Information
interface IUserStatus {
  ban: IBanInfo;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null; // Using string for frontend (ISO string)
}

// Additional User Information
interface IUserAdditionalInfo {
  timezone: string;
  isp: string;
  org: string;
  session: IUserSession;
  browser: IUserBrowser;
  headers: IUserHeaders;
}

// Main User Interface
export default interface IUser {
  fullname: string;
  account: IUserAccount;
  security: IUserSecurity;
  addresses: IUserAddress[];
  activity: IUserActivity;
  preferences: IUserPreferences;
  additionalInfo: IUserAdditionalInfo;
  status: IUserStatus;
  lastLogin: string; // Using string for frontend (ISO string)
  lastProfileUpdate: string; // Using string for frontend (ISO string)
  lastPasswordChange: string; // Using string for frontend (ISO string)
  createdAt: string; // Using string for frontend (ISO string)
  updatedAt: string; // Using string for frontend (ISO string)
}
