import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register} from '../../actions/users'

interface Props {
    setShowModal: React.Dispatch<boolean>
}

const RegistrationModal: React.FC<Props> = ({setShowModal})=>{

    
    const registration = useSelector((state: any) => state.registration);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const modalRef = React.useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (registration.registered) {
            closeModal()
        }
    }, [registration])

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            closeModal()
        }
    }

    const closeModal = () => {
        setShowModal(false)
        dispatch({type: 'REGISTER_RESET'})
    }

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!modalRef.current?.contains(e.target as Node)) {
            closeModal()
        }
    }

    const dispatch = useDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register({ username, password, email }))
    }

  return (
    <div onClick={(e) => handleClickOutside(e)} className="bg-black bg-opacity-50 absolute inset-0 flex
    justify-center items-center">
            <div ref={modalRef} className="bg-white max-w-sm py-4 px-20 shadow-xl">
                <div className="flex justify-center items-center">
                    <h1 className="text-blue-500 font-bold text-xl">Registration</h1>
                </div>
                <div className="mt-2 text-sm">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username">Username</label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline" id="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required placeholder="Username" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email"/>
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password"/>
                        </div>
                        {
                            registration.failure ? <p className="text-red-600 py-2 px-3">{registration.error}</p> : ""
                        }
                        <div className="mt-5 flex justify-center space-x-3">
                             <input id="submit" type="submit" value="Register" className="font-bold   px-8 py-1 bg-blue-400 text-white hover:bg-opacity-80"/>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default RegistrationModal;
