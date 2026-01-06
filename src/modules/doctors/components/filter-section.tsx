"use client";

import { motion } from "motion/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Filter, ArrowRight } from "lucide-react";

interface FilterItem {
  id: string;
  label: string;
  subtitle?: string;
  [key: string]: any; // Allow additional properties like doctorData
}

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  items: FilterItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  allLabel: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  count?: number;
  subtitle?: string;
  showAllButton?: boolean;
  isAllActive?: boolean; // Custom function to determine if "All" button is active
  renderItem?: (item: FilterItem, isSelected: boolean) => React.ReactNode;
}

export function FilterSection({
  title,
  icon,
  items,
  selectedId,
  onSelect,
  allLabel,
  isOpen,
  onOpenChange,
  count,
  subtitle,
  showAllButton = true,
  isAllActive,
  renderItem,
}: FilterSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex flex-col border-2 rounded-lg overflow-hidden bg-card">
        <CollapsibleTrigger className="px-4 py-3 border-b hover:bg-accent/50 transition-colors">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                {icon || <Filter className="h-4 w-4" />}
                <h2 className="text-sm font-semibold">
                  {title} {count !== undefined && `(${count})`}
                </h2>
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
            <div className="p-2 space-y-1">
              {showAllButton && (
                <button
                  onClick={() => onSelect(null)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isAllActive !== undefined
                      ? isAllActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                      : selectedId === null
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-foreground"
                  )}
                >
                  {allLabel}
                </button>
              )}
              {items.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No items found.
                </div>
              ) : (
                items.map((item, index) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.02 }}
                    >
                      {renderItem ? (
                        renderItem(item, isSelected)
                      ) : (
                        <button
                          onClick={() => onSelect(item.id)}
                          className={cn(
                            "w-full text-left p-3 rounded-md transition-all duration-200",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent text-foreground"
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {item.label}
                              </div>
                              {item.subtitle && (
                                <div className="text-xs opacity-80 truncate">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex-shrink-0"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                            )}
                          </div>
                        </button>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

