import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const closeModal = () => {
    setDeleteDoctor(null);
  }

  const { data: doctors, isLoading, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: () =>
      fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  
  const handleDeleteDoctor = doctor => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        toast.success(`${doctor.name} deleted successfully`, {
          position: 'top-center'
        })
        refetch();
      }
    })
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-2xl">Manage Doctors</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-20 rounded">
                      <img
                        src={doctor.image}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td><label onClick={() => setDeleteDoctor(doctor)} htmlFor="Confirm-modal" className='btn btn-xs bg-red-500 border-none text-white'>Delete</label></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deleteDoctor && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`You selected ${deleteDoctor.name} for delete`}
          closeModal={closeModal}
          modalData={deleteDoctor}
          successAction={handleDeleteDoctor}
          successButtonName="Delete"
        ></ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctors;
