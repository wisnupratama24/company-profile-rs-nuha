export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface ScheduleDay {
  date: string;
  day: string;
  slots: TimeSlot[];
}

export interface DoctorScheduleData {
  doctor: Doctor;
  schedule: ScheduleDay[];
}

export const doctors: DoctorScheduleData[] = [
  {
    doctor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      location: "Room 201, Floor 2",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Monday",
        slots: [
          { id: "1", time: "09:00", available: true },
          { id: "2", time: "10:00", available: false },
          { id: "3", time: "11:00", available: true },
          { id: "4", time: "14:00", available: true },
          { id: "5", time: "15:00", available: false },
          { id: "6", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        slots: [
          { id: "7", time: "09:00", available: true },
          { id: "8", time: "10:00", available: true },
          { id: "9", time: "11:00", available: false },
          { id: "10", time: "14:00", available: true },
          { id: "11", time: "15:00", available: true },
          { id: "12", time: "16:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        slots: [
          { id: "13", time: "09:00", available: false },
          { id: "14", time: "10:00", available: true },
          { id: "15", time: "11:00", available: true },
          { id: "16", time: "14:00", available: true },
          { id: "17", time: "15:00", available: true },
          { id: "18", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Thursday",
        slots: [
          { id: "19", time: "09:00", available: true },
          { id: "20", time: "10:00", available: true },
          { id: "21", time: "11:00", available: true },
          { id: "22", time: "14:00", available: false },
          { id: "23", time: "15:00", available: true },
          { id: "24", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Friday",
        slots: [
          { id: "25", time: "09:00", available: true },
          { id: "26", time: "10:00", available: false },
          { id: "27", time: "11:00", available: true },
          { id: "28", time: "14:00", available: true },
          { id: "29", time: "15:00", available: true },
          { id: "30", time: "16:00", available: false },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      location: "Room 305, Floor 3",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Monday",
        slots: [
          { id: "31", time: "08:00", available: true },
          { id: "32", time: "09:00", available: true },
          { id: "33", time: "10:00", available: false },
          { id: "34", time: "13:00", available: true },
          { id: "35", time: "14:00", available: true },
          { id: "36", time: "15:00", available: false },
        ],
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        slots: [
          { id: "37", time: "08:00", available: true },
          { id: "38", time: "09:00", available: false },
          { id: "39", time: "10:00", available: true },
          { id: "40", time: "13:00", available: true },
          { id: "41", time: "14:00", available: true },
          { id: "42", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        slots: [
          { id: "43", time: "08:00", available: true },
          { id: "44", time: "09:00", available: true },
          { id: "45", time: "10:00", available: true },
          { id: "46", time: "13:00", available: false },
          { id: "47", time: "14:00", available: true },
          { id: "48", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Thursday",
        slots: [
          { id: "49", time: "08:00", available: true },
          { id: "50", time: "09:00", available: true },
          { id: "51", time: "10:00", available: false },
          { id: "52", time: "13:00", available: true },
          { id: "53", time: "14:00", available: true },
          { id: "54", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Friday",
        slots: [
          { id: "55", time: "08:00", available: true },
          { id: "56", time: "09:00", available: true },
          { id: "57", time: "10:00", available: true },
          { id: "58", time: "13:00", available: true },
          { id: "59", time: "14:00", available: false },
          { id: "60", time: "15:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrician",
      location: "Room 102, Floor 1",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Monday",
        slots: [
          { id: "61", time: "10:00", available: true },
          { id: "62", time: "11:00", available: true },
          { id: "63", time: "12:00", available: false },
          { id: "64", time: "15:00", available: true },
          { id: "65", time: "16:00", available: true },
          { id: "66", time: "17:00", available: false },
        ],
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        slots: [
          { id: "67", time: "10:00", available: true },
          { id: "68", time: "11:00", available: false },
          { id: "69", time: "12:00", available: true },
          { id: "70", time: "15:00", available: true },
          { id: "71", time: "16:00", available: true },
          { id: "72", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        slots: [
          { id: "73", time: "10:00", available: true },
          { id: "74", time: "11:00", available: true },
          { id: "75", time: "12:00", available: true },
          { id: "76", time: "15:00", available: false },
          { id: "77", time: "16:00", available: true },
          { id: "78", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Thursday",
        slots: [
          { id: "79", time: "10:00", available: true },
          { id: "80", time: "11:00", available: true },
          { id: "81", time: "12:00", available: true },
          { id: "82", time: "15:00", available: true },
          { id: "83", time: "16:00", available: false },
          { id: "84", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Friday",
        slots: [
          { id: "85", time: "10:00", available: true },
          { id: "86", time: "11:00", available: true },
          { id: "87", time: "12:00", available: false },
          { id: "88", time: "15:00", available: true },
          { id: "89", time: "16:00", available: true },
          { id: "90", time: "17:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "4",
      name: "Dr. James Wilson",
      specialization: "Orthopedic Surgeon",
      location: "Room 401, Floor 4",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Monday",
        slots: [
          { id: "91", time: "09:00", available: true },
          { id: "92", time: "10:00", available: false },
          { id: "93", time: "11:00", available: true },
          { id: "94", time: "14:00", available: true },
          { id: "95", time: "15:00", available: true },
          { id: "96", time: "16:00", available: false },
        ],
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        slots: [
          { id: "97", time: "09:00", available: true },
          { id: "98", time: "10:00", available: true },
          { id: "99", time: "11:00", available: false },
          { id: "100", time: "14:00", available: true },
          { id: "101", time: "15:00", available: true },
          { id: "102", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        slots: [
          { id: "103", time: "09:00", available: false },
          { id: "104", time: "10:00", available: true },
          { id: "105", time: "11:00", available: true },
          { id: "106", time: "14:00", available: true },
          { id: "107", time: "15:00", available: true },
          { id: "108", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Thursday",
        slots: [
          { id: "109", time: "09:00", available: true },
          { id: "110", time: "10:00", available: true },
          { id: "111", time: "11:00", available: true },
          { id: "112", time: "14:00", available: false },
          { id: "113", time: "15:00", available: true },
          { id: "114", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Friday",
        slots: [
          { id: "115", time: "09:00", available: true },
          { id: "116", time: "10:00", available: false },
          { id: "117", time: "11:00", available: true },
          { id: "118", time: "14:00", available: true },
          { id: "119", time: "15:00", available: true },
          { id: "120", time: "16:00", available: false },
        ],
      },
    ],
  },
];

