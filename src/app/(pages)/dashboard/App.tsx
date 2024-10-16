"use client"

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useCallback, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePagination from '@/utils/usePagination';
import { faDownload,  faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

import ConfirmModal from '@/app/_components/ConfirmModal';
import Pagination from '@/app/_components/Pagination';
import AddForm from './Form';
import DashBoardHeader from './DashBoardHeader';
import { IFile } from '@/lib/types';
import PreviewModal from './PreviewModal';
import { TruncateContent } from '@/utils/services';
import FileLoader from '@/app/_components/FileLoader';


type Props = {
    user: any
}

const Page:React.FC<Props>  = ({user}) => {

    const [files, setFiles] = useState<IFile[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openAddForm, setOpenAddForm] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false); 
    const [previewContent, setPreviewContent] = useState<IFile | null>(null); 


    const fecthFiles = useCallback(async() => {
        try {
            const response = await axios.get('/api/files')
            if(response.data.success) {
                setFiles(response.data.data);
            }else {
                toast.error(response.data.message);
            }
        }catch(error: any) {
            console.log(error)
            toast.error("Network Error")
        }
    }, [setFiles])

    useEffect(() => {
        fecthFiles();
    }, [fecthFiles]);


   //delete data 
   const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(`/api/files/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fecthFiles();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('network error');
    }
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

  const handlePreview = (content: IFile) => {
    setPreviewContent(content);
    setShowPreviewModal(true);
  };
  

  


  //filtering search results
  const filteredData = files.filter((d) => {
    return (
      d.category?.toString().toLowerCase().includes(searchQuery) ||
      d.description?.toString().toLowerCase().includes(searchQuery) ||
      d.title?.toString().toLowerCase().includes(searchQuery) 
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


const handleDownload = async (url: string, filename: string) => {
  try {
    const response = await fetch(url, {
      mode: 'cors', 
    });
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobUrl); 
  } catch (error) {
    console.error('Download failed:', error);
  }
};


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
              {openAddForm ? <FontAwesomeIcon icon={faXmark}/> : (<><FontAwesomeIcon icon={faPlus}/> New File</>)}
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
                  ): pageData.map((d :IFile) => (
                    <React.Fragment key={d._id}>
                      <tr>
                          <td className="table-cell">
                            {d.url && (
                              <div className="w-[50px] h-[50px]">
                                <FileLoader
                                  src={d.url as string}
                                  alt=""
                                  fill={true}
                                />
                              </div>
                            )}
                          </td>
                          <td className='table-cell'>{d.category}</td>
                          <td className='table-cell'>{d.title ? TruncateContent(d.title, 30): "-"}</td>
                          <td  className='table-cell'>{d.description ? TruncateContent(d.description, 30): "-"}</td>
                          <td  className='table-cell'>
                            <div className="flex flex-row items-center justify-center gap-[30px]">
                              <button
                                onClick={() => handlePreview(d)} 
                                className="btn-sec"
                              >
                                Preview
                              </button>
                              <button
                                onClick={() => handleDownload(d.url as string, `${d.title}.jpg`)}
                                className="btn-sec"
                              >
                                <div className="flex flex-row items-center gap-[2px]">
                                  <FontAwesomeIcon icon={faDownload} />
                                  Download
                                </div>
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
        {showPreviewModal && previewContent && (
          <PreviewModal
            show={showPreviewModal} 
            content={previewContent} 
            onClose={() => setShowPreviewModal(false)} 
          />
        )}

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


