import React from 'react';
import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700", className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight dark:text-white", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}