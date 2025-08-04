"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  Search,
  Download,
  // Filter,
  Calendar,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "payment" | "refund" | "subscription" | "cashback" | "fee";
  status: "completed" | "pending" | "failed" | "cancelled";
  amount: number;
  currency: "INR";
  description: string;
  date: string;
  paymentMethod: string;
  orderId?: string;
  subscriptionId?: string;
  refundId?: string;
  invoiceUrl?: string;
  category: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "payment",
    status: "completed",
    amount: 1299,
    currency: "INR",
    description: "Order payment - Paneer Tikka Masala & Naan",
    date: "2024-01-20T14:30:00Z",
    paymentMethod: "Visa •••• 4242",
    orderId: "ORD001",
    invoiceUrl: "#",
    category: "Food Order",
  },
  {
    id: "TXN002",
    type: "subscription",
    status: "completed",
    amount: 999,
    currency: "INR",
    description: "Premium subscription renewal",
    date: "2024-01-20T10:00:00Z",
    paymentMethod: "UPI - Google Pay",
    subscriptionId: "SUB001",
    invoiceUrl: "#",
    category: "Subscription",
  },
  {
    id: "TXN003",
    type: "refund",
    status: "completed",
    amount: 299,
    currency: "INR",
    description: "Refund for cancelled order",
    date: "2024-01-19T16:45:00Z",
    paymentMethod: "Visa •••• 4242",
    orderId: "ORD002",
    refundId: "REF001",
    category: "Refund",
  },
  {
    id: "TXN004",
    type: "cashback",
    status: "completed",
    amount: 50,
    currency: "INR",
    description: "Cashback for order #ORD001",
    date: "2024-01-19T12:00:00Z",
    paymentMethod: "Wallet Credit",
    orderId: "ORD001",
    category: "Cashback",
  },
  {
    id: "TXN005",
    type: "payment",
    status: "failed",
    amount: 899,
    currency: "INR",
    description: "Order payment - Biryani Special",
    date: "2024-01-18T20:15:00Z",
    paymentMethod: "Mastercard •••• 8888",
    orderId: "ORD003",
    category: "Food Order",
  },
  {
    id: "TXN006",
    type: "fee",
    status: "completed",
    amount: 25,
    currency: "INR",
    description: "Delivery fee",
    date: "2024-01-18T19:30:00Z",
    paymentMethod: "Paytm Wallet",
    orderId: "ORD004",
    category: "Service Fee",
  },
  {
    id: "TXN007",
    type: "payment",
    status: "pending",
    amount: 1599,
    currency: "INR",
    description: "Order payment - Family Combo",
    date: "2024-01-18T18:00:00Z",
    paymentMethod: "UPI - PhonePe",
    orderId: "ORD005",
    category: "Food Order",
  },
  {
    id: "TXN008",
    type: "refund",
    status: "pending",
    amount: 199,
    currency: "INR",
    description: "Refund processing for order cancellation",
    date: "2024-01-17T15:20:00Z",
    paymentMethod: "Visa •••• 4242",
    orderId: "ORD006",
    refundId: "REF002",
    category: "Refund",
  },
];

export default function TransactionHistoryPage() {
  const [transactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return ArrowUpRight;
      case "refund":
        return ArrowDownLeft;
      case "subscription":
        return RefreshCw;
      case "cashback":
        return TrendingDown;
      case "fee":
        return Receipt;
      default:
        return DollarSign;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "text-red-600";
      case "refund":
        return "text-green-600";
      case "subscription":
        return "text-blue-600";
      case "cashback":
        return "text-green-600";
      case "fee":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "failed":
        return XCircle;
      case "cancelled":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const sign = type === "refund" || type === "cashback" ? "+" : "-";
    return `${sign}₹${amount.toLocaleString()}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return time.toLocaleDateString();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(
      term,
      selectedType,
      selectedStatus,
      selectedCategory,
      dateRange
    );
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    applyFilters(searchTerm, type, selectedStatus, selectedCategory, dateRange);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    applyFilters(searchTerm, selectedType, status, selectedCategory, dateRange);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, selectedType, selectedStatus, category, dateRange);
  };

  const handleDateFilter = (range: string) => {
    setDateRange(range);
    applyFilters(
      searchTerm,
      selectedType,
      selectedStatus,
      selectedCategory,
      range
    );
  };

  const applyFilters = (
    search: string,
    type: string,
    status: string,
    category: string,
    date: string
  ) => {
    let filtered = transactions;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.id.toLowerCase().includes(search.toLowerCase()) ||
          transaction.paymentMethod.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (type !== "all") {
      filtered = filtered.filter((transaction) => transaction.type === type);
    }

    // Status filter
    if (status !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === status
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.category === category
      );
    }

    // Date filter
    if (date !== "all") {
      const now = new Date();
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const diffInDays =
          (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24);

        switch (date) {
          case "today":
            return diffInDays <= 1;
          case "week":
            return diffInDays <= 7;
          case "month":
            return diffInDays <= 30;
          case "3months":
            return diffInDays <= 90;
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
  };

  const exportTransactions = () => {
    // In a real app, this would generate and download a CSV/PDF
    console.log("Exporting transactions...");
    alert("Transaction history export will be available for download shortly.");
  };

  // Calculate statistics
  const totalSpent = transactions
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunded = transactions
    .filter((t) => t.type === "refund" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCashback = transactions
    .filter((t) => t.type === "cashback" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Receipt className="h-8 w-8" />
                  Transaction History
                </h1>
                <p className="text-muted-foreground">
                  View and manage your payment history and billing records
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-2xl font-bold text-red-600">
                      ₹{totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold text-green-600">
                      ₹{totalRefunded.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Refunded
                  </p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold text-green-600">
                      ₹{totalCashback.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Cashback
                  </p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold text-yellow-600">
                      ₹{pendingAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pending Amount
                  </p>
                </VVCardContent>
              </VVCard>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <VVCard>
              <VVCardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <VVInput
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                      value={selectedType}
                      onValueChange={handleTypeFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="payment">Payments</SelectItem>
                        <SelectItem value="refund">Refunds</SelectItem>
                        <SelectItem value="subscription">
                          Subscriptions
                        </SelectItem>
                        <SelectItem value="cashback">Cashback</SelectItem>
                        <SelectItem value="fee">Fees</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedStatus}
                      onValueChange={handleStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedCategory}
                      onValueChange={handleCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={dateRange} onValueChange={handleDateFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                      </SelectContent>
                    </Select>

                    <VVButton variant="outline" onClick={exportTransactions}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </VVButton>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredTransactions.length === 0 ? (
              <VVCard>
                <VVCardContent className="text-center py-12">
                  <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No transactions found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </VVCardContent>
              </VVCard>
            ) : (
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>
                    Transaction History ({filteredTransactions.length}{" "}
                    transactions)
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="space-y-4">
                    {filteredTransactions.map((transaction, index) => {
                      const TypeIcon = getTypeIcon(transaction.type);
                      const StatusIcon = getStatusIcon(transaction.status);

                      return (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          {/* Type Icon */}
                          <div
                            className={`p-3 rounded-lg bg-muted ${getTypeColor(
                              transaction.type
                            )}`}
                          >
                            <TypeIcon className="h-6 w-6" />
                          </div>

                          {/* Transaction Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                                  {transaction.description}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatTimeAgo(transaction.date)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <CreditCard className="h-3 w-3" />
                                    {transaction.paymentMethod}
                                  </span>
                                  <span>ID: {transaction.id}</span>
                                  <VVBadge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {transaction.category}
                                  </VVBadge>
                                </div>
                              </div>

                              <div className="text-right">
                                <div
                                  className={`font-semibold text-lg ${getTypeColor(
                                    transaction.type
                                  )}`}
                                >
                                  {formatAmount(
                                    transaction.amount,
                                    transaction.type
                                  )}
                                </div>
                                <VVBadge
                                  className={getStatusColor(transaction.status)}
                                >
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {transaction.status}
                                </VVBadge>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {transaction.invoiceUrl && (
                              <VVButton size="sm" variant="outline" asChild>
                                <Link href={transaction.invoiceUrl}>
                                  <FileText className="mr-1 h-3 w-3" />
                                  Invoice
                                </Link>
                              </VVButton>
                            )}

                            {transaction.orderId && (
                              <VVButton size="sm" variant="outline" asChild>
                                <Link
                                  href={`/user/profile/orders/${transaction.orderId}`}
                                >
                                  View Order
                                </Link>
                              </VVButton>
                            )}

                            {transaction.subscriptionId && (
                              <VVButton size="sm" variant="outline" asChild>
                                <Link
                                  href={`/user/profile/subscription/${transaction.subscriptionId}`}
                                >
                                  View Subscription
                                </Link>
                              </VVButton>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </VVCardContent>
              </VVCard>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
