/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { Settings2, Check, ChevronsUpDown } from "lucide-react";

import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { IServiceRequestUpdatePayload } from "@/zod/serviceRequest.validation";
import { updateServiceRequestAction } from "@/actions/serviceRequest.action";
import { getAllServiceProviders } from "@/services/serviceProviders.services";
import { getAllSchedules } from "@/services/serviceSchedules.services";

interface EditServiceRequestFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceRequest: any | null;
}

export default function EditServiceRequestModal({
  open,
  onOpenChange,
  serviceRequest,
}: EditServiceRequestFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [providerSearchOpen, setProviderSearchOpen] = useState(false);

  const { data: providersData } = useQuery({
    queryKey: ["service-providers"],
    queryFn: () => getAllServiceProviders(""),
    enabled: open,
  });

  const providers = Array.isArray(providersData?.data)
    ? providersData.data
    : [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      serviceRequestId,
      payload,
    }: {
      serviceRequestId: string;
      payload: IServiceRequestUpdatePayload;
    }) => updateServiceRequestAction(serviceRequestId, payload),
  });

  const form = useForm({
    defaultValues: {
      status: serviceRequest?.status ?? "ACCEPTED",
      rejectionReason: serviceRequest?.rejectionReason ?? "",
      providerId: serviceRequest?.providerId ?? "",
      scheduleId: serviceRequest?.scheduleId ?? "",
    } as IServiceRequestUpdatePayload,
    onSubmit: async ({ value }) => {
      if (!serviceRequest?.id) return;
      const result = await mutateAsync({
        serviceRequestId: serviceRequest.id,
        payload: value,
      });
      if (!result.success) return toast.error(result.message);
      toast.success("Service request updated");
      onOpenChange(false);
      void queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-150 p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <DialogHeader className="px-6 py-6 bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Manage Request
              </DialogTitle>
              <DialogDescription>
                Assign a provider and schedule.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 space-y-6"
          >
            <form.Field name="status">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Action Status</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACCEPTED">Accept & Assign</SelectItem>
                      <SelectItem value="REJECTED">Reject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [
                state.values.status,
                state.values.providerId,
              ]}
            >
              {([status, providerId]) => {
                const { data: schedulesData, isLoading: isLoadingSchedules } =
                  useQuery({
                    queryKey: ["provider-schedules", providerId],
                    queryFn: () => getAllSchedules(providerId as string),
                    enabled: !!providerId && status === "ACCEPTED",
                  });

                const schedules = Array.isArray(schedulesData?.data)
                  ? schedulesData.data
                  : [];
                console.log("schedules=======", schedules);

                return (
                  <div className="space-y-6">
                    {status === "REJECTED" ? (
                      <form.Field name="rejectionReason">
                        {(field) => (
                          <AppField
                            field={field}
                            label="Rejection Reason"
                            placeholder="service request rejection reason..."
                          />
                        )}
                      </form.Field>
                    ) : (
                      <>
                        <form.Field name="providerId">
                          {(field) => (
                            <div className="flex flex-col gap-2">
                              <Label>Select Provider</Label>
                              <Popover
                                open={providerSearchOpen}
                                onOpenChange={setProviderSearchOpen}
                              >
                                <PopoverTrigger
                                  render={
                                    <Button
                                      variant="outline"
                                      className="justify-between w-full"
                                    >
                                      {field.state.value
                                        ? providers.find(
                                            (p: any) =>
                                              p.id === field.state.value,
                                          )?.user?.email
                                        : "Search provider by email..."}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  }
                                />
                                <PopoverContent className="w-100 p-0">
                                  <Command>
                                    <CommandInput placeholder="Search provider..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No provider found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {providers.map((p: any) => (
                                          <CommandItem
                                            key={p.id}
                                            value={p.user?.email}
                                            onSelect={() => {
                                              field.handleChange(p.id);
                                              form.setFieldValue(
                                                "scheduleId",
                                                "",
                                              );
                                              setProviderSearchOpen(false);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                field.state.value === p.id
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            <div className="flex flex-col text-left">
                                              <span>{p.user?.name}</span>
                                              <span className="text-xs text-muted-foreground">
                                                {p.user?.email}
                                              </span>
                                            </div>
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="scheduleId">
                          {(field) => (
                            <div className="space-y-1.5">
                              <Label>Available Schedule</Label>
                              <Select
                                disabled={!providerId || isLoadingSchedules}
                                value={field.state.value}
                                onValueChange={(val) =>
                                  field.handleChange(val!)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      providerId
                                        ? "Select time slot"
                                        : "Select provider first"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {schedules
                                    .filter((s: any) => s.isBooked === false)
                                    .map((s: any) => (
                                      <SelectItem key={s.id} value={s.id}>
                                        {s.scheduleDate
                                          ? format(
                                              new Date(s.scheduleDate),
                                              "PPP",
                                            )
                                          : ""}{" "}
                                        | {s.startTime} - {s.endTime}
                                      </SelectItem>
                                    ))}

                                  {schedules.filter((s: any) => !s.isBooked)
                                    .length === 0 && (
                                    <div className="p-2 text-center text-sm text-muted-foreground">
                                      No available slots
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </form.Field>
                      </>
                    )}
                  </div>
                );
              }}
            </form.Subscribe>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <form.Subscribe selector={(state) => [state.canSubmit]}>
                {([canSubmit]) => (
                  <CustomSubmitButton
                    isPending={isPending}
                    disabled={!canSubmit}
                  >
                    Confirm Changes
                  </CustomSubmitButton>
                )}
              </form.Subscribe>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
