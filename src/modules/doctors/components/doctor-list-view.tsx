"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { DoctorScheduleData } from "../utils/constants";
import { DoctorScheduleView } from "./doctor-schedule-view";
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

// onDoctorSelect is kept for backward compatibility but not used in the new design

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
  
  // State untuk menyimpan selectedDay untuk setiap doctor
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({});
  
  const handleDaySelect = (doctorId: string, dayIndex: number) => {
    setSelectedDays((prev) => ({
      ...prev,
      [doctorId]: dayIndex,
    }));
  };

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
                    Nama: {searchDoctor}
                  </span>
                )}
                {searchDate && (
                  <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    Tanggal: {format(searchDate, "PPP")}
                  </span>
                )}
              </div>
            )}
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {showDoctorsList ? "Hasil Pencarian" : "Semua Departemen"}
            </h1>
            <p className="text-base text-muted-foreground">
              {showDoctorsList
                ? `${filteredDoctors.length} dokter ditemukan${
                    selectedDepartment && !searchDoctor && !searchDate
                      ? " di departemen ini"
                      : ""
                  }${(searchDoctor || searchDate) ? " sesuai pencarian Anda" : ""}`
                : `${departmentStats.length} departemen tersedia`}
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
                  Tidak ada dokter ditemukan sesuai kriteria pencarian Anda.
                </p>
              </div>
            ) : (
              filteredDoctors.map((doctor, index) => (
                <DoctorScheduleView
                  key={doctor.doctor.id}
                  doctor={doctor}
                  selectedDay={selectedDays[doctor.doctor.id] ?? 0}
                  onDaySelect={(dayIndex) => handleDaySelect(doctor.doctor.id, dayIndex)}
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

