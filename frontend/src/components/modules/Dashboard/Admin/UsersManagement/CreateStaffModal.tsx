"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import AppField from "@/components/shared/form/AppField";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  //   DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createStaffAction } from "@/actions/user.action";
import {
  registerStaffZodSchema,
  type IRegisterStaffFormValues,
} from "@/zod/user.validation";

const defaultValues: IRegisterStaffFormValues = {
  name: "",
  email: "",
  phone: "",
  role: "MANAGER",
};

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "Invalid input";
};

const FieldMessage = ({ error }: { error: unknown }) => {
  if (!error) {
    return null;
  }

  return <p className="text-sm text-destructive">{getErrorMessage(error)}</p>;
};

const CreateStaffModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  type CreateStaffResult = Awaited<ReturnType<typeof createStaffAction>>;

  const { mutateAsync, isPending } = useMutation<
    CreateStaffResult,
    unknown,
    IRegisterStaffFormValues
  >({
    mutationFn: (staffData) =>
      createStaffAction(
        staffData as unknown as Parameters<typeof createStaffAction>[0],
      ),
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: registerStaffZodSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value);

      if (!result.success) {
        toast.error(result.message || "Failed to create staff member");
        return;
      }

      toast.success(result.message || "Staff member created successfully");
      setOpen(false);
      form.reset();

      void queryClient.invalidateQueries({ queryKey: ["users"] });
      void queryClient.refetchQueries({
        queryKey: ["users"],
        type: "active",
      });
      router.refresh();
    },
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean, eventDetails?: any) => {
      if (
        !nextOpen &&
        eventDetails?.reason &&
        (eventDetails.reason === "outside-press" ||
          eventDetails.reason === "escape-key")
      ) {
        return;
      }

      setOpen(nextOpen);

      if (!nextOpen) {
        form.reset();
      }
    },
    [form],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button type="button" className="ml-auto shrink-0" />}
      >
        <Plus className="size-4" />
        Create Admin/Manager
      </DialogTrigger>

      <DialogContent className="sm:max-h-[85vh] w-full sm:w-125">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle className="text-lg font-semibold">
            Create Admin/Manager
          </DialogTitle>
          <DialogDescription>
            Add a new admin/manager profile with account credentials and role.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] ">
          <div className="px-6 py-5">
            <form
              method="POST"
              action="#"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
              }}
              className=""
            >
              <div className="space-y-3">
                <form.Field
                  name="name"
                  validators={{
                    onChange: registerStaffZodSchema.shape.name,
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Full Name"
                      placeholder="Enter staff name"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onChange: registerStaffZodSchema.shape.email,
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Email"
                      type="email"
                      placeholder="staff@example.com"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="phone"
                  validators={{
                    onChange: registerStaffZodSchema.shape.phone,
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Phone"
                      placeholder="Enter phone number"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="role"
                  validators={{
                    onChange: registerStaffZodSchema.shape.role,
                  }}
                >
                  {(field) => {
                    const firstError =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                        ? field.state.meta.errors[0]
                        : null;

                    return (
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="staff-role"
                          className={cn(firstError && "text-destructive")}
                        >
                          Role
                        </Label>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(
                              value as IRegisterStaffFormValues["role"],
                            );
                            field.handleBlur();
                          }}
                        >
                          <SelectTrigger
                            id="staff-role"
                            className={cn(
                              "w-full",
                              firstError && "border-destructive",
                            )}
                          >
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MANAGER">Manager</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldMessage error={firstError} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <form.Subscribe
                  selector={(state) =>
                    [state.canSubmit, state.isSubmitting] as const
                  }
                >
                  {([canSubmit, isSubmitting]) => (
                    <CustomSubmitButton
                      isPending={isSubmitting || isPending}
                      pendingLabel="Creating staff member..."
                      disabled={!canSubmit}
                      className="w-auto min-w-36"
                    >
                      Create Staff Member
                    </CustomSubmitButton>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStaffModal;
