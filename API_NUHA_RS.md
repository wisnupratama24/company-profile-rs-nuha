# API Documentation - Doctors Schedule Module

This document outlines the API endpoints required for the Doctors Schedule page in the frontend application.

## Overview

The Doctors Schedule module allows users to:
- View all available doctors with their schedules
- Filter doctors by department/specialization
- Search doctors by name
- Search doctors by available date
- View department statistics
- View individual doctor schedules with time slots

---

## Base URL

```
/api
```

---

## Endpoints

### 1. Get Doctors with Schedules

**Endpoint:** `GET /api/doctors`

**Description:** Retrieves a list of all doctors with their schedules. Supports filtering and searching via query parameters.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `department` | string | No | Filter by doctor's specialization/department (e.g., "Cardiologist", "Neurologist") |
| `search` | string | No | Search doctors by name (case-insensitive partial match) |
| `date` | string | No | Filter doctors who have availability on this date (format: `yyyy-MM-dd`, e.g., "2024-01-15") |

**Example Requests:**

```bash
# Get all doctors
GET /api/doctors

# Filter by department
GET /api/doctors?department=Cardiologist

# Search by name
GET /api/doctors?search=Sarah

# Filter by date
GET /api/doctors?date=2024-01-15

# Combined filters
GET /api/doctors?department=Cardiologist&search=Sarah&date=2024-01-15
```

**Response Format:**

```json
[
  {
    "doctor": {
      "id": "1",
      "name": "Dr. Sarah Johnson",
      "specialization": "Cardiologist",
      "location": "Room 201, Floor 2"
    },
    "schedule": [
      {
        "date": "2024-01-15",
        "day": "Monday",
        "slots": [
          {
            "id": "1",
            "time": "09:00",
            "available": true
          },
          {
            "id": "2",
            "time": "10:00",
            "available": false
          },
          {
            "id": "3",
            "time": "11:00",
            "available": true
          }
        ]
      },
      {
        "date": "2024-01-16",
        "day": "Tuesday",
        "slots": [
          {
            "id": "7",
            "time": "09:00",
            "available": true
          },
          {
            "id": "8",
            "time": "10:00",
            "available": true
          }
        ]
      }
    ]
  },
  {
    "doctor": {
      "id": "2",
      "name": "Dr. Michael Chen",
      "specialization": "Neurologist",
      "location": "Room 305, Floor 3"
    },
    "schedule": [...]
  }
]
```

**Response Status Codes:**

- `200 OK` - Success
- `400 Bad Request` - Invalid query parameters
- `500 Internal Server Error` - Server error

---

### 2. Get Single Doctor by ID (Optional)

**Endpoint:** `GET /api/doctors/:id`

**Description:** Retrieves detailed schedule information for a specific doctor.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Doctor's unique identifier |

**Example Request:**

```bash
GET /api/doctors/1
```

**Response Format:**

```json
{
  "doctor": {
    "id": "1",
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiologist",
    "location": "Room 201, Floor 2"
  },
  "schedule": [
    {
      "date": "2024-01-15",
      "day": "Monday",
      "slots": [
        {
          "id": "1",
          "time": "09:00",
          "available": true
        }
      ]
    }
  ]
}
```

**Response Status Codes:**

- `200 OK` - Success
- `404 Not Found` - Doctor not found
- `500 Internal Server Error` - Server error

---

## Data Models

### Doctor

```typescript
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
}
```

### TimeSlot

```typescript
interface TimeSlot {
  id: string;
  time: string;        // Format: "HH:mm" (e.g., "09:00", "14:30")
  available: boolean;
}
```

### ScheduleDay

```typescript
interface ScheduleDay {
  date: string;        // Format: "yyyy-MM-dd" (e.g., "2024-01-15")
  day: string;         // Day name (e.g., "Monday", "Tuesday")
  slots: TimeSlot[];
}
```

### DoctorScheduleData

```typescript
interface DoctorScheduleData {
  doctor: Doctor;
  schedule: ScheduleDay[];
}
```

---

## Filtering Logic

### Department Filter
- When `department` parameter is provided, return only doctors whose `specialization` matches the provided value (case-sensitive exact match recommended, but case-insensitive is acceptable).

### Search Filter
- When `search` parameter is provided, return doctors whose `name` contains the search term (case-insensitive partial match).

### Date Filter
- When `date` parameter is provided, return only doctors who have at least one schedule day with a matching `date` AND at least one available slot (`available: true`) on that day.

### Combined Filters
- When multiple query parameters are provided, apply all filters with AND logic (doctor must match all criteria).

---

## Error Handling

All endpoints should return appropriate HTTP status codes and error messages in the following format:

```json
{
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "message": "Detailed error message"
}
```

### Common Error Codes

- `INVALID_PARAMETER` - Invalid or missing required parameter
- `DOCTOR_NOT_FOUND` - Doctor with specified ID not found
- `INVALID_DATE_FORMAT` - Date format is incorrect
- `INVALID_TIME_FORMAT` - Time format is incorrect
- `SERVER_ERROR` - Internal server error

---

## Notes for Backend Implementation

1. **Date Format:** All dates should be in `yyyy-MM-dd` format (ISO 8601 date format).

2. **Time Format:** All times should be in `HH:mm` format (24-hour format, e.g., "09:00", "14:30").

3. **Availability:** The `available` field in time slots should reflect real-time availability. If a slot is booked, it should be marked as `available: false`.

4. **Schedule Days:** Each doctor should have a schedule array containing days with available slots. Days without any available slots can be omitted or included with empty slots array.

5. **Performance:** Consider implementing pagination if the number of doctors is large (though not required initially).

6. **Caching:** Consider implementing appropriate caching headers for the GET endpoints to improve performance.

---

## Example Response for Empty Results

When no doctors match the filter criteria, return an empty array:

```json
[]
```

---

## Testing Examples

### Test Case 1: Get All Doctors
```bash
curl -X GET "http://localhost:3000/api/doctors"
```

### Test Case 2: Filter by Department
```bash
curl -X GET "http://localhost:3000/api/doctors?department=Cardiologist"
```

### Test Case 3: Search by Name
```bash
curl -X GET "http://localhost:3000/api/doctors?search=Sarah"
```

### Test Case 4: Filter by Date
```bash
curl -X GET "http://localhost:3000/api/doctors?date=2024-01-15"
```

---

## Questions or Clarifications

If you have any questions or need clarifications about these API requirements, please contact the frontend team.

---

**Last Updated:** 2024-01-10

