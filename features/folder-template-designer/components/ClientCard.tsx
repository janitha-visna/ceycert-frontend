"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Client } from "../types/client";

interface ClientCardProps {
  client: Client;
  templateName: string;
}

export function ClientCard({ client, templateName }: ClientCardProps) {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all hover:shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">{client.name}</CardTitle>
        <CardDescription>Template: {templateName}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="outline" className="w-full rounded-lg">
          Open Client
        </Button>
      </CardContent>
    </Card>
  );
}
