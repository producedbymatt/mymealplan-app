import React, { useState, useEffect } from "react";
import { format, isToday } from "date-fns";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MealLog } from "@/hooks/useMealLogs";

interface MealsTableProps {
  mealLogs: MealLog[];
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealsTable = ({ mealLogs, onEdit, onDelete }: MealsTableProps) => {
  // Group meals by date
  const groupedMeals = mealLogs.reduce((groups: { [key: string]: MealLog[] }, meal) => {
    const date = format(new Date(meal.created_at), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedMeals).sort((a, b) => b.localeCompare(a));

  // Calculate daily total calories
  const getDailyTotal = (meals: MealLog[]) => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  // Find today's date in yyyy-MM-dd format
  const today = format(new Date(), "yyyy-MM-dd");
  
  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>([today]);

  // Effect to ensure today's section stays expanded
  useEffect(() => {
    if (!expandedSections.includes(today)) {
      setExpandedSections(prev => [...prev, today]);
    }
  }, [expandedSections]);

  // Handle accordion state changes
  const handleAccordionChange = (value: string[]) => {
    setExpandedSections(value.includes(today) ? value : [...value, today]);
  };

  return (
    <div className="bg-background rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-1/4">Meal Name</TableHead>
            <TableHead className="w-1/6">Calories</TableHead>
            <TableHead className="w-1/6">Time</TableHead>
            <TableHead className="w-1/4">Date</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      
      <Accordion 
        type="multiple" 
        value={expandedSections}
        onValueChange={handleAccordionChange}
      >
        {sortedDates.map((date, dateIndex) => (
          <AccordionItem key={date} value={date}>
            {dateIndex > 0 && <Separator className="my-2" />}
            <div className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 text-white rounded-lg">
              <AccordionTrigger className="w-full px-4 py-4 [&[data-state=open]>div>svg]:rotate-180">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold">
                    {format(new Date(date), "EEEE, MMMM do")}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                      Total: {getDailyTotal(groupedMeals[date])} calories
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </div>
                </div>
              </AccordionTrigger>
            </div>
            
            <AccordionContent className="px-4 pt-2">
              <div className="rounded-lg overflow-hidden mt-2">
                <Table>
                  <TableBody>
                    {groupedMeals[date].map((log) => (
                      <TableRow 
                        key={log.id} 
                        className="bg-background hover:bg-[#0EA5E9]/50 hover:text-white transition-colors"
                      >
                        <TableCell className="w-1/4">{log.meal_name}</TableCell>
                        <TableCell className="w-1/6">{log.calories}</TableCell>
                        <TableCell className="w-1/6">
                          {format(new Date(log.created_at), "h:mm a")}
                        </TableCell>
                        <TableCell className="w-1/4">
                          {format(new Date(log.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="w-1/6 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(log)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this meal?")) {
                                  onDelete(log.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MealsTable;