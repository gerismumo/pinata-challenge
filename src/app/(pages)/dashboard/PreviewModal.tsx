"use client"
import ImageLoader from "@/app/_components/ImageLoader";
import { IFile } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";


interface PreviewModalProps {
  show: boolean;
  content: IFile;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ show, content, onClose }) => {
 

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity overflow-hidden" onClick={onClose}></div>
      <div className="bg-white max-w-full w-full h-full   rounded-[3px] shadow-xl  z-[20]">
        <div className="flex justify-between items-center px-6 py-4 bg-lightRed text-white">
          <h2 className="text-lg font-semibold"></h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 bg-lightDark hover:bg-dark p-[6px] rounded-[3px]">
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
          <div className="preview-card mb-[20px]">
            {content.url && (
              <div className="flex flex-col w-[100%] h-[400px] relative">
                <h2 className="font-[600] text-sBlue">Image</h2>
                <ImageLoader
                  src={content.url as string}
                  alt=""
                  fill={true}
                />
                {/* <img src={content.url} alt="" /> */}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[20px] ">
            {content.title && (
              <div className="preview-card">
                <h2 className="font-[600] text-sBlue">Heading</h2>
                <p>{content.title}</p>
            </div>
            )}
            {content.description && (
              <div className="preview-card">
                <h2 className="font-[600] text-sBlue">Description</h2>
                <p>{content.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
