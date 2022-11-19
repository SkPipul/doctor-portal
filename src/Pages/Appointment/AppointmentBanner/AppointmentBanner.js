import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png"

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header className="my-20" style={{
            background: `url(${bg})`
        }}>
            <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            alt="dentist chair"
            className="max-w-sm lg:max-w-md rounded-lg shadow-2xl"
          />
          <div className="m-6 shadow-xl p-3 rounded-lg">
            <DayPicker 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
        </header>
    );
};

export default AppointmentBanner;