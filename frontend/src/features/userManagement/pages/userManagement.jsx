import React, { useEffect, useState } from 'react'
import { getAssetContractInstance, getUserContractInstance } from '../../../config/contractInstances'
import { createAdminUserObjFromContract, createAssetObjFromContract, createUserObjFromContract } from '../../../utils/contractToObject'
import { useGetUsersInfoFromWalletQuery } from '../../../stores/auth/authAPI'
import { Link } from 'react-router-dom'
import { dummyUserAvatar } from '../../../assets/avatar'
import { enumMap } from '../../../utils/enumMap'
import { useNavigate } from 'react-router-dom'
// import { getAssetContractInstance } from '../../../config/contractInstances/index'


function UserManagement() {

    let [usersDetail, setUsersDetail] = useState([])
    let [fullUsersData, setFullAssetsData] = useState([])

    let [error, setError] = useState('')
    let [selectedUserStatus, setSelectedUserStatus] = useState('ALL')
    let userAddresses = usersDetail.map(user => {
        return user.userAddress
    })

    let { data: users, error: userFetchError, isLoading: fetchingUsers } = useGetUsersInfoFromWalletQuery(userAddresses)


    let handleSelectedUserChange = (status) => {
        setSelectedUserStatus(status)
        fetchUsers(status)
    }


    let fetchUsers = async (selectedUserStatus = 'ALL') => {
        try {
            let [userContract, userContractWithSigner] = await getUserContractInstance()
            let response;
            switch (selectedUserStatus) {
                case "BANNED":
                    response = await userContractWithSigner.getBannedUsers()
                    break;
                case 'ADMINS':
                    response = await userContractWithSigner.getAdminsWithPromoterDetails()
                    break
                default:
                    response = await userContractWithSigner.getRegisteredUsers()
            }

            switch (selectedUserStatus) {
                case 'ADMINS':
                    response = await Promise.all(response[0].map(async (item) => {
                        return await createAdminUserObjFromContract(item)
                    }))
                    response = response.filter(item => item.userAddress != "0x0000000000000000000000000000000000000000")
                    break
                default:
                    response = await Promise.all(response.map(async (item) => {
                        return await createUserObjFromContract(item)
                    }))
            }
            setUsersDetail(response)
            console.log('users', response, 'selected user status', selectedUserStatus)
        } catch (error) {
            setError(error.message)
            console.log('error in fetch users', error)
        }
    }

    let fetchBannedUsers = async () => {
        try {
            let [userContract, userContractWithSigner] = await getUserContractInstance()
            let response = await userContractWithSigner.getBannedUsers()
            response = await Promise.all(response.map(async (item) => {
                return await createAssetObjFromContract(item)
            }))
            setUsersDetail(response)
            console.log('banned users', response)
        } catch (error) {
            setError(error.message)
            console.log('error in fetch banned users', error)
        }
    }

    let fetchAdminUsers = async () => {
        try {
            let [userContract, userContractWithSigner] = await getUserContractInstance()
            let response = await userContractWithSigner.getAdminsWithPromoterDetails()
            response = await Promise.all(response.map(async (item) => {
                return await createAssetObjFromContract(item)
            }))
            setUsersDetail(response)
            console.log('admin users', response)
        } catch (error) {
            setError(error.message)
            console.log('error in fetch admin users', error)
        }
    }



    fullUsersData = usersDetail.map((usr, index) => {
        return {
            ...usr,
            userMetaData: users ? users[index] : ''
        }
    }
    )

    let promoteHandler = async (userWallet) => {
        let [userContract, userContractWithSigner] = await getUserContractInstance()
        try {

            let response = await userContractWithSigner.promoteToAdmin(userWallet)
            console.log('admin promote response', response)
            fetchUsers(selectedUserStatus)
        } catch (error) {
            console.log('admin promote error', error)
            setError(error.message.split('"')[1])
        }
    }

    let dePromoteHandler = async (userWallet) => {
        let [userContract, userContractWithSigner] = await getUserContractInstance()

        try {

            let response = await userContractWithSigner.depromoteAdmin(userWallet)
            console.log('admin depromote response', response)
            // navigate("/asset-verification");
            fetchUsers(selectedUserStatus)
        } catch (error) {
            console.log('admin depromote error', error)
            setError(error.message.split('"')[1])
        }
    }

    let banHandler = async (userWallet) => {
        let [userContract, userContractWithSigner] = await getUserContractInstance()

        try {

            let response = await userContractWithSigner.banUser(userWallet)
            console.log('user ban response', response)
            // navigate("/asset-verification");
            fetchUsers(selectedUserStatus)
        } catch (error) {
            console.log('user ban error', error)
            setError(error.message.split('"')[1])
        }
    }

    let unbanHandler = async (userWallet) => {
        let [userContract, userContractWithSigner] = await getUserContractInstance()
        try {
            let response = await userContractWithSigner.unbanUser(userWallet)
            console.log('user unban response', response)
            // navigate("/asset-verification");
            fetchUsers(selectedUserStatus)
        } catch (error) {
            console.log('user unban error', error)
            setError(error.message.split('"')[1])
        }
    }


    useEffect(() => {
        fetchUsers(selectedUserStatus)
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Platform Users</h1>
            <h5 className="">Manage All Users</h5>
            {/* four tabs with name Today, This week, This month and All time */}


            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px justify-around">
                    <li onClick={() => handleSelectedUserChange('ALL')} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedUserStatus == 'ALL' ? 'border-grey-600' : 'border-transparent'}`}>All</a>
                    </li>
                    <li onClick={() => handleSelectedUserChange('ADMINS')} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedUserStatus == 'ADMINS' ? 'border-grey-600' : 'border-transparent'}`}>Admins</a>
                    </li>
                    <li onClick={() => handleSelectedUserChange('BANNED')} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedUserStatus == 'BANNED' ? 'border-grey-600' : 'border-transparent'}`}>Banned</a>
                    </li>
                </ul>
            </div>

            {/* search bar with place holder of 'search by name' and category text on the middle of the search bar  */}
            <div className="relative mt-6 mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-200 dark:bg-transparent dark:text-gray-300 dark:placeholder-gray-600 dark:border-gray-600 dark:focus:border-gray-500" placeholder="Search by name" />

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-background-secondary dark:bg-background-secondary dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Legal ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Banned
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Admin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fullUsersData.map((user, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-background-primary dark:border-gray-700 hover:bg-background-secondary dark:hover:bg-background-secondary">
                                        <td className="w-4 p-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full object-cover " src={dummyUserAvatar} alt="Jese image" />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{user.userMetaData?.firstName + " " + user.userMetaData.lastName}</div>
                                                <div className="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.userMetaData.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.userMetaData.nationalID}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isBanned ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isAdmin ? 'Yes' : 'No'}

                                            {/* <div className="flex items-center">
                                                <Link state={user} to="/asset-verification-detail" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">See Detail</Link>
                                            </div> */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                !user.isAdmin && !user.isBanned &&
                                                <button onClick={() => promoteHandler(user.userAddress)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Promote
                                                    </span>
                                                </button>
                                            }

                                            {
                                                user.isAdmin &&
                                                <button onClick={() => dePromoteHandler(user.userAddress)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Depromote
                                                    </span>
                                                </button>
                                            }

                                            {
                                                !user.isBanned &&
                                                <button onClick={() => banHandler(user.userAddress)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Ban
                                                    </span>
                                                </button>
                                            }
                                            {
                                                user.isBanned &&
                                                <button onClick={() => unbanHandler(user.userAddress)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Unban
                                                    </span>
                                                </button>
                                            }

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">{fullUsersData.length}</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">Previous</a>
                        </li>
                        {
                            [1].map((item, index) => {
                                return (
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">{item}</a>
                                    </li>
                                )
                            }
                            )
                        }
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>






        </div>
    )
}

export default UserManagement
