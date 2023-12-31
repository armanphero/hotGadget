import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const MyModal = () => {
    const [productsInDb] = useContext(CartContext);
    let [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const sessionStorageAlert = () => {
        const alertExist = sessionStorage.getItem('alert');
        if (!alertExist) {
            sessionStorage.setItem('alert', true);
            if(productsInDb.length){
                openModal();
            }
        }
    }
    sessionStorageAlert();

    return (
        <>
            {/* <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Open dialog
                </button>
            </div> */}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Continue From Where You Left Off...
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You have items in cart. Complete your order before stock out!
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                closeModal();
                                                setTimeout(() => {
                                                    navigate('/cart');
                                                }, 500);
                                            }}
                                        >
                                            Go to
                                            <ShoppingCartIcon className='ml-1 h-5 w-5 text-gray-400-400' />
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                closeModal();
                                            }}
                                        >
                                            close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default MyModal