"use client";

import { motion } from "motion/react";
import { Search, X, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SearchSectionProps {
  searchDoctor: string;
  searchDate: Date | undefined;
  onSearchDoctorChange: (value: string) => void;
  onSearchDateChange: (date: Date | undefined) => void;
  onClearAll: () => void;
}

export function SearchSection({
  searchDoctor,
  searchDate,
  onSearchDoctorChange,
  onSearchDateChange,
  onClearAll,
}: SearchSectionProps) {
  const hasActiveSearch = !!(searchDoctor || searchDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-2 rounded-lg p-4 bg-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Search</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search by Doctor Name */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Search by Doctor Name
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="e.g., Dr. Sarah Johnson"
              value={searchDoctor}
              onChange={(e) => onSearchDoctorChange(e.target.value)}
              className="pr-8"
            />
            {searchDoctor && (
              <button
                onClick={() => onSearchDoctorChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search by Date */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Search by Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal pr-8",
                  !searchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchDate ? format(searchDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={searchDate}
                onSelect={onSearchDateChange}
                initialFocus
              />
              {searchDate && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSearchDateChange(undefined)}
                    className="w-full text-xs"
                  >
                    <X className="mr-2 h-3 w-3" />
                    Clear date
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Clear all filters */}
      {hasActiveSearch && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all searches
          </button>
        </div>
      )}
    </motion.div>
  );
}

