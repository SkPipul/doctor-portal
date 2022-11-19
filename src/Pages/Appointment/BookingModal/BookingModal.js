import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatement, setTreatement, selectedDate }) => {
  const { name, slots } = treatement; //treatement is appointmentOptions
  const date = format(selectedDate, "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
        appointmentDate: date,
        treatement: name,
        patient: name,
        slot,
        email,
        phone
    }

    console.log(booking);
    // form.reset();
    setTreatement(null)
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-4 mt-12"
          >
            <input
              type="text"
              disabled
              value={date}
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Type name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Type email"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Type your phone number"
              name="phone"
              className="input input-bordered w-full"
            />
            <br />
            <input
              type="submit"
              value="Submit"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
