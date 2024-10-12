"use client"

import React, { useCallback, useEffect, useState } from 'react';

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
import { IFile } from '@/lib/types';


type Props ={
    user: any
}



const Page:React.FC<Props>  = ({user}) => {


    const [files, setFiles] = useState<IFile[]>([]);
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


    const fecthFiles = useCallback(async() => {
        try {
            const response = await axios.get('/api/files')
            if(response.data.success) {
                setFiles(response.data.data);
            }else {
                toast.error(response.data.message);
            }
        }catch(error: any) {
            toast.error("Network Error")
        }
    }, [setFiles])

    useEffect(() => {
        fecthFiles();
    }, [fecthFiles]);

    console.log('files', files);
  
  


    useEffect(() => {
      if (error) {
          toast.error(error);
      }
    }, [error]);

  //handle open edit

  

  const handleOpenEdit = (id: string) => {
    // setOpenEdit(!openEdit);
    // setOpenEditId(id);
    // setEditObj(destinations.find(d => d._id === id) || null);
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
  const filteredData = files.filter((d) => {
    return (
      d.category?.toString().toLowerCase().includes(searchQuery) ||
      d.description?.toString().toLowerCase().includes(searchQuery) ||
      d.title?.toString().toLowerCase().includes(searchQuery) 
    )
  })

//   console.log("filteredData", filteredData)
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
          </div>
        </div>
        {openAddForm && <AddForm  close={setOpenAddForm}/> }
        <div className="flex flex-col">
          <table className='border-collapse w-[100%]'>
              <thead>
                  <tr>
                      <th className='table-cell'>Image</th>
                      <th className='table-cell'>Category</th>
                      <th className='table-cell'>Heading</th>
                      <th className='table-cell'>Description</th>
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
                  ): pageData.map((d :IFile, index) => (
                    <React.Fragment key={d._id}>
                      <tr>
                          <td className="table-cell">
                            {d.url && (
                              <div className="w-[50px] h-[50px]">
                                <ImageLoader
                                  src={d.url as string}
                                  alt=""
                                  fill={true}
                                />
                              </div>
                            )}
                          </td>
                          <td className='table-cell'>{d.category}</td>
                          <td className='table-cell'>{d.title ? d.title: "-"}</td>
                          <td  className='table-cell'>{d.description}</td>
                          <td  className='table-cell'>
                            <div className="flex flex-row items-center justify-center gap-[30px]">
                              <button
                              type='button'
                              onClick={() => handleOpenEdit(d._id as string)}
                              className="bg-lightDark hover:bg-grey text-nowrap text-white px-3 py-1 rounded-[10px]"
                              >
                              {openEditId === d._id && openEdit ? "Close" :  (<><FontAwesomeIcon icon={faPenToSquare} /> Edit</>)} 
                              </button>
                              <button
                              type='button'
                              onClick={() => handleDelete(d._id as string)}
                              className="text-red-600 text-2xl"
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </div>
                          </td>
                      </tr>
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
        {files.length > itemsPerPage && pageData.length > 0 && (
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
