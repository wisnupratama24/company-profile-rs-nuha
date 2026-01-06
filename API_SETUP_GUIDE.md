# API Integration Setup Guide

## ✅ What's Been Done

The doctors page has been integrated with API calls using:
- **Axios** for HTTP requests
- **TanStack Query (React Query)** for data fetching and caching
- Service layer for API calls
- React hooks for easy component integration

## 📁 File Structure

```
src/
├── api/
│   ├── client.ts          # Axios client configuration
│   ├── index.ts           # Exports
│   └── README.md          # API configuration guide
├── services/
│   ├── doctors.ts         # Doctor-related API service functions
│   └── index.ts           # Exports
├── lib/
│   └── react-query.tsx    # React Query provider setup
└── modules/
    └── doctors/
        ├── hooks/
        │   └── use-doctors.ts  # React Query hooks for doctors
        └── doctors.tsx         # Updated component with API integration
```

## 🚀 Quick Start

### 1. Set Your API Endpoint

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
```

**OR** modify directly in `src/api/client.ts`:

```typescript
const API_BASE_URL = "https://your-api-endpoint.com/api";
```

### 2. That's It!

The component will automatically:
- Fetch doctors from the API
- Apply filters (department, search, date) via query parameters
- Handle loading and error states
- Support appointment booking

## 📡 API Endpoints Used

The component expects these endpoints (as documented in `API_DOCUMENTATION.md`):

1. **GET /api/doctors** - Fetch doctors with optional query params:
   - `department` - Filter by specialization
   - `search` - Search by doctor name
   - `date` - Filter by availability date

2. **POST /api/appointments** - Book an appointment

## 🔧 How It Works

### Data Fetching

The component uses the `useDoctors` hook which:
- Automatically fetches data when filters change
- Caches responses for 1 minute
- Handles loading and error states
- Refetches when needed

```typescript
const { data: doctors = [], isLoading, error } = useDoctors({
  department: selectedDepartment || undefined,
  search: searchDoctor.trim() || undefined,
  date: searchDate ? format(searchDate, "yyyy-MM-dd") : undefined,
});
```

### Booking Appointments

The component uses the `useBookAppointment` hook:

```typescript
const bookAppointmentMutation = useBookAppointment();

// Usage
await bookAppointmentMutation.mutateAsync({
  doctorId: "1",
  date: "2024-01-15",
  time: "09:00",
  patientName: "John Doe",
  patientEmail: "john@example.com",
  patientPhone: "+1234567890",
});
```

## 🎨 Features

- ✅ Automatic API calls with filters
- ✅ Loading states with spinner
- ✅ Error handling with retry button
- ✅ React Query caching (1 minute stale time)
- ✅ Automatic refetch on booking success
- ✅ TypeScript types for all API responses

## 🔄 Customization

### Change API Base URL

Edit `src/api/client.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "YOUR_DEFAULT_URL";
```

### Add Authentication

Uncomment the auth interceptor in `src/api/client.ts`:
```typescript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // ...
);
```

### Modify Caching

Edit `src/lib/react-query.tsx`:
```typescript
staleTime: 60 * 1000, // Change cache duration
```

### Customize Error Handling

Modify the response interceptor in `src/api/client.ts` to handle errors your way.

## 📝 Notes

- The component automatically handles all API states (loading, error, success)
- Filters are sent as query parameters to the API
- The API should handle the filtering logic (though client-side filtering is also supported)
- Appointment booking currently uses `prompt()` - you may want to replace this with a proper form/modal

## 🐛 Troubleshooting

### API calls not working?

1. Check your `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify the API endpoint is accessible
3. Check browser console for errors
4. Ensure CORS is configured on your API server

### Data not updating?

- React Query caches data for 1 minute
- To force refresh, invalidate queries or change filters
- Check React Query DevTools (bottom left corner in dev mode)

## 📚 Documentation

- See `API_DOCUMENTATION.md` for complete API specification
- See `src/api/README.md` for API client configuration

