"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, MapPin, User, ArrowRight, Filter, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { DoctorScheduleData, doctors } from "./utils/constants";

function DoctorSchedule() {
  // Get unique departments/specializations
  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    doctors.forEach((doctor) => {
      deptSet.add(doctor.doctor.specialization);
    });
    return Array.from(deptSet).sort();
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorScheduleData | null>(
    doctors[0]
  );
  const [selectedDay, setSelectedDay] = useState(0);

  // Collapsible states
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(true);
  const [isDoctorsOpen, setIsDoctorsOpen] = useState(true);

  // Search states
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchDate, setSearchDate] = useState<Date | undefined>(undefined);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(true);

  // Department stats for overview
  const departmentStats = useMemo(() => {
    return departments.map((dept) => {
      const deptDoctors = doctors.filter(
        (doctor) => doctor.doctor.specialization === dept
      );
      const totalSlots = deptDoctors.reduce((acc, doc) => {
        return (
          acc +
          doc.schedule.reduce(
            (dayAcc, day) =>
              dayAcc + day.slots.filter((slot) => slot.available).length,
            0
          )
        );
      }, 0);
      return {
        name: dept,
        doctors: deptDoctors.length,
        availableSlots: totalSlots,
      };
    });
  }, [departments]);

  // Filter doctors by search criteria and selected department
  const filteredDoctors = useMemo(() => {
    let result = doctors;

    // Filter by selected department (from sidebar)
    if (selectedDepartment) {
      result = result.filter(
        (doctor) => doctor.doctor.specialization === selectedDepartment
      );
    }

    // Filter by search doctor name
    if (searchDoctor.trim()) {
      result = result.filter((doctor) =>
        doctor.doctor.name.toLowerCase().includes(searchDoctor.toLowerCase())
      );
    }

    // Filter by search date
    if (searchDate) {
      const dateString = format(searchDate, "yyyy-MM-dd");
      result = result.filter((doctor) =>
        doctor.schedule.some((day) => day.date === dateString)
      );
    }

    return result;
  }, [selectedDepartment, searchDoctor, searchDate]);

  // Clear selected doctor when filters/search change; show list instead of auto-selecting
  useEffect(() => {
    if (selectedDepartment || searchDoctor || searchDate) {
      setSelectedDoctor(null);
      setSelectedDay(0);
      setShowAllDoctors(false);
      setShowAllDepartments(false);
    }
  }, [selectedDepartment, searchDoctor, searchDate]);

  return (
    <div className="max-w-7xl w-full">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight mb-2"
        >
          Doctor Schedule
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-6"
        >
          View and book appointments with our medical professionals
        </motion.p>

        {/* Search Section */}
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
                  onChange={(e) => {
                    setShowAllDoctors(false);
                            setShowAllDepartments(false);
                    setSearchDoctor(e.target.value);
                  }}
                  className="pr-8"
                />
                {searchDoctor && (
                  <button
                    onClick={() => setSearchDoctor("")}
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
                    {searchDate ? (
                      format(searchDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={searchDate}
                    onSelect={(date) => {
                      setShowAllDoctors(false);
                      setShowAllDepartments(false);
                      setSearchDate(date);
                    }}
                    initialFocus
                  />
                  {searchDate && (
                    <div className="p-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchDate(undefined)}
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
          {(searchDoctor || searchDate) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setShowAllDoctors(false);
                  setShowAllDepartments(true);
                  setSearchDoctor("");
                  setSearchDate(undefined);
                }}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all searches
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6 min-h-[800px]">
        {/* Left Section - Doctors List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:sticky lg:top-24 lg:self-start gap-4"
        >
          {/* Department Filter */}
          <Collapsible open={isDepartmentOpen} onOpenChange={setIsDepartmentOpen}>
            <div className="flex flex-col border-2 rounded-lg overflow-hidden bg-card">
              <CollapsibleTrigger className="px-4 py-3 border-b hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <h2 className="text-sm font-semibold">Department</h2>
                  </div>
                  {isDepartmentOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-3">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedDepartment(null);
                        setSelectedDoctor(null);
                        setSelectedDay(0);
                        setShowAllDepartments(true);
                        setShowAllDoctors(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                        !selectedDepartment && !selectedDoctor && !showAllDoctors
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                      )}
                    >
                      All Departments
                    </button>
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => {
                          setSelectedDepartment(dept);
                          setShowAllDoctors(false);
                          setShowAllDepartments(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                          selectedDepartment === dept
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground"
                        )}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Doctors List */}
          <Collapsible open={isDoctorsOpen} onOpenChange={setIsDoctorsOpen}>
            <div className="flex flex-col border-2 rounded-lg overflow-hidden bg-card">
              <CollapsibleTrigger className="px-4 py-3 border-b hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-semibold">
                      Doctors{" "}
                      {(selectedDepartment || searchDoctor || searchDate) &&
                        `(${filteredDoctors.length})`}
                    </h2>
                    {(searchDoctor || searchDate) && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Filtered by search
                      </p>
                    )}
                  </div>
                  {isDoctorsOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
                  <div className="p-2 space-y-1">
                    {/* All Doctors quick action */}
                    <button
                      onClick={() => {
                        setSelectedDepartment(null);
                        setSelectedDoctor(null);
                        setSelectedDay(0);
                        setShowAllDoctors(true);
                          setShowAllDepartments(false);
                        setSearchDoctor("");
                        setSearchDate(undefined);
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-md transition-all duration-200 font-medium",
                          showAllDoctors && !selectedDoctor && !selectedDepartment && !searchDoctor && !searchDate
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                      )}
                    >
                      All Doctors
                    </button>

                    {filteredDoctors.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No doctors found in this department.
                      </div>
                    ) : (
                      filteredDoctors.map((doctor, index) => (
                        <motion.div
                          key={doctor.doctor.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.02 }}
                        >
                          <button
                            onClick={() => {
                              setShowAllDoctors(false);
                              setShowAllDepartments(false);
                              setSelectedDepartment(null);
                              setSelectedDoctor(doctor);
                              setSelectedDay(0);
                            }}
                            className={cn(
                              "w-full text-left p-3 rounded-md transition-all duration-200",
                              selectedDoctor?.doctor.id === doctor.doctor.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent text-foreground"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {doctor.doctor.name}
                                </div>
                                <div className="text-xs opacity-80 truncate">
                                  {doctor.doctor.specialization}
                                </div>
                              </div>
                              {selectedDoctor?.doctor.id === doctor.doctor.id && (
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
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </motion.div>

        {/* Right Section - Schedule Details or Doctor List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <AnimatePresence mode="wait">
            {!selectedDoctor ? (
              // Show doctor list when no doctor is selected (including all/search filters)
              <motion.div
                key="doctor-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="space-y-6 pb-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div>
                      {selectedDepartment && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                            {selectedDepartment}
                          </span>
                        </div>
                      )}
                      {(searchDoctor || searchDate) && (
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {searchDoctor && (
                            <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                              Name: {searchDoctor}
                            </span>
                          )}
                          {searchDate && (
                            <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                              Date: {format(searchDate, "PPP")}
                            </span>
                          )}
                        </div>
                      )}
                      <h1 className="text-3xl font-bold leading-tight mb-3">
                        {selectedDepartment || searchDoctor || searchDate || showAllDoctors
                          ? "Search Results"
                          : "All Departments"}
                      </h1>
                      <p className="text-base text-muted-foreground">
                        {selectedDepartment || searchDoctor || searchDate || showAllDoctors
                          ? `${filteredDoctors.length} doctor${filteredDoctors.length !== 1 ? "s" : ""} found${
                              selectedDepartment && !searchDoctor && !searchDate
                                ? " in this department"
                                : ""
                            }${(searchDoctor || searchDate) ? " matching your search" : ""}`
                          : `${departmentStats.length} departments available`}
                      </p>
                    </div>
                    <Separator />
                  </div>

                  {/* Overview when no filters, else doctors list */}
                  {selectedDepartment || searchDoctor || searchDate || showAllDoctors ? (
                    <div className="space-y-4">
                      {filteredDoctors.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">
                            No doctors found matching your search criteria.
                          </p>
                        </div>
                      ) : (
                        filteredDoctors.map((doctor, index) => (
                          <motion.div
                            key={doctor.doctor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => {
                            setShowAllDoctors(false);
                            setShowAllDepartments(false);
                            setSelectedDepartment(null);
                            setSelectedDoctor(doctor);
                            setSelectedDay(0);
                          }}
                        >
                            <div className="space-y-4">
                              {/* Doctor Info */}
                              <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold mb-1">
                                    {doctor.doctor.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {doctor.doctor.specialization}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {doctor.doctor.location}
                                  </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              </div>

                              <Separator />

                              {/* Schedule Summary */}
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{doctor.schedule.length} days available</span>
                                </div>
                                <Separator orientation="vertical" className="h-4" />
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {doctor.schedule.reduce(
                                      (total, day) =>
                                        total +
                                        day.slots.filter((slot) => slot.available).length,
                                      0
                                    )}{" "}
                                    available slots
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {departmentStats.map((dept, index) => (
                        <motion.div
                          key={dept.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedDepartment(dept.name)}
                        >
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">{dept.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {dept.doctors} doctor{dept.doctors !== 1 ? "s" : ""} available
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          </div>
                          <Separator className="mb-3" />
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{dept.doctors} doctor{dept.doctors !== 1 ? "s" : ""}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{dept.availableSlots} available slots</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : selectedDoctor ? (
              // Show single doctor schedule
              <motion.div
                key={selectedDoctor.doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="space-y-6 pb-6">
                  {/* Doctor Header */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                          {selectedDoctor.doctor.specialization}
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold leading-tight mb-3">
                        {selectedDoctor.doctor.name}
                      </h1>
                      <p className="text-base text-muted-foreground">
                        Available appointments for the week
                      </p>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {selectedDoctor.doctor.location}
                          </p>
                          <p className="text-xs">Location</p>
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-10" />
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {selectedDoctor.schedule.length} days available
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />

                  {/* Schedule Days */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Select a Day
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {selectedDoctor.schedule.map((day, index) => (
                          <motion.button
                            key={day.date}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDay(index)}
                            className={cn(
                              "px-4 py-2 rounded-md text-sm font-medium transition-all",
                              selectedDay === index
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {day.day}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">
                          Available Time Slots - {selectedDoctor.schedule[selectedDay]?.day}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {selectedDoctor.schedule[selectedDay]?.slots.map((slot) => (
                          <motion.button
                            key={slot.id}
                            whileHover={slot.available ? { scale: 1.05 } : {}}
                            whileTap={slot.available ? { scale: 0.95 } : {}}
                            onClick={() => {
                              if (slot.available) {
                                alert(
                                  `Booking ${slot.time} with ${selectedDoctor.doctor.name} on ${selectedDoctor.schedule[selectedDay].day}`
                                );
                              }
                            }}
                            disabled={!slot.available}
                            className={cn(
                              "px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                              slot.available
                                ? "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer"
                                : "border-border/50 bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            )}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{slot.time}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      {selectedDoctor.schedule[selectedDay]?.slots.filter(
                        (slot) => slot.available
                      ).length === 0 && (
                        <p className="text-sm text-muted-foreground mt-4">
                          No available slots for this day. Please select another day.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Default view when no department or doctor selected
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <p className="text-muted-foreground">
                  Select a department or doctor to view schedules
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorSchedule;
