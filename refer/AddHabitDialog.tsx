
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHabits } from "@/contexts/HabitContext";
import type { Habit } from "@/types";
import { AVAILABLE_ICONS, DEFAULT_ICON } from "@/lib/icons";
import React from "react";

const habitFormSchema = z.object({
  name: z.string().min(1, "Habit name is required."),
  icon: z.string().min(1, "Icon is required."),
  weight: z.coerce.number().min(0, "Weight must be a positive number."),
  notes: z.string().optional(),
});

type HabitFormValues = z.infer<typeof habitFormSchema>;

interface AddHabitDialogProps {
  hikeId: string;
  habit?: Habit; // For editing existing habit
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddHabitDialog({ hikeId, habit, open, onOpenChange }: AddHabitDialogProps) {
  const { addHabit, updateHabit } = useHabits();

  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habit
      ? {
          name: habit.name,
          icon: habit.icon,
          weight: habit.weight,
          notes: habit.notes,
        }
      : {
          name: "",
          icon: DEFAULT_ICON,
          weight: 1,
          notes: "",
        },
  });
  
  React.useEffect(() => {
    if (open) {
      form.reset(habit
        ? {
            name: habit.name,
            icon: habit.icon,
            weight: habit.weight,
            notes: habit.notes,
          }
        : {
            name: "",
            icon: DEFAULT_ICON,
            weight: 1,
            notes: "",
          }
      );
    }
  }, [habit, open, form]);


  const onSubmit = (data: HabitFormValues) => {
    if (habit) {
      // The context needs the full habit object to update
      const habitToUpdate: Habit = {
        ...habit,
        ...data,
        notes: data.notes || '',
      };
      updateHabit(habitToUpdate);
    } else {
      addHabit(hikeId, data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{habit ? "Edit Habit" : "Add New Habit"}</DialogTitle>
          <DialogDescription>
            {habit ? "Update the details of this habit." : "Add a new habit to your current Hike."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning Run" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AVAILABLE_ICONS.map(({ name: iconName, IconComponent }) => (
                          <SelectItem key={iconName} value={iconName}>
                            <div className="flex items-center">
                              <IconComponent className="mr-2 h-5 w-5" />
                              {iconName}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score Weight</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
           
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific notes about this habit..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                {habit ? "Save Changes" : "Add Habit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
