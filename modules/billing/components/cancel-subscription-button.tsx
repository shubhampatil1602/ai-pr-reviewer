"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cancelSubscription } from "@/lib/billing";
import { statusButtonClass } from "@/modules/dashboard/lib/status-style";

type CancelSubscriptionButtonProps = {
  disabled?: boolean;
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CancelSubscriptionButton({
  disabled = false,
}: CancelSubscriptionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCancel() {
    setLoading(true);

    try {
      await cancelSubscription();
      toast.success(
        "Subscription canceled. Pro access continues until renewal date.",
      );
      setOpen(false);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not cancel subscription.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant='outline'
            disabled={disabled || loading}
            className={statusButtonClass.danger}
          />
        }
      >
        Cancel subscription
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your Pro subscription? You will continue to have Pro access until the end of your current billing cycle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Keep subscription</AlertDialogCancel>
          <AlertDialogAction 
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Canceling…" : "Yes, cancel subscription"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
