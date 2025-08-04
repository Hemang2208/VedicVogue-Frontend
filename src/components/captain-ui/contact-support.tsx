"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail } from "lucide-react"
import type { SupportContact } from "@/lib/captain-data"

interface ContactSupportProps {
  contact: SupportContact
}

export function ContactSupport({ contact }: ContactSupportProps) {
  const handleCall = () => {
    window.open(`tel:${contact.phone}`)
  }

  const handleEmail = () => {
    window.open(`mailto:${contact.email}`)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.role}</p>
          </div>
          <Badge
            variant="outline"
            className={contact.available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
          >
            <div className={`w-2 h-2 rounded-full mr-1 ${contact.available ? "bg-green-500" : "bg-red-500"}`} />
            {contact.available ? "Available" : "Offline"}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-xs">{contact.email}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCall}
            disabled={!contact.available}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button onClick={handleEmail} variant="outline" className="flex-1 bg-transparent" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
