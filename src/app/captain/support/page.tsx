"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactSupport } from "@/components/captain-ui/contact-support"
import { Phone, MessageCircle, AlertTriangle, HelpCircle } from "lucide-react"
import { supportContacts } from "@/lib/captain-data"
import { useToast } from "@/hooks/use-toast"

export default function CaptainSupport() {
  const { toast } = useToast()

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `${action} request has been sent`,
    })
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Support Center</h1>
        <p className="text-gray-600">Get help when you need it</p>
      </div>

      {/* Emergency Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-lg text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              onClick={() => handleQuickAction("Emergency Call")}
              variant="destructive"
              className="w-full py-3"
              size="lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Emergency Hotline
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleQuickAction("Vehicle Breakdown")}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Vehicle Issue
              </Button>

              <Button
                onClick={() => handleQuickAction("Safety Concern")}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Safety Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleQuickAction("Order Help")}
              variant="outline"
              className="flex items-center gap-2 py-3"
            >
              <HelpCircle className="h-4 w-4" />
              Order Help
            </Button>

            <Button
              onClick={() => handleQuickAction("Technical Support")}
              variant="outline"
              className="flex items-center gap-2 py-3"
            >
              <MessageCircle className="h-4 w-4" />
              Tech Support
            </Button>

            <Button
              onClick={() => handleQuickAction("Payment Issue")}
              variant="outline"
              className="flex items-center gap-2 py-3"
            >
              <Phone className="h-4 w-4" />
              Payment Help
            </Button>

            <Button
              onClick={() => handleQuickAction("Customer Complaint")}
              variant="outline"
              className="flex items-center gap-2 py-3"
            >
              <AlertTriangle className="h-4 w-4" />
              Customer Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Contacts */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Support Contacts</h2>
        <div className="space-y-4">
          {supportContacts.map((contact) => (
            <ContactSupport key={contact.id} contact={contact} />
          ))}
        </div>
      </div>

      {/* Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Help Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toast({ title: "Help", description: "Opening delivery guidelines" })}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Delivery Guidelines
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toast({ title: "Help", description: "Opening safety protocols" })}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Safety Protocols
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toast({ title: "Help", description: "Opening app tutorial" })}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              App Tutorial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
