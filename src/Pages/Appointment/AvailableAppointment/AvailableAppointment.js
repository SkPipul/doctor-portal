import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointment = ({ selectedDate }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatement, setTreatement] = useState(null);

  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);

  return (
    <section className="my-10">
      <p className="text xl font-bold text-secondary text-center">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            option={option}
            setTreatement={setTreatement}
          ></AppointmentOption>
        ))}
      </div>
      {
        treatement &&
        <BookingModal
        treatement={treatement}
        selectedDate={selectedDate}
        setTreatement={setTreatement}
      ></BookingModal>}
    </section>
  );
};

export default AvailableAppointment;
