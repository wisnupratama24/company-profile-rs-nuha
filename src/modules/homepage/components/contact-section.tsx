"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONTACTS, CONTACT_SECTION } from "../utils/constants";

export function ContactSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-16"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight mb-2"
        >
          {CONTACT_SECTION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          {CONTACT_SECTION.description}
        </motion.p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;
          return (
            <Card key={contact.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{contact.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {contact.primary}
                </CardDescription>
                {contact.secondary && (
                  <CardDescription className="text-sm mt-2">
                    {contact.secondary}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

