"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { DoctorScheduleData } from "./utils/constants";
import { FilterSection } from "./components/filter-section";
import { SearchSection } from "./components/search-section";
import { DoctorListView } from "./components/doctor-list-view";
import { DoctorScheduleView } from "./components/doctor-schedule-view";
import { getAvailableSlotsCount, hasActiveFilters } from "./utils/helpers";
import { useDoctors, useBookAppointment } from "./hooks/use-doctors";

function DoctorSchedule() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorScheduleData | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  // Collapsible states
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(true);
  const [isDoctorsOpen, setIsDoctorsOpen] = useState(true);

  // Search states
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchDate, setSearchDate] = useState<Date | undefined>(undefined);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(true);

  // API: Fetch doctors with filters
  const { data: doctors = [], isLoading, error } = useDoctors({
    department: selectedDepartment || undefined,
    search: searchDoctor.trim() || undefined,
    date: searchDate ? format(searchDate, "yyyy-MM-dd") : undefined,
  });

  // Booking mutation
  const bookAppointmentMutation = useBookAppointment();

  // Get unique departments/specializations
  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    doctors.forEach((doctor) => {
      deptSet.add(doctor.doctor.specialization);
    });
    return Array.from(deptSet).sort();
  }, [doctors]);

  // Department stats for overview
  const departmentStats = useMemo(() => {
    return departments.map((dept) => {
      const deptDoctors = doctors.filter(
        (doctor) => doctor.doctor.specialization === dept
      );
      const totalSlots = deptDoctors.reduce(
        (acc, doc) => acc + getAvailableSlotsCount(doc),
        0
      );
      return {
        name: dept,
        doctors: deptDoctors.length,
        availableSlots: totalSlots,
      };
    });
  }, [departments, doctors]);

  // Filtered doctors (client-side filtering if needed, but API should handle most of it)
  const filteredDoctors = useMemo(() => {
    // API already filters by department, search, and date
    // This is just for additional client-side filtering if needed
    return doctors;
  }, [doctors]);

  // Prepare department items for FilterSection
  const departmentItems = useMemo(() => {
    return departments.map((dept) => ({
      id: dept,
      label: dept,
    }));
  }, [departments]);

  // Prepare doctor items for FilterSection
  const doctorItems = useMemo(() => {
    return filteredDoctors.map((doctor) => ({
      id: doctor.doctor.id,
      label: doctor.doctor.name,
      subtitle: doctor.doctor.specialization,
      doctorData: doctor, // Keep reference to full doctor data
    }));
  }, [filteredDoctors]);

  // Helper function to reset filter states
  const resetFilterStates = useCallback(() => {
    setShowAllDoctors(false);
    setShowAllDepartments(false);
  }, []);

  // Helper function to clear all filters
  const clearAllFilters = useCallback(() => {
    resetFilterStates();
    setShowAllDepartments(true);
    setSearchDoctor("");
    setSearchDate(undefined);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
    setSelectedDay(0);
  }, [resetFilterStates]);

  // Clear selected doctor when filters/search change; show list instead of auto-selecting
  useEffect(() => {
    if (hasActiveFilters(selectedDepartment, searchDoctor, searchDate)) {
      setSelectedDoctor(null);
      setSelectedDay(0);
      resetFilterStates();
    }
  }, [selectedDepartment, searchDoctor, searchDate, resetFilterStates]);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl w-full flex items-center justify-center min-h-[800px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading doctors...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl w-full flex items-center justify-center min-h-[800px]">
        <div className="text-center">
          <p className="text-destructive mb-4">
            {error instanceof Error ? error.message : "Failed to load doctors"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        <SearchSection
          searchDoctor={searchDoctor}
          searchDate={searchDate}
          onSearchDoctorChange={(value) => {
            resetFilterStates();
            setSearchDoctor(value);
          }}
          onSearchDateChange={(date) => {
            resetFilterStates();
            setSearchDate(date);
          }}
          onClearAll={clearAllFilters}
        />
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
          <FilterSection
            title="Department"
            icon={<Filter className="h-4 w-4" />}
            items={departmentItems}
            selectedId={selectedDepartment}
            onSelect={(id) => {
              if (id === null) {
                setSelectedDepartment(null);
                setSelectedDoctor(null);
                setSelectedDay(0);
                setShowAllDepartments(true);
                setShowAllDoctors(false);
              } else {
                setSelectedDepartment(id);
                resetFilterStates();
              }
            }}
            allLabel="All Departments"
            isOpen={isDepartmentOpen}
            onOpenChange={setIsDepartmentOpen}
            showAllButton={true}
            isAllActive={
              !selectedDepartment && !selectedDoctor && !showAllDoctors
            }
          />

          {/* Doctors List */}
          <FilterSection
            title="Doctors"
            items={doctorItems}
            selectedId={selectedDoctor?.doctor.id || null}
            onSelect={(id) => {
              if (id === null) {
                setSelectedDepartment(null);
                setSelectedDoctor(null);
                setSelectedDay(0);
                setShowAllDoctors(true);
                setShowAllDepartments(false);
                setSearchDoctor("");
                setSearchDate(undefined);
              } else {
                const doctor = filteredDoctors.find((d) => d.doctor.id === id);
                if (doctor) {
                  resetFilterStates();
                  setSelectedDepartment(null);
                  setSelectedDoctor(doctor);
                  setSelectedDay(0);
                }
              }
            }}
            allLabel="All Doctors"
            isOpen={isDoctorsOpen}
            onOpenChange={setIsDoctorsOpen}
            count={
              selectedDepartment || searchDoctor || searchDate
                ? filteredDoctors.length
                : undefined
            }
            subtitle={
              searchDoctor || searchDate ? "Filtered by search" : undefined
            }
            showAllButton={true}
            isAllActive={
              showAllDoctors &&
              !selectedDoctor &&
              !selectedDepartment &&
              !searchDoctor &&
              !searchDate
            }
          />
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
              <DoctorListView
                selectedDepartment={selectedDepartment}
                searchDoctor={searchDoctor}
                searchDate={searchDate}
                showAllDoctors={showAllDoctors}
                filteredDoctors={filteredDoctors}
                departmentStats={departmentStats}
                onDoctorSelect={(doctor) => {
                  resetFilterStates();
                  setSelectedDepartment(null);
                  setSelectedDoctor(doctor);
                  setSelectedDay(0);
                }}
                onDepartmentSelect={setSelectedDepartment}
              />
            ) : (
              <DoctorScheduleView
                doctor={selectedDoctor}
                selectedDay={selectedDay}
                onDaySelect={setSelectedDay}
                onSlotClick={async (slotTime, day) => {
                  if (!selectedDoctor) return;

                  const date = selectedDoctor.schedule[selectedDay]?.date;
                  if (!date) return;

                  // For now, show a prompt for patient info
                  // You can replace this with a proper form/modal
                  const patientName = prompt("Enter your name:");
                  const patientEmail = prompt("Enter your email:");
                  const patientPhone = prompt("Enter your phone:");

                  if (patientName && patientEmail && patientPhone) {
                    try {
                      await bookAppointmentMutation.mutateAsync({
                        doctorId: selectedDoctor.doctor.id,
                        date,
                        time: slotTime,
                        patientName,
                        patientEmail,
                        patientPhone,
                      });
                      alert("Appointment booked successfully!");
                    } catch (error) {
                      alert(
                        `Failed to book appointment: ${
                          error instanceof Error ? error.message : "Unknown error"
                        }`
                      );
                    }
                  }
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorSchedule;
