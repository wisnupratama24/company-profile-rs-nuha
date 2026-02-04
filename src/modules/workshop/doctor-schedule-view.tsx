"use client";
import nuhaApiClient from "@/api/nuha-client";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { normalizeBase64ImageSrc } from "../doctors/hooks/use-doctor-avatar";
import { Separator } from "@/components/ui/separator";

const dayName = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
  "Minggu",
];
function DoctorScheduleView() {
  const [details, setDetails] = React.useState<{
    nama_dokter: string;
    nama_spesialis: string;
    image: string;
    schedule: {
      day_name: string;
      times: { start: string; end: string }[];
    }[];
  } | null>(null);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getDoctorScheduleView = async () => {
      setLoading(true);
      const response = await nuhaApiClient.get("/dokter/detail-jadwal-dokter", {
        params: {
          pages: 1,
          limit: 1,
          tanggal_awal: "2026-01-19",
          tanggal_akhir: "2026-01-20",
          id_dokter: "15",
        },
      });
      if (response.data.meta_data.status === 200) {
        setLoading(false);
        setDetails({
          ...response.data.data.list[0],
          schedule: JSON.parse(response.data.data.list[0].schedule),
        });
      } else {
        setDetails(null);
        setLoading(true);
      }
    };

    getDoctorScheduleView();
  }, []);

  if (loading && details === null) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-6 border p-4">
          <img
            src={normalizeBase64ImageSrc(details?.image || "") || undefined}
            className="w-96"
          />
          <div className="text-center mt-4">
            <h4 className="text-xl font-bold">{details?.nama_dokter}</h4>
            <p>{details?.nama_spesialis}</p>
          </div>
        </div>
        <div className="col-span-6 p-4">
          <h4 className="text-xl font-bold">Jadwal Praktek</h4>
          <div className="flex flex-col gap-y-4 mt-4">
            {dayName.map((day, i) => {
              const findByName = details?.schedule.find(
                (s) => s.day_name.toLowerCase() === day.toLowerCase()
              );
              console.log("findByName", findByName);
              return (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <p className="text-lg">{day}</p>
                    <div>
                      {findByName === undefined && (
                        <span className="text-red-500 font-bold">
                          Tidak ada jadwal
                        </span>
                      )}
                      {findByName?.times.map((time, j) => {
                        return (
                          <span key={j}>
                            {time.start} - {time.end}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorScheduleView;
