import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
    const imageKey = process.env.REACT_APP_imgbb_key;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddDoctor = (data) => {
    const photo = data.photo[0];
    const formData = new FormData();
    formData.append('image', photo);
    // const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageKey}`
    fetch(`https://api.imgbb.com/1/upload?key=${imageKey}`, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(photoData => {
        if(photoData.success){
          console.log(photoData.data.url);
        }
        const doctor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          image: photoData.data.url
        }

        // doctor info from backend

        fetch('http://localhost:5000/doctors', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if(result.acknowledged){
            toast.success('Doctor added successfully', {
              position: 'top-center'
            })
            navigate('/dashboard/managedoctor')
          }
        })

    })
  };

  const { data: specialties, isLoading } = useQuery({
    queryKey: ['specialty'],
    queryFn: () => fetch('http://localhost:5000/appointmentSpecialty')
    .then(res => res.json())
  });

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="w-96 p-6">
      <h2 className="text-2xl">Add a Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500" role="alert">
            {errors.name?.message}
          </p>
        )}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          {...register("email", { required: "Email Address is required" })}
          type="email"
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500" role="alert">
            {errors.email?.message}
          </p>
        )}
        <label className="label">
          <span className="label-text">Specialty</span>
        </label>
        <div>
          <select
          {...register("specialty")}
          className="select select-bordered w-full mb-3">
            {
                specialties.map(specialty => <option
                    key={specialty._id}
                    value={specialty.name}
                >{specialty.name}</option>)
            }
          </select>
        </div>
        <label className="label">
          <span className="label-text">Photo</span>
        </label>
        <input
          {...register("photo", { required: "Photo is required" })}
          type="file"
          className="input input-bordered w-full"
        />
        {errors.photo && (
          <p className="text-red-500" role="alert">
            {errors.photo?.message}
          </p>
        )}
        <input
          type="submit"
          value="Add Doctor"
          className="btn btn-accent w-full mt-4"
        />
      </form>
    </div>
  );
};


/**
 * Three places to store your image
 * 1. Image hosting server ***
 * 2. File system of your server
 * 3. mongodb
 * */ 

export default AddDoctor;
