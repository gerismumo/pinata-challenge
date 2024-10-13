import React from 'react';
import Header from './Header';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRetweet, faShield } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const Page: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-[30px] flex flex-col gap-[40px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[40px]">
          <div className="flex flex-col gap-[30px]">
            <h1 className='text-[30px] font-[700]'>Keep Your Future Safe, Wherever You Are</h1>
            <p className="text-[16px] leading-[1.5] text-gray-700">
              {
              `With SafeKeep, you can securely store and access your essential documents from anywhere in the world, whether you're on the move or resettling in a new country. 
              Our platform allows you to safely share important files like IDs, medical records, and diplomas with trusted organizations and aid agencies. 
              Stay in control of your future by ensuring your documents are always secure and accessible, whenever you need them.
              `
              }
            </p>
            <Link href="/auth/signin" className="px-[20px] py-[8px] rounded-[8px] bg-black text-white w-fit">Get Started</Link>
          </div>
          <div className="relative w-[500px] h-[400px] shrink-0">
            <Image src="/home.jpeg" fill alt='Document security' />
          </div>
        </div>
        <section className="flex flex-col gap-[30px]">
          <h2 className='text-[24px] font-[600]'>How SafeKeep Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
            <div className="p-[20px] bg-gray-100 rounded-[10px]">
              <h3 className="font-[700] text-[20px]">1. Sign Up & Login</h3>
              <p className="text-[16px] text-gray-600">
                Create an account by signing up with your details. Once registered, log in to access your personal dashboard where you can manage your files securely.
              </p>
            </div>
            <div className="p-[20px] bg-gray-100 rounded-[10px]">
              <h3 className="font-[700] text-[20px]">2. Upload Documents</h3>
              <p className="text-[16px] text-gray-600">
                Easily upload your important documents, whether they are personal, like a National ID, or public, like reports for aid organizations.
              </p>
            </div>
            <div className="p-[20px] bg-gray-100 rounded-[10px]">
              <h3 className="font-[700] text-[20px]">3. Set Access Controls</h3>
              <p className="text-[16px] text-gray-600">
                Choose to keep your documents private for personal safekeeping, or mark them as public to share with organizations or governments who can offer assistance.
              </p>
            </div>
            <div className="p-[20px] bg-gray-100 rounded-[10px]">
              <h3 className="font-[700] text-[20px]">4. Access Anytime, Anywhere</h3>
              <p className="text-[16px] text-gray-600">
                {`Whether you're relocating or simply need access on the go, you can always retrieve your files from any device, securely stored and backed up on SafeKeep.`}
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-[30px]">
          <h2 className='text-[24px] font-[600]'>Why Choose SafeKeep?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
            <div className="flex flex-col items-center text-center p-[20px]">
                <FontAwesomeIcon icon={faShield} className='w-[50px] h-[50px' />
              <h3 className="font-[700] text-[18px] mt-[10px]">Secure Storage</h3>
              <p className="text-[16px] text-gray-600">
                Your documents are encrypted and stored safely, ensuring only you have control over them.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-[20px]">
                <FontAwesomeIcon icon={faGlobe} className='w-[50px] h-[50px' />
              <h3 className="font-[700] text-[18px] mt-[10px]">Global Accessibility</h3>
              <p className="text-[16px] text-gray-600">
                {`Access your files from anywhere in the world. Never worry about losing important documents when you're on the move.`}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-[20px]">
                <FontAwesomeIcon icon={faRetweet} className='w-[50px] h-[50px'  />
              <h3 className="font-[700] text-[18px] mt-[10px]">Private & Public Sharing</h3>
              <p className="text-[16px] text-gray-600">
                {`Keep files private or share them with trusted organizations. You're always in control of who can see what.`}
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center bg-black text-white py-[40px] rounded-[10px]">
          <h2 className='text-[24px] font-[600] mb-[20px]'>Ready to Secure Your Future?</h2>
          <p className="text-[16px] max-w-[600px] text-center mb-[20px]">
            {`SafeKeep provides refugees with a reliable, secure way to store and manage vital documents, ensuring you're always in control of your most important assets. Get started today and ensure your future is safe.`}
          </p>
          <Link href="/auth/signin" className="px-[20px] py-[10px] bg-white text-black rounded-[8px]">Sign Up Now</Link>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
