"use client";

import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
// import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  User,
  Bot,
  Send,
  Paperclip,
  Download,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Star,
  // ThumbsUp,
  // ThumbsDown,
  Calendar,
  Tag,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "support";
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface TicketDetails {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  createdDate: string;
  lastUpdated: string;
  assignedAgent: string;
  messages: Message[];
  rating?: number;
  feedback?: string;
}

// Mock ticket data
const mockTickets: { [key: string]: TicketDetails } = {
  TKT001: {
    id: "TKT001",
    ticketNumber: "VV-2024-001",
    subject: "Order delivery issue",
    category: "Delivery",
    priority: "high",
    status: "resolved",
    createdDate: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-16T14:20:00Z",
    assignedAgent: "Rahul Kumar",
    rating: 5,
    feedback: "Great support! Issue was resolved quickly.",
    messages: [
      {
        id: "1",
        sender: "user",
        senderName: "Priya Sharma",
        message:
          "Hi, I placed an order yesterday but it hasn't been delivered yet. The tracking shows it's out for delivery since morning. Can you please help?",
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        sender: "support",
        senderName: "Rahul Kumar",
        message:
          "Hello Priya! I'm sorry to hear about the delay. Let me check your order status right away. Can you please provide your order number?",
        timestamp: "2024-01-15T11:00:00Z",
      },
      {
        id: "3",
        sender: "user",
        senderName: "Priya Sharma",
        message:
          "Sure! The order number is VV-2024-001. I ordered Paneer Tikka Masala and Naan.",
        timestamp: "2024-01-15T11:05:00Z",
      },
      {
        id: "4",
        sender: "support",
        senderName: "Rahul Kumar",
        message:
          "Thank you for the order number. I've checked with our delivery partner and there was a slight delay due to traffic. Your order is now being delivered and should reach you within the next 30 minutes. I've also added a 20% discount to your next order as an apology for the inconvenience.",
        timestamp: "2024-01-15T11:15:00Z",
      },
      {
        id: "5",
        sender: "user",
        senderName: "Priya Sharma",
        message:
          "Perfect! I just received my order. Thank you so much for the quick resolution and the discount. Great customer service!",
        timestamp: "2024-01-15T12:00:00Z",
      },
      {
        id: "6",
        sender: "support",
        senderName: "Rahul Kumar",
        message:
          "I'm so glad to hear that! Thank you for your patience and for choosing VedicVogue. If you need any further assistance, please don't hesitate to reach out. Have a great day!",
        timestamp: "2024-01-15T12:05:00Z",
      },
    ],
  },
  TKT002: {
    id: "TKT002",
    ticketNumber: "VV-2024-002",
    subject: "Payment refund request",
    category: "Billing",
    priority: "medium",
    status: "in_progress",
    createdDate: "2024-01-20T09:15:00Z",
    lastUpdated: "2024-01-20T15:30:00Z",
    assignedAgent: "Sneha Patel",
    messages: [
      {
        id: "1",
        sender: "user",
        senderName: "Priya Sharma",
        message:
          "I was charged twice for the same order. Can you please process a refund for the duplicate charge?",
        timestamp: "2024-01-20T09:15:00Z",
        attachments: [
          {
            name: "payment_screenshot.png",
            url: "#",
            type: "image",
          },
        ],
      },
      {
        id: "2",
        sender: "support",
        senderName: "Sneha Patel",
        message:
          "Hi Priya! I understand your concern about the duplicate charge. I can see the screenshot you've attached. Let me investigate this issue with our payment team and get back to you within 24 hours with an update.",
        timestamp: "2024-01-20T10:00:00Z",
      },
      {
        id: "3",
        sender: "support",
        senderName: "Sneha Patel",
        message:
          "Update: I've confirmed that there was indeed a duplicate charge due to a technical glitch. I've initiated the refund process and you should see the amount credited back to your account within 3-5 business days. I'll send you the refund confirmation once it's processed.",
        timestamp: "2024-01-20T15:30:00Z",
      },
    ],
  },
};

export default function TicketDetailsPage() {
  const params = useParams();
  const ticketId = params.ticketId as string;
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const ticketData = mockTickets[ticketId];
      setTicket(ticketData || null);
      setLoading(false);
    }, 1000);
  }, [ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [ticket?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return CheckCircle;
      case "in_progress":
        return RefreshCw;
      case "open":
        return AlertCircle;
      case "closed":
        return CheckCircle;
      default:
        return MessageCircle;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !ticket) return;

    setSending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "Priya Sharma",
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setTicket({
      ...ticket,
      messages: [...ticket.messages, message],
      lastUpdated: new Date().toISOString(),
    });

    setNewMessage("");
    setSending(false);
  };

  const handleRating = (rating: number) => {
    if (!ticket) return;
    setTicket({ ...ticket, rating });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <MessageCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The support ticket you&apos;re looking for doesn&apos;t exist or
                has been removed.
              </p>
              <VVButton asChild>
                <Link href="/user/profile/help">Back to Support</Link>
              </VVButton>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const StatusIcon = getStatusIcon(ticket.status);

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
                <Link href="/user/profile/help">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Support Ticket</h1>
                <p className="text-muted-foreground">
                  Ticket #{ticket.ticketNumber}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard className="h-[600px] flex flex-col">
                  <VVCardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-3">
                        <StatusIcon className="h-5 w-5" />
                        {ticket.subject}
                      </VVCardTitle>
                      <div className="flex items-center gap-2">
                        <VVBadge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.toUpperCase()}
                        </VVBadge>
                        <VVBadge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace("_", " ").toUpperCase()}
                        </VVBadge>
                      </div>
                    </div>
                  </VVCardHeader>

                  {/* Messages */}
                  <VVCardContent className="flex-1 overflow-y-auto p-0">
                    <div className="p-4 space-y-4">
                      {ticket.messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex gap-3 ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                          <div
                            className={`flex-1 max-w-[70%] ${
                              message.sender === "user" ? "text-right" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {message.senderName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div
                              className={`p-3 rounded-lg ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground ml-auto"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">
                                {message.message}
                              </p>
                              {message.attachments && (
                                <div className="mt-2 space-y-1">
                                  {message.attachments.map(
                                    (attachment, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-2 p-2 bg-background/10 rounded"
                                      >
                                        <Paperclip className="h-3 w-3" />
                                        <span className="text-xs">
                                          {attachment.name}
                                        </span>
                                        <VVButton
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                        >
                                          <Download className="h-3 w-3" />
                                        </VVButton>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </VVCardContent>

                  {/* Message Input */}
                  {ticket.status !== "resolved" &&
                    ticket.status !== "closed" && (
                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="min-h-[60px] resize-none"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <div className="flex flex-col gap-2">
                            <VVButton size="icon" variant="outline">
                              <Paperclip className="h-4 w-4" />
                            </VVButton>
                            <VVButton
                              size="icon"
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim() || sending}
                            >
                              {sending ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                            </VVButton>
                          </div>
                        </div>
                      </div>
                    )}
                </VVCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Ticket Information</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Created</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Assigned Agent</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.assignedAgent}
                        </p>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Rating (for resolved tickets) */}
              {ticket.status === "resolved" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle>Rate This Support</VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent className="space-y-4">
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(star)}
                            className={`p-1 ${
                              (ticket.rating || 0) >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <Star className="h-6 w-6 fill-current" />
                          </button>
                        ))}
                      </div>
                      {ticket.rating && (
                        <p className="text-center text-sm text-muted-foreground">
                          You rated this support {ticket.rating} out of 5 stars
                        </p>
                      )}
                      {ticket.feedback && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{ticket.feedback}</p>
                        </div>
                      )}
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Quick Actions</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-3">
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Conversation
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Create New Ticket
                    </VVButton>
                    {ticket.status === "resolved" && (
                      <VVButton
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reopen Ticket
                      </VVButton>
                    )}
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
