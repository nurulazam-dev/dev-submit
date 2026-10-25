"use client";

import { IAdminUpdateUserPayload } from "@/types/users.type";
import {
  adminUpdateUserZodSchema,
  IEditUserFormValues,
} from "@/zod/user.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
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
import { adminUpdateUserAction } from "@/actions/user.action";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";

interface EditUserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IAdminUpdateUserPayload | null;
}

const getInitialValues = (
  user: IAdminUpdateUserPayload | null,
): IEditUserFormValues => ({
  name: user?.name ?? "",
  phone: user?.phone ?? "",
  address: user?.address ?? "",
  role: user?.role ?? "CUSTOMER",
  status: user?.status ?? "ACTIVE",
  emailVerified: user?.emailVerified ?? false,
});

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

export default function AdminEditUserProfileModal({
  open,
  onOpenChange,
  user,
}: EditUserFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: IAdminUpdateUserPayload;
    }) => adminUpdateUserAction(userId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(user),
    onSubmit: async ({ value }) => {
      if (!user) {
        toast.error("User not found");
        return;
      }

      const payload: IAdminUpdateUserPayload = {
        name: value.name,
        phone: value.phone,
        address: value.address,
        role: value.role,
        status: value.status,
        emailVerified: value.emailVerified,
      };

      const result = await mutateAsync({
        userId: String(user.id),
        payload,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update user");
        return;
      }

      toast.success(result.message || "User updated successfully");
      onOpenChange(false);
      form.reset();

      void queryClient.invalidateQueries({ queryKey: ["users"] });
      void queryClient.refetchQueries({
        queryKey: ["users"],
        type: "active",
      });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(user));
    }
  }, [user, form, open]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        form.reset();
      }
    },
    [form, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(92vw,78rem)] lg:max-w-[min(92vw,78rem)] xl:w-[min(88vw,88rem)] xl:max-w-[min(88vw,88rem)] 2xl:w-[min(84vw,96rem)] 2xl:max-w-[min(84vw,96rem)]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user profile information and details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
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
              className="space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <form.Field
                  name="name"
                  validators={{ onChange: adminUpdateUserZodSchema.shape.name }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Full Name"
                      placeholder="Enter doctor name"
                    />
                  )}
                </form.Field>
                <form.Field
                  name="phone"
                  validators={{
                    onChange: adminUpdateUserZodSchema.shape.phone,
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Contact Number"
                      placeholder="Enter contact number"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="address"
                  validators={{
                    onChange: adminUpdateUserZodSchema.shape.address,
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Address"
                      placeholder="Enter address"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="role"
                  validators={{
                    onChange: adminUpdateUserZodSchema.shape.role,
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
                          htmlFor="edit-user-role"
                          className={cn(firstError && "text-destructive")}
                        >
                          Role
                        </Label>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(
                              value as IAdminUpdateUserPayload["role"],
                            );
                            field.handleBlur();
                          }}
                        >
                          <SelectTrigger
                            id="edit-user-role"
                            className={cn(
                              "w-full",
                              firstError && "border-destructive",
                            )}
                          >
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="MANAGER">Manager</SelectItem>
                            <SelectItem value="SERVICE_PROVIDER">
                              Service Provider
                            </SelectItem>
                            <SelectItem value="JOB_CANDIDATE">
                              Job Candidate
                            </SelectItem>
                            <SelectItem value="CUSTOMER">Customer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldMessage error={firstError} />
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field
                  name="status"
                  validators={{
                    onChange: adminUpdateUserZodSchema.shape.status,
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
                          htmlFor="edit-user-status"
                          className={cn(firstError && "text-destructive")}
                        >
                          Status
                        </Label>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(
                              value as IAdminUpdateUserPayload["status"],
                            );
                            field.handleBlur();
                          }}
                        >
                          <SelectTrigger
                            id="edit-user-status"
                            className={cn(
                              "w-full",
                              firstError && "border-destructive",
                            )}
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                            <SelectItem value="DELETED">Deleted</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldMessage error={firstError} />
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field
                  name="emailVerified"
                  validators={{
                    onChange: adminUpdateUserZodSchema.shape.emailVerified,
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
                          htmlFor="edit-user-emailVerified"
                          className={cn(firstError && "text-destructive")}
                        >
                          Email Verified
                        </Label>
                        {/* <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(
                              value as IAdminUpdateUserPayload["emailVerified"],
                            );
                            field.handleBlur();
                          }}
                        >
                          <SelectTrigger
                            id="edit-user-emailVerified"
                            className={cn(
                              "w-full",
                              firstError && "border-destructive",
                            )}
                          >
                            <SelectValue placeholder="Select email verified status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Verified</SelectItem>
                            <SelectItem value="false">Not Verified</SelectItem>
                          </SelectContent>
                        </Select> */}
                        <Select
                          value={String(field.state.value)}
                          onValueChange={(value) => {
                            field.handleChange(value === "true");
                            field.handleBlur();
                          }}
                        >
                          <SelectTrigger
                            id="edit-user-emailVerified"
                            className={cn(
                              "w-full",
                              firstError && "border-destructive",
                            )}
                          >
                            <SelectValue placeholder="Select email verified status" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="true">Verified</SelectItem>
                            <SelectItem value="false">Not Verified</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldMessage error={firstError} />
                      </div>
                    );
                  }}
                </form.Field>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <form.Subscribe
                  selector={(state) =>
                    [state.canSubmit, state.isSubmitting] as const
                  }
                >
                  {([canSubmit, isSubmitting]) => (
                    <CustomSubmitButton
                      isPending={isSubmitting || isPending}
                      pendingLabel="Updating user..."
                      disabled={!canSubmit}
                      className="w-auto min-w-36"
                    >
                      Update User
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
}
