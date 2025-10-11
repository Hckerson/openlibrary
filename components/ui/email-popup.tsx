import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";


export default function VerificationPopup({ isOpen, onClose, header, subject }: {isOpen : boolean, onClose: ()=> void, header: string, subject: string}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000); // Auto-close after 5s
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
          >
            <XCircle
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-700"
              size={24}
              onClick={onClose}
            />
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow-lg"
              >
                📩
              </motion.div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">

                {header}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {subject}

              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500"
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}