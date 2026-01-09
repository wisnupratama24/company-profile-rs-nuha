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
      name: "Dr. Siti Nurhaliza",
      specialization: "Kardiolog",
      location: "Ruang 201, Lantai 2",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
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
        day: "Selasa",
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
        day: "Rabu",
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
        day: "Kamis",
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
        day: "Jumat",
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
      name: "Dr. Ahmad Wijaya",
      specialization: "Neurolog",
      location: "Ruang 305, Lantai 3",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
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
        day: "Selasa",
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
        day: "Rabu",
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
        day: "Kamis",
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
        day: "Jumat",
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
      name: "Dr. Ratna Dewi",
      specialization: "Dokter Anak",
      location: "Ruang 102, Lantai 1",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
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
        day: "Selasa",
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
        day: "Rabu",
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
        day: "Kamis",
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
        day: "Jumat",
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
      name: "Dr. Budi Santoso",
      specialization: "Dokter Bedah Orthopedi",
      location: "Ruang 401, Lantai 4",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
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
        day: "Selasa",
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
        day: "Rabu",
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
        day: "Kamis",
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
        day: "Jumat",
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
  {
    doctor: {
      id: "5",
      name: "Dr. Maya Sari",
      specialization: "Dokter Kandungan",
      location: "Ruang 203, Lantai 2",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "121", time: "08:00", available: true },
          { id: "122", time: "09:00", available: true },
          { id: "123", time: "10:00", available: false },
          { id: "124", time: "13:00", available: true },
          { id: "125", time: "14:00", available: true },
          { id: "126", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "127", time: "08:00", available: true },
          { id: "128", time: "09:00", available: false },
          { id: "129", time: "10:00", available: true },
          { id: "130", time: "13:00", available: true },
          { id: "131", time: "14:00", available: true },
          { id: "132", time: "15:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "133", time: "08:00", available: true },
          { id: "134", time: "09:00", available: true },
          { id: "135", time: "10:00", available: true },
          { id: "136", time: "13:00", available: false },
          { id: "137", time: "14:00", available: true },
          { id: "138", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "139", time: "08:00", available: true },
          { id: "140", time: "09:00", available: true },
          { id: "141", time: "10:00", available: true },
          { id: "142", time: "13:00", available: true },
          { id: "143", time: "14:00", available: false },
          { id: "144", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "145", time: "08:00", available: false },
          { id: "146", time: "09:00", available: true },
          { id: "147", time: "10:00", available: true },
          { id: "148", time: "13:00", available: true },
          { id: "149", time: "14:00", available: true },
          { id: "150", time: "15:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "6",
      name: "Dr. Rizki Pratama",
      specialization: "Dokter Mata",
      location: "Ruang 304, Lantai 3",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "151", time: "09:00", available: true },
          { id: "152", time: "10:00", available: true },
          { id: "153", time: "11:00", available: false },
          { id: "154", time: "14:00", available: true },
          { id: "155", time: "15:00", available: true },
          { id: "156", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "157", time: "09:00", available: true },
          { id: "158", time: "10:00", available: false },
          { id: "159", time: "11:00", available: true },
          { id: "160", time: "14:00", available: true },
          { id: "161", time: "15:00", available: true },
          { id: "162", time: "16:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "163", time: "09:00", available: true },
          { id: "164", time: "10:00", available: true },
          { id: "165", time: "11:00", available: true },
          { id: "166", time: "14:00", available: false },
          { id: "167", time: "15:00", available: true },
          { id: "168", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "169", time: "09:00", available: false },
          { id: "170", time: "10:00", available: true },
          { id: "171", time: "11:00", available: true },
          { id: "172", time: "14:00", available: true },
          { id: "173", time: "15:00", available: true },
          { id: "174", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "175", time: "09:00", available: true },
          { id: "176", time: "10:00", available: true },
          { id: "177", time: "11:00", available: false },
          { id: "178", time: "14:00", available: true },
          { id: "179", time: "15:00", available: true },
          { id: "180", time: "16:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "7",
      name: "Dr. Indah Permata",
      specialization: "Dokter Kulit dan Kelamin",
      location: "Ruang 103, Lantai 1",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "181", time: "10:00", available: true },
          { id: "182", time: "11:00", available: true },
          { id: "183", time: "12:00", available: false },
          { id: "184", time: "15:00", available: true },
          { id: "185", time: "16:00", available: true },
          { id: "186", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "187", time: "10:00", available: true },
          { id: "188", time: "11:00", available: false },
          { id: "189", time: "12:00", available: true },
          { id: "190", time: "15:00", available: true },
          { id: "191", time: "16:00", available: true },
          { id: "192", time: "17:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "193", time: "10:00", available: false },
          { id: "194", time: "11:00", available: true },
          { id: "195", time: "12:00", available: true },
          { id: "196", time: "15:00", available: true },
          { id: "197", time: "16:00", available: true },
          { id: "198", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "199", time: "10:00", available: true },
          { id: "200", time: "11:00", available: true },
          { id: "201", time: "12:00", available: true },
          { id: "202", time: "15:00", available: false },
          { id: "203", time: "16:00", available: true },
          { id: "204", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "205", time: "10:00", available: true },
          { id: "206", time: "11:00", available: true },
          { id: "207", time: "12:00", available: false },
          { id: "208", time: "15:00", available: true },
          { id: "209", time: "16:00", available: true },
          { id: "210", time: "17:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "8",
      name: "Dr. Agung Setiawan",
      specialization: "Dokter THT",
      location: "Ruang 306, Lantai 3",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "211", time: "08:00", available: true },
          { id: "212", time: "09:00", available: false },
          { id: "213", time: "10:00", available: true },
          { id: "214", time: "13:00", available: true },
          { id: "215", time: "14:00", available: true },
          { id: "216", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "217", time: "08:00", available: true },
          { id: "218", time: "09:00", available: true },
          { id: "219", time: "10:00", available: false },
          { id: "220", time: "13:00", available: true },
          { id: "221", time: "14:00", available: true },
          { id: "222", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "223", time: "08:00", available: true },
          { id: "224", time: "09:00", available: true },
          { id: "225", time: "10:00", available: true },
          { id: "226", time: "13:00", available: false },
          { id: "227", time: "14:00", available: true },
          { id: "228", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "229", time: "08:00", available: false },
          { id: "230", time: "09:00", available: true },
          { id: "231", time: "10:00", available: true },
          { id: "232", time: "13:00", available: true },
          { id: "233", time: "14:00", available: true },
          { id: "234", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "235", time: "08:00", available: true },
          { id: "236", time: "09:00", available: true },
          { id: "237", time: "10:00", available: false },
          { id: "238", time: "13:00", available: true },
          { id: "239", time: "14:00", available: true },
          { id: "240", time: "15:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "9",
      name: "Dr. Lina Wati",
      specialization: "Dokter Gigi",
      location: "Ruang 202, Lantai 2",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "241", time: "09:00", available: true },
          { id: "242", time: "10:00", available: true },
          { id: "243", time: "11:00", available: false },
          { id: "244", time: "14:00", available: true },
          { id: "245", time: "15:00", available: true },
          { id: "246", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "247", time: "09:00", available: true },
          { id: "248", time: "10:00", available: false },
          { id: "249", time: "11:00", available: true },
          { id: "250", time: "14:00", available: true },
          { id: "251", time: "15:00", available: true },
          { id: "252", time: "16:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "253", time: "09:00", available: false },
          { id: "254", time: "10:00", available: true },
          { id: "255", time: "11:00", available: true },
          { id: "256", time: "14:00", available: true },
          { id: "257", time: "15:00", available: true },
          { id: "258", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "259", time: "09:00", available: true },
          { id: "260", time: "10:00", available: true },
          { id: "261", time: "11:00", available: true },
          { id: "262", time: "14:00", available: false },
          { id: "263", time: "15:00", available: true },
          { id: "264", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "265", time: "09:00", available: true },
          { id: "266", time: "10:00", available: true },
          { id: "267", time: "11:00", available: false },
          { id: "268", time: "14:00", available: true },
          { id: "269", time: "15:00", available: true },
          { id: "270", time: "16:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "10",
      name: "Dr. Hendra Gunawan",
      specialization: "Dokter Paru",
      location: "Ruang 402, Lantai 4",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "271", time: "08:00", available: true },
          { id: "272", time: "09:00", available: true },
          { id: "273", time: "10:00", available: false },
          { id: "274", time: "13:00", available: true },
          { id: "275", time: "14:00", available: true },
          { id: "276", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "277", time: "08:00", available: true },
          { id: "278", time: "09:00", available: false },
          { id: "279", time: "10:00", available: true },
          { id: "280", time: "13:00", available: true },
          { id: "281", time: "14:00", available: true },
          { id: "282", time: "15:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "283", time: "08:00", available: true },
          { id: "284", time: "09:00", available: true },
          { id: "285", time: "10:00", available: true },
          { id: "286", time: "13:00", available: false },
          { id: "287", time: "14:00", available: true },
          { id: "288", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "289", time: "08:00", available: false },
          { id: "290", time: "09:00", available: true },
          { id: "291", time: "10:00", available: true },
          { id: "292", time: "13:00", available: true },
          { id: "293", time: "14:00", available: true },
          { id: "294", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "295", time: "08:00", available: true },
          { id: "296", time: "09:00", available: true },
          { id: "297", time: "10:00", available: true },
          { id: "298", time: "13:00", available: false },
          { id: "299", time: "14:00", available: true },
          { id: "300", time: "15:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "11",
      name: "Dr. Andi Prakoso",
      specialization: "Kardiolog",
      location: "Ruang 205, Lantai 2",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "301", time: "08:00", available: true },
          { id: "302", time: "09:00", available: true },
          { id: "303", time: "10:00", available: false },
          { id: "304", time: "13:00", available: true },
          { id: "305", time: "14:00", available: true },
          { id: "306", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "307", time: "08:00", available: true },
          { id: "308", time: "09:00", available: false },
          { id: "309", time: "10:00", available: true },
          { id: "310", time: "13:00", available: true },
          { id: "311", time: "14:00", available: true },
          { id: "312", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "313", time: "08:00", available: true },
          { id: "314", time: "09:00", available: true },
          { id: "315", time: "10:00", available: true },
          { id: "316", time: "13:00", available: false },
          { id: "317", time: "14:00", available: true },
          { id: "318", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "319", time: "08:00", available: false },
          { id: "320", time: "09:00", available: true },
          { id: "321", time: "10:00", available: true },
          { id: "322", time: "13:00", available: true },
          { id: "323", time: "14:00", available: true },
          { id: "324", time: "15:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "325", time: "08:00", available: true },
          { id: "326", time: "09:00", available: true },
          { id: "327", time: "10:00", available: false },
          { id: "328", time: "13:00", available: true },
          { id: "329", time: "14:00", available: true },
          { id: "330", time: "15:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "12",
      name: "Dr. Putri Anindya",
      specialization: "Neurolog",
      location: "Ruang 307, Lantai 3",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "331", time: "09:00", available: true },
          { id: "332", time: "10:00", available: true },
          { id: "333", time: "11:00", available: false },
          { id: "334", time: "14:00", available: true },
          { id: "335", time: "15:00", available: true },
          { id: "336", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "337", time: "09:00", available: true },
          { id: "338", time: "10:00", available: false },
          { id: "339", time: "11:00", available: true },
          { id: "340", time: "14:00", available: true },
          { id: "341", time: "15:00", available: true },
          { id: "342", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "343", time: "09:00", available: false },
          { id: "344", time: "10:00", available: true },
          { id: "345", time: "11:00", available: true },
          { id: "346", time: "14:00", available: true },
          { id: "347", time: "15:00", available: true },
          { id: "348", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "349", time: "09:00", available: true },
          { id: "350", time: "10:00", available: true },
          { id: "351", time: "11:00", available: true },
          { id: "352", time: "14:00", available: false },
          { id: "353", time: "15:00", available: true },
          { id: "354", time: "16:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "355", time: "09:00", available: true },
          { id: "356", time: "10:00", available: true },
          { id: "357", time: "11:00", available: false },
          { id: "358", time: "14:00", available: true },
          { id: "359", time: "15:00", available: true },
          { id: "360", time: "16:00", available: true },
        ],
      },
    ],
  },
  {
    doctor: {
      id: "13",
      name: "Dr. Nisa Maharani",
      specialization: "Dokter Anak",
      location: "Ruang 104, Lantai 1",
    },
    schedule: [
      {
        date: "2024-01-15",
        day: "Senin",
        slots: [
          { id: "361", time: "10:00", available: true },
          { id: "362", time: "11:00", available: true },
          { id: "363", time: "12:00", available: false },
          { id: "364", time: "15:00", available: true },
          { id: "365", time: "16:00", available: true },
          { id: "366", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-16",
        day: "Selasa",
        slots: [
          { id: "367", time: "10:00", available: true },
          { id: "368", time: "11:00", available: false },
          { id: "369", time: "12:00", available: true },
          { id: "370", time: "15:00", available: true },
          { id: "371", time: "16:00", available: true },
          { id: "372", time: "17:00", available: false },
        ],
      },
      {
        date: "2024-01-17",
        day: "Rabu",
        slots: [
          { id: "373", time: "10:00", available: true },
          { id: "374", time: "11:00", available: true },
          { id: "375", time: "12:00", available: true },
          { id: "376", time: "15:00", available: false },
          { id: "377", time: "16:00", available: true },
          { id: "378", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-18",
        day: "Kamis",
        slots: [
          { id: "379", time: "10:00", available: true },
          { id: "380", time: "11:00", available: true },
          { id: "381", time: "12:00", available: true },
          { id: "382", time: "15:00", available: true },
          { id: "383", time: "16:00", available: false },
          { id: "384", time: "17:00", available: true },
        ],
      },
      {
        date: "2024-01-19",
        day: "Jumat",
        slots: [
          { id: "385", time: "10:00", available: true },
          { id: "386", time: "11:00", available: true },
          { id: "387", time: "12:00", available: false },
          { id: "388", time: "15:00", available: true },
          { id: "389", time: "16:00", available: true },
          { id: "390", time: "17:00", available: true },
        ],
      },
    ],
  },
];

