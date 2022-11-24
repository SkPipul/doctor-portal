import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllUsers = () => {

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            fetch('http://localhost:5000/users')
            .then(res => res.json())
    });

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization : `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('Admin added successfully', {
                    position: 'top-center'
                });
                refetch();
            }
        })
    }

    return (
        <div>
            <h2 className='text-2xl'>All Users</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, i) => <tr key={user._id}>
            <th>{i + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-success text-white'>Make Admin</button>}</td>
            <td><button className='btn btn-xs bg-red-500 border-none text-white'>Delete</button></td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;