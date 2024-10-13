"use client";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TruncateContent } from '@/utils/services';
import Loader from './Loader';

type Report = {
  url: string;
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State for modal visibility and content
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Report | null>(null);

  const [countryFilter, setCountryFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');



  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/files/al', {
        params: { country: countryFilter, category: categoryFilter },
      });
      if (response.data.success) {
        setReports(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  }, [countryFilter, categoryFilter])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to open the modal
  const handleViewMore = (report: Report) => {
    setModalContent(report);
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-[20px]">
          <div className="flex flex-row justify-center items-center">
            <h1 className="font-[700] text-[35px]">Reports Page</h1>
          </div>
          {reports.length === 0 && (
            <div className="flex flex-row justify-center items-center mt-[30px]">
              <p>No Reports Available</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <img
                  src={report.url}
                  alt={report.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-semibold mt-4">{report.title}</h2>
                <p className="text-gray-600 mt-2">
                  {TruncateContent(report.description, 100)}{' '}
                  {report.description.length > 100 && (
                    <button
                      className="btn-sec"
                      onClick={() => handleViewMore(report)}
                    >
                      View More
                    </button>
                  )}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    By: {report.firstName} {report.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{report.email}</p>
                  <p className="text-sm text-gray-500">{report.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalOpen && modalContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity overflow-hidden" onClick={handleCloseModal} ></div>
            <div className="bg-white max-w-full w-full h-full   rounded-[3px] shadow-xl  z-[20]">
                <div className="flex justify-between items-center px-6 py-4 bg-lightRed text-white">
                    <h2 className="text-lg font-semibold"></h2>
                    <button onClick={handleCloseModal} className="text-white hover:text-gray-300 bg-lightDark hover:bg-dark p-[6px] rounded-[3px]">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="container  py-[10px] lg:py-[30px] overflow-y-auto h-[calc(100%-56px)]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{modalContent.title}</h2>
                    </div>
                    <p className="mt-4 text-gray-600">{modalContent.description}</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            By: {modalContent.firstName} {modalContent.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{modalContent.email}</p>
                        <p className="text-sm text-gray-500">{modalContent.country}</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Reports;
