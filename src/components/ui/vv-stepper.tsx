"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function VVStepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                    {
                      "border-primary bg-primary text-white": isCompleted,
                      "border-primary bg-background text-primary": isCurrent,
                      "border-muted-foreground bg-background text-muted-foreground": isUpcoming,
                    },
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <div
                    className={cn("text-sm font-medium", {
                      "text-primary": isCompleted || isCurrent,
                      "text-muted-foreground": isUpcoming,
                    })}
                  >
                    {step.title}
                  </div>
                  {step.description && <div className="text-xs text-muted-foreground mt-1">{step.description}</div>}
                </div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className={cn("flex-1 h-0.5 mx-4 transition-all duration-200", {
                    "bg-primary": index < currentStep,
                    "bg-muted": index >= currentStep,
                  })}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
