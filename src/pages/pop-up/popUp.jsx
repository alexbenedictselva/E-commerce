import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const PopUp = ({ message ,flag}) => {
  const hasShownToast = useRef(false);

  useEffect(() => {
      if (message && !hasShownToast.current) {
          if (flag === '0') {
              toast.error(message);
          } else {
              toast.success(message);
          }
      hasShownToast.current = true;
    }
  }, [message]);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default PopUp;
