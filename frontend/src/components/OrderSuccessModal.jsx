import React from 'react';
import ReactDOM from 'react-dom';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiX } from 'react-icons/fi';

const OrderSuccessModal = ({ isOpen, onClose, orderId, onTrackOrder, onContinueShopping }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
            <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-center shadow-2xl transition-all animate-in fade-in zoom-in duration-300">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
                >
                    <FiX className="w-6 h-6" />
                </button>

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 animate-bounce">
                    <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    Pesanan Berhasil!
                </h3>
                <p className="text-gray-500 mb-6">
                    Terima kasih telah berbelanja. Pesanan Anda sedang kami proses.
                </p>

                <div className="mb-8 rounded-lg bg-gray-50 p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">ID Pesanan Anda</p>
                    <p className="text-xl font-bold text-yellow-950 tracking-wide mt-1">{orderId}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        onClick={onContinueShopping}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                    >
                        <FiShoppingBag className="text-lg" /> Belanja Lagi
                    </button>
                    <button
                        onClick={onTrackOrder}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition shadow-lg"
                    >
                        <FiPackage className="text-lg" /> Lacak Pesanan
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default OrderSuccessModal;