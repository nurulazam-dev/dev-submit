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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LayoutGrid, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createServiceAction } from "@/actions/service.action";
import {
  createServiceZodSchema,
  ICreateServiceFormValues,
} from "@/zod/service.validation";

const defaultValues: ICreateServiceFormValues = {
  name: "",
  description: "",
  imageUrl: null,
  isActive: true,
};

const CreateServiceModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  type CreateServiceResult = Awaited<ReturnType<typeof createServiceAction>>;

  const { mutateAsync, isPending } = useMutation<
    CreateServiceResult,
    unknown,
    ICreateServiceFormValues
  >({
    mutationFn: (serviceData) =>
      createServiceAction(
        serviceData as unknown as Parameters<typeof createServiceAction>[0],
      ),
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createServiceZodSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value);

      if (!result.success) {
        toast.error(result.message || "Failed to create service");
        return;
      }

      toast.success(result.message || "Service created successfully");
      setOpen(false);
      form.reset();

      void queryClient.invalidateQueries({ queryKey: ["services"] });
      void queryClient.refetchQueries({
        queryKey: ["services"],
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
        render={
          <Button
            type="button"
            className="ml-auto shrink-0 flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span>Add New Service</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-h-[85vh] w-full sm:w-125 p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-5 pr-14 bg-muted/20">
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="size-5 text-primary" />
            <DialogTitle className="text-lg font-semibold">
              Create New Service
            </DialogTitle>
          </div>
          <DialogDescription>
            Provide service details to add it to your platform.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh]">
          <div className="px-6 py-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              <form.Field
                name="name"
                validators={{
                  onChange: createServiceZodSchema.shape.name,
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Service Name"
                    placeholder="e.g. Professional Home Cleaning"
                  />
                )}
              </form.Field>
              <form.Field
                name="description"
                validators={{
                  onChange: createServiceZodSchema.shape.description,
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Description"
                    type="text"
                    placeholder="Describe what this service covers..."
                  />
                )}
              </form.Field>

              <form.Field
                name="imageUrl"
                validators={{
                  onChange: createServiceZodSchema.shape.imageUrl,
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Image URL"
                    placeholder="https://example.com/image.jpg"
                  />
                )}
              </form.Field>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isPending}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <CustomSubmitButton
                      isPending={isSubmitting || isPending}
                      pendingLabel="Creating..."
                      disabled={!canSubmit}
                      className="min-w-32"
                    >
                      Create Service
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

export default CreateServiceModal;
