/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";

export const useRequestService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const isLoggedIn = true;

  const handleRequestClick = (service: any) => {
    if (!isLoggedIn) {
      toast.error("Unauthorized! Please login to request a service.", {
        description: "You need an account to book our experts.",
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/login"),
        },
      });
      return;
    }

    setSelectedService(service);
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    selectedService,
    handleRequestClick,
  };
};
