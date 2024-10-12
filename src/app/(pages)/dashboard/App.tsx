"use client"

import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePagination from '@/utils/usePagination';
import Loader from '@/app/_components/Loader';
import { faPenToSquare, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/app/_components/Spinner';
import ImageLoader from '@/app/_components/ImageLoader';
import ConfirmModal from '@/app/_components/ConfirmModal';
import Pagination from '@/app/_components/Pagination';
import AddForm from './Form';
import DashBoardHeader from './DashBoardHeader';


type Props ={
    user: any
}



const Page:React.FC<Props>  = ({user}) => {


    const [destinations, setDestinations] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openEditId, setOpenEditId] = useState<string | null>(null);
    const [editObj, setEditObj] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openAddForm, setOpenAddForm] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");


  
  


    useEffect(() => {
      if (error) {
          toast.error(error);
      }
    }, [error]);

  //handle open edit

  

  const handleOpenEdit = (id: string) => {
    setOpenEdit(!openEdit);
    setOpenEditId(id);
    setEditObj(destinations.find(d => d._id === id) || null);
  };

  //submit edit
  const handleSubmitEdit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(editObj === null) {
      toast.error("no available data");
      return;
    }

 

   
    // try {
    //   const response = await axios.put(`/api/destination/${editObj._id}`, formData);
    //   if(response.data.success) {
    //     setOpenEdit(false);
    //     fetchData();
    //     toast.success(response.data.message);
    //     setIsLoading(false);
    //   } else {
    //     toast.error(response.data.message);
    //     setIsLoading(false);
    //   }
    // } catch (error: any) {
    //   toast.error("Network error");
    // }finally{
    //   setIsLoading(false);
    // }
  }


   //delete data 
   const deleteData = async (id: string) => {
    // try {
    //   const response = await axios.delete(`/api/destination/${id}`);
    //   if (response.data.success) {
    //     toast.success(response.data.message);
      
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // } catch (error) {
    //   toast.error('network error');
    // }
  };

  const handleDelete = (id: string) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteData(deleteId);
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  //build function
  const [loadingBuild, setLoadingBuild] = useState<Boolean>(false);

  const handleBuildClick = async() => {
    // setLoadingBuild(true);
    // try {
    //   const message = await handleBuild();

    //   toast.success(message);
    // }catch (error: any) {
    //   toast.error(error.message)
    // }finally {
    //   setLoadingBuild(false);
    // }
  } 


  //filtering search results
  const filteredData = destinations.filter((d) => {
    return (
      d.countryCode?.toString().toLowerCase().includes(searchQuery) ||
      d.name?.toString().toLowerCase().includes(searchQuery) ||
      d.stationID?.toString().toLowerCase().includes(searchQuery) ||
      d.destinationNumber?.toString().toLowerCase().includes(searchQuery)
    )
  })

  //pagination use hook
  const {
    pageData,
    currentPage,
    pageCount,
    itemsPerPage,
    handleNavPrev,
    handleNavNext,
    handlePageClick,
  } = usePagination(filteredData, 60);

//   if (loading) {
//     return (
//       <Loader/>
//     );
//   }

  return (
    <>
    <DashBoardHeader user={user}/>
    <div className="container flex flex-col gap-[30px] py-[30px]">
       <div className="flex flex-col sm:flex-row justify-between xs:items-end gap-[10px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input w-[100%] xs:w-[350px]"
          />
          <div className="flex flex-col xs:flex-row justify-center gap-[10px] xs:gap-[30px] items-center">
            <button
            onClick={() => setOpenAddForm(!openAddForm)}
            type='button'
            className='px-[20px] py-[6px] rounded-[4px] bg-lightDark hover:bg-dark text-white'
            >
              {openAddForm ? <FontAwesomeIcon icon={faXmark}/> : (<><FontAwesomeIcon icon={faPlus}/> New</>)}
            </button>
            <button
            type='button'
            onClick={handleBuildClick}
                className="w-[100%] xs:w-auto bg-lightDark hover:bg-dark text-white px-[20px]  py-[6px] rounded"
            >
              {loadingBuild? <Spinner/>: "Publish"}
            </button>
          </div>
        </div>
        {openAddForm && <AddForm  close={setOpenAddForm}/> }
        <div className="flex flex-col">
          <table className='border-collapse w-[100%]'>
              <thead>
                  <tr>
                      <th className='table-cell'>Image</th>
                      <th className='table-cell'>Station ID</th>
                      <th className='table-cell'>Code</th>
                      <th className='table-cell'>Name</th>
                      <th className='table-cell'>Destination Number</th>
                      <th className='table-cell'>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {pageData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='table-cell'>
                        <div className="flex flex-row justify-center items-center">
                          <p>No data found</p>
                        </div>
                      </td>
                    </tr>
                  ): pageData.map((d, index) => (
                    <React.Fragment key={d._id}>
                      <tr>
                          <td className="table-cell">
                            {d.image && (
                              <div className="w-[50px] h-[50px]">
                                <ImageLoader
                                  src={d.image as string}
                                  alt=""
                                  fill={true}
                                />
                              </div>
                            )}
                          </td>
                          <td className='table-cell'>{d.stationID? d.stationID: "-"}</td>
                          <td className='table-cell'>{d.countryCode ? d.countryCode: "-"}</td>
                          <td  className='table-cell'>{d.name ? d.name: "-"}</td>
                          <td className='table-cell'>{d.destinationNumber? d.destinationNumber: "-"}</td>
                          <td  className='table-cell'>
                            <div className="flex flex-row items-center justify-center gap-[30px]">
                              <button
                              type='button'
                              onClick={() => handleOpenEdit(d._id)}
                              className="bg-lightDark hover:bg-grey text-nowrap text-white px-3 py-1 rounded-[10px]"
                              >
                              {openEditId === d._id && openEdit ? "Close" :  (<><FontAwesomeIcon icon={faPenToSquare} /> Edit</>)} 
                              </button>
                              <button
                              type='button'
                              onClick={() => handleDelete(d._id)}
                              className="text-red-600 text-2xl"
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </div>
                          </td>
                      </tr>
                      {openEdit && openEditId === d._id && (
                        <tr>
                            <td className='table-cell p-[10px]' colSpan={6}>
                              <form 
                              onSubmit={(e) => handleSubmitEdit(e)}
                              className="flex flex-col gap-[10px] bg-white shadow-md rounded p-[10px] sm:p-[30px]"
                              >
                                <div className="flex flex-col">
                                  <label htmlFor="name">Name</label>
                                  <input type="text" 
                                  value={editObj?.name}
                                  onChange={(e) => setEditObj(editObj ? {...editObj, name: e.target.value}: null)}
                                  className='input'
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="name">Country Code</label>
                                  <input type="text" value={editObj?.countryCode}
                                  onChange={(e) => setEditObj(editObj ? {...editObj, countryCode: e.target.value}: null)}
                                  className='input'
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="name">Station ID</label>
                                  <input type="text" value={editObj?.stationID}
                                  onChange={(e) => setEditObj(editObj ? {...editObj, stationID: e.target.value}: null)}
                                  className='input'
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="name">Destination Number</label>
                                  <input type="text" value={editObj?.destinationNumber}
                                  onChange={(e) => setEditObj(editObj ? {...editObj, destinationNumber: e.target.value}: null)}
                                  className='input'
                                  />
                                </div>
                                <div className="flex flex-col">
                                <label
                                  className="block text-gray-700 text-sm font-bold"
                                  htmlFor="imageUrl"
                                >
                                  Image 
                                </label>
                                <input type="file" 
                                  name="image"
                                  id="image"
                                  accept="image/*"
                                  onChange={(e: any) => setEditObj(editObj ? {...editObj, image: e.target.files[0] as File}: null)}
                                  className="input"
                                />
                              </div>
                                <button 
                                type='submit'
                                disabled={isLoading}
                                className='w-[100%] p-[30px] py-[6px] rounded-[6px] text-white bg-lightDark hover:bg-darkBlue font-[600]'
                                >
                                  {isLoading ? <Spinner/> : 'Edit'}
                                </button>
                              </form>
                            </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
          </table>
          
        </div>
        <ConfirmModal
          show={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this content?"
        />
        {destinations.length > itemsPerPage && pageData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            onPrev={handleNavPrev}
            onNext={handleNavNext}
          />
        )}
    </div>
    </>
    
  );
}

export default Page;
