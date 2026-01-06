"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { DoctorScheduleData } from "../utils/constants";
import { DoctorCard } from "./doctor-card";
import { DepartmentCard } from "./department-card";
import { hasActiveFilters } from "../utils/helpers";

interface DepartmentStat {
  name: string;
  doctors: number;
  availableSlots: number;
}

interface DoctorListViewProps {
  selectedDepartment: string | null;
  searchDoctor: string;
  searchDate: Date | undefined;
  showAllDoctors: boolean;
  filteredDoctors: DoctorScheduleData[];
  departmentStats: DepartmentStat[];
  onDoctorSelect: (doctor: DoctorScheduleData) => void;
  onDepartmentSelect: (department: string) => void;
}

export function DoctorListView({
  selectedDepartment,
  searchDoctor,
  searchDate,
  showAllDoctors,
  filteredDoctors,
  departmentStats,
  onDoctorSelect,
  onDepartmentSelect,
}: DoctorListViewProps) {
  const hasFilters = hasActiveFilters(selectedDepartment, searchDoctor, searchDate);
  const showDoctorsList = hasFilters || showAllDoctors;

  return (
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
              {showDoctorsList ? "Search Results" : "All Departments"}
            </h1>
            <p className="text-base text-muted-foreground">
              {showDoctorsList
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

        {/* Content */}
        {showDoctorsList ? (
          <div className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No doctors found matching your search criteria.
                </p>
              </div>
            ) : (
              filteredDoctors.map((doctor, index) => (
                <DoctorCard
                  key={doctor.doctor.id}
                  doctor={doctor}
                  index={index}
                  onClick={() => onDoctorSelect(doctor)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {departmentStats.map((dept, index) => (
              <DepartmentCard
                key={dept.name}
                name={dept.name}
                doctors={dept.doctors}
                availableSlots={dept.availableSlots}
                index={index}
                onClick={() => onDepartmentSelect(dept.name)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

