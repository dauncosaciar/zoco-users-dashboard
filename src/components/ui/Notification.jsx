import { Toaster } from "sonner";

export default function Notification() {
  return (
    <Toaster
      className="notification"
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1.6rem",
          borderWidth: "0.2rem"
        }
      }}
      duration={6000}
    />
  );
}
