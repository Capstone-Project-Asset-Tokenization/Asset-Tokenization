import React, { useEffect, useState } from 'react'
import { getAssetContractInstance, getUserContractInstance } from '../../../config/contractInstances'
import { createAssetObjFromContract } from '../../../utils/contractToObject'
import { useGetUsersInfoFromWalletQuery } from '../../../stores/auth/authAPI'
import { Link } from 'react-router-dom'
import { dummyUserAvatar } from '../../../assets/avatar' 
import { enumMap } from '../../../utils/enumMap'
import { useNavigate } from 'react-router-dom'
// import { getAssetContractInstance } from '../../../config/contractInstances/index'


function AssetVerification() {

    let [assets, setAssets] = useState([])
    let [fullAssetsData, setFullAssetsData] = useState([])

    let [error, setError] = useState('')
    let [assetStatus, setAssetStatus] = useState(0)
    let ownerAddresses = assets.map(asset => {
        return asset.creator
    })

    let { data: users, error: userFetchError, isLoading: fetchingUsers } = useGetUsersInfoFromWalletQuery(ownerAddresses)


    let handleAssetStatusChange = (status) => {
        setAssetStatus(status)
        fetchAssets(status)
    }


    let fetchAssets = async (verificationStatus = 1) => {
        try {
            let [assetContract, assetContractWithSigner] = await getAssetContractInstance()
            let response = await assetContractWithSigner.getAssetsByFilter(verificationStatus)
            response = await Promise.all(response.map(async (item) => {
                return await createAssetObjFromContract(item)
            }))
            response=response.filter(item=>item.creator!="0x0000000000000000000000000000000000000000")
            setAssets(response)
            console.log('assets', response, response[0],'verification status',verificationStatus)
        } catch (error) {
            setError(error.message)
            console.log('error in fetch asset', error)
        }
    }

    fullAssetsData = assets.map((asset, index) => {
        return {
            ...asset,
            ownerInfo: users ? users[index] : ''
        }
    }
    )
    
    let approveHandler = async (assetId) => {
        let [assetContract, assetContractWithSigner] = await getAssetContractInstance()
        
        try {
            
            let response = await assetContractWithSigner.verifyAsset(assetId, 1)
            console.log('asset verification response', response)
            // navigate("/asset-verification");
            fetchAssets(assetStatus)
        } catch (error) {
            console.log('asset verification error', error)
            setError(error.message.split('"')[1])
        }
    }
    
    let rejectHandler = async (assetId) => {
        let [assetContract, assetContractWithSigner] = await getAssetContractInstance()
        
        try {
            
            let response = await assetContractWithSigner.verifyAsset(assetId, 2)
            console.log('asset verification response', response)
            // navigate("/asset-verification");
            fetchAssets(assetStatus)
        } catch (error) {
            console.log('asset verification error', error)
            setError(error.message.split('"')[1])
        }
    }
  
    useEffect(() => {
        fetchAssets(assetStatus)
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Created Assets</h1>
            <h5 className="">Verify the owner here</h5>
            {/* four tabs with name Today, This week, This month and All time */}


            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px justify-around">
                    <li onClick={()=>handleAssetStatusChange(1)} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${assetStatus==1?'border-grey-600':'border-transparent'}`}>Verified</a>
                    </li>
                    <li onClick={()=>handleAssetStatusChange(0)} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${assetStatus==0?'border-grey-600':'border-transparent'}`}>Unverified</a>
                    </li>
                    <li onClick={()=>handleAssetStatusChange(2)} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${assetStatus==2?'border-grey-600':'border-transparent'}`}>Declined</a>
                    </li>
                    <li onClick={()=>handleAssetStatusChange(1)} className="me-2">
                        <a href="#" className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}>All</a>
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
                                Owner Info
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Asset Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Detail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fullAssetsData.map((asset, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-background-primary dark:border-gray-700 hover:bg-background-secondary dark:hover:bg-background-secondary">
                                        <td className="w-4 p-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full object-cover " src={dummyUserAvatar} alt="Jese image" />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{asset.ownerInfo?.firstName}</div>
                                                <div className="font-normal text-gray-500">{asset.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {asset.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {asset.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {enumMap.verificationStatus[asset.verificationStatus]}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <Link state={asset} to="/asset-verification-detail" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">See Detail</Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={()=>approveHandler(asset.ID)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Approve
                                                </span>
                                            </button>
                                            <button onClick={()=>rejectHandler(asset.ID)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Reject
                                                </span>
                                            </button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">{fullAssetsData.length}</span></span>
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

export default AssetVerification
