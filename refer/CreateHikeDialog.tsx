
"use client";

import React from 'react';
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
  DialogTrigger,
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
import { useHabits } from "@/contexts/HabitContext";
import { PlusCircle } from "lucide-react";
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const hikeFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  targetDate: z.date({
    required_error: "A target date is required.",
  }),
  targetScore: z.coerce.number().optional(),
});

type HikeFormValues = z.infer<typeof hikeFormSchema>;

export function CreateHikeDialog() {
  const { createHike } = useHabits();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<HikeFormValues>({
    resolver: zodResolver(hikeFormSchema),
    defaultValues: {
      title: "",
      targetScore: 1000,
    },
  });

  const onSubmit = (data: HikeFormValues) => {
    createHike({
      title: data.title,
      startDate: new Date().toISOString(),
      targetDate: data.targetDate.toISOString(),
      targetScore: data.targetScore || 0,
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusCircle className="mr-2 h-5 w-5" /> Start a New Hike
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a New Hike</DialogTitle>
          <DialogDescription>
            Define your next great journey. Give it a name, a target date, and an optional target score.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hike Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fitness Peak Q3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Target Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0,0,0,0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Score (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Begin Hike</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
