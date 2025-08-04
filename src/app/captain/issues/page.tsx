"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Clock, MapPin, CheckCircle, Send } from "lucide-react";
import { deliveryIssues } from "@/lib/captain-data";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function DeliveryIssues() {
  const { toast } = useToast();
  const [issues, setIssues] = useState(deliveryIssues);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [resolution, setResolution] = useState("");

  const handleMarkResolved = (issueId: string) => {
    if (!resolution.trim()) {
      toast({
        title: "Resolution Required",
        description: "Please provide a resolution description",
        variant: "destructive",
      });
      return;
    }

    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId
          ? { ...issue, status: "resolved" as const, resolution }
          : issue
      )
    );

    setSelectedIssue(null);
    setResolution("");

    toast({
      title: "Issue Resolved",
      description: "Issue has been marked as resolved",
    });
  };

  const handleSendAlert = (issueId: string) => {
    const issue = issues.find((i) => i.id === issueId);

    toast({
      title: "Alert Sent",
      description: `Admin has been notified about issue for order ${
        issue?.orderId || issueId
      }`,
    });
  };

  const openIssues = issues.filter((issue) => issue.status === "open");
  const resolvedIssues = issues.filter((issue) => issue.status === "resolved");

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Delivery Issues</h1>
        <p className="text-gray-600">
          Manage delivery problems and resolutions
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {openIssues.length}
            </div>
            <div className="text-sm text-gray-600">Open Issues</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {resolvedIssues.length}
            </div>
            <div className="text-sm text-gray-600">Resolved Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Open Issues */}
      {openIssues.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Open Issues
          </h2>

          <div className="space-y-4">
            {openIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{issue.user}</h3>
                        <p className="text-sm text-gray-600">
                          Order: {issue.orderId}
                        </p>
                      </div>
                      <Badge variant="destructive">Open</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{issue.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Reported at {issue.reportedAt}</span>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md mb-4">
                      <p className="text-sm text-red-800">
                        <strong>Issue:</strong> {issue.issue}
                      </p>
                    </div>

                    {selectedIssue === issue.id ? (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Describe how this issue was resolved..."
                          value={resolution}
                          onChange={(e) => setResolution(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleMarkResolved(issue.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Resolved
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedIssue(null);
                              setResolution("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedIssue(issue.id)}
                          variant="outline"
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve Issue
                        </Button>
                        <Button
                          onClick={() => handleSendAlert(issue.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Alert Admin
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved Issues */}
      {resolvedIssues.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Resolved Issues
          </h2>

          <div className="space-y-4">
            {resolvedIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{issue.user}</h3>
                        <p className="text-sm text-gray-600">
                          Order: {issue.orderId}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Resolved
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{issue.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Reported at {issue.reportedAt}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Issue:</strong> {issue.issue}
                      </p>
                    </div>

                    {issue.resolution && (
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm text-green-800">
                          <strong>Resolution:</strong> {issue.resolution}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {openIssues.length === 0 && resolvedIssues.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
          <div className="text-gray-400 mb-2">No delivery issues</div>
          <p className="text-sm text-gray-600">
            Great job! No delivery problems reported today.
          </p>
        </div>
      )}
    </div>
  );
}
