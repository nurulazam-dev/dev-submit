/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Clock,
  //   Edit3,
  Verified,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

export default function MyProfile({ userData }: { userData: any }) {
  if (!userData) return null;

  const createdAt = format(new Date(userData.createdAt), "PPP");
  const updatedAt = format(new Date(userData.updatedAt), "PPP");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-blue-600/10 blur-3xl -z-10 rounded-full opacity-50 transition-opacity group-hover:opacity-70" />

        <Card className="border-none shadow-xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-800 shadow-2xl relative">
                  <AvatarImage src={userData?.image} alt={userData.name} />
                  <AvatarFallback className="bg-primary text-white text-4xl font-bold">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {userData.status === "ACTIVE" && (
                  <div
                    className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"
                    title="Active Account"
                  />
                )}
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {userData.name}
                  </h1>
                  {userData.emailVerified && (
                    <Verified className="w-6 h-6 text-blue-500" />
                  )}
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary border-none font-semibold"
                  >
                    {userData.role}
                  </Badge>
                </div>

                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  Experience a centralized digital platform connecting customers
                  and top-tier service providers.
                </p>

                {/*  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="gap-2 rounded-full px-6"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 rounded-full px-6 bg-transparent"
                  >
                    Change Password
                  </Button>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/60 backdrop-blur-md">
            <CardHeader className="border-b pb-4 px-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Personal Information
              </h3>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoItem
                icon={<Mail className="w-4 h-4" />}
                label="Email Address"
                value={userData.email}
              />
              <InfoItem
                icon={<Phone className="w-4 h-4" />}
                label="Phone Number"
                value={userData.phone}
              />
              <InfoItem
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                value={userData.address ?? "Not Provided"}
              />
              <InfoItem
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Account Role"
                value={userData.role}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/60 backdrop-blur-md">
            <CardHeader className="border-b pb-4 px-8">
              <h3 className="text-lg font-bold">About Me</h3>
            </CardHeader>
            <CardContent className="p-8 text-slate-600 dark:text-slate-400 leading-relaxed">
              Managing the system as an {userData.role}. Responsible for
              overseeing all service requests, user management, and provider
              coordination within the <strong>MNA ServiceHub</strong> ecosystem.
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold">Activity Meta</h3>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <MetaItem
                icon={<Calendar className="w-4 h-4 text-primary" />}
                label="Joined On"
                value={createdAt}
              />
              <MetaItem
                icon={<Clock className="w-4 h-4 text-orange-500" />}
                label="Last Updated"
                value={updatedAt}
              />
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Account Status</span>
                  <Badge className="bg-green-500/10 text-green-600 border-none px-3">
                    {userData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-600 to-primary text-white shadow-xl">
            <h4 className="font-bold flex items-center gap-2 mb-2 text-white">
              <ShieldCheck className="w-5 h-5" /> Security Status
            </h4>
            <p className="text-sm opacity-90 mb-4">
              Your account is currently{" "}
              {userData.status === "ACTIVE"
                ? "secured and active"
                : "pending review"}
              .
            </p>
            <div className="bg-white/20 rounded-lg p-3 text-xs font-mono">
              PID: {userData.id.substring(0, 12)}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 h-fit">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-[11px] font-medium text-slate-500 uppercase">
          {label}
        </p>
        <p className="text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}
