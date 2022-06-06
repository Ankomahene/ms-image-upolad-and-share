import React from "react";
import { ShareImages } from "../components/ShareImages";
import { useRouter } from "next/router";
import { Header } from "../components/Header";

const SharePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      {id != null && <ShareImages id={id} />}
    </div>
  );
};

export default SharePage;
