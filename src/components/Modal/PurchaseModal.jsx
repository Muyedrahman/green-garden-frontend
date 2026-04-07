import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  const { user } = useAuth();
  const { _id, name, category, price, description, image, seller } =
    plant || {};

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        plantId: _id,
        name,
        category,
        price,
        description,
        image,
        quantity: 1,
        seller,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      console.log("Sending to server:", paymentInfo);

      // 1. Surver Request send   
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo,
      );

      window.location.href = data.url
      // console.log("Received URL from server:", data.url);

      // 2. if URL পাওয়া যায়, go to users --> Stripe পেজে পাঠিয়ে দাও
      if (data?.url) {
        window.location.replace(data.url);
      } else {
        console.error("URL not found in response!");
      }
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert("পেমেন্ট সেশন তৈরি করা যায়নি। সার্ভার টার্মিনাল চেক করুন।");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Plant:</strong> {name}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Category:</strong> {category}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Customer:</strong> {user?.displayName}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Price:</strong> ${price}
              </p>
            </div>

            <div className="flex mt-6 justify-around">
              <button
                onClick={handlePayment}
                className="cursor-pointer bg-green-100 px-6 py-2 rounded-md text-green-900 font-medium hover:bg-green-200"
              >
                Pay
              </button>
              <button
                onClick={closeModal}
                className="cursor-pointer bg-red-100 px-6 py-2 rounded-md text-red-900 font-medium hover:bg-red-200"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
