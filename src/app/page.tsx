import Image from "next/image";
import Page from "./_components/Home";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Page/>
    </>
    
  );
}
