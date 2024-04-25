import React from 'react'
import { useLocation } from 'react-router-dom'
import { dummyUserAvatar } from '../../../assets/avatar'
import { getAssetContractInstance } from '../../../config/contractInstances'
import { useNavigate } from 'react-router-dom'


function UserDetail() {
  let location = useLocation()
  let asset = location.state
  let navigate = useNavigate()
  let [error, setError] = React.useState('')

  let downloadFile = (fileUrl, fileName) => {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.target = '_blank';
    anchor.href = fileUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor
    anchor.click();

    // Clean up: remove the anchor from the body
    document.body.removeChild(anchor);
  }

  let approveHandler = async () => {
    let [assetContract, assetContractWithSigner] = await getAssetContractInstance()

    try {

      let response = await assetContractWithSigner.verifyAsset(asset.ID, 1)
      console.log('asset verification response', response)
      navigate("/asset-verification");
    } catch (error) {
      console.log('asset verification error', error)
      setError(error.message.split('"')[1])
    }
  }

  let rejectHandler = async () => {
    let [assetContract, assetContractWithSigner] = await getAssetContractInstance()

    try {

      let response = await assetContractWithSigner.verifyAsset(asset.ID, 2)
      console.log('asset verification response', response)
      navigate("/asset-verification");
    } catch (error) {
      console.log('asset verification error', error)
      setError(error.message.split('"')[1])
    }
  }



  console.log('state in detail', asset)
  return (
    <div className=' '>
      <div className='w-12/12 overflow-hidden  md:h-[30rem] sm:h-[15rem] '>
        <img className=' object-contain w-full' src={asset.images[0]} alt='asset image' />
      </div>
      <div className='flex flex-col h-screen justify-around mx-20 bg-red'>
        <div>
          <h1 className='text-6xl'>{asset.name}</h1>
          <p className='text-secondary-main text-xl'>{parseInt(asset.tokenPrice)} ETH per Token</p>
        </div>

        <div>
          <h3 className='text-secondary-main font-bold'>Created By</h3>
          <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover" src={dummyUserAvatar} alt="Jese image" />
            <p className='font-bold text-xl'>{ asset.ownerInfo ? asset.ownerInfo.firstName + " " + asset.ownerInfo.lastName : 'User not found'}</p>
          </div>
        </div>

        <div>
          <h3 className='text-secondary-main font-bold'>Description</h3>
          <div>
            <p className='font-bold text-xl'>{asset.description}</p>
          </div>
        </div>


        <div>
          <h3 className='text-secondary-main font-bold'>Asset Images</h3>
          <div>
            {
              asset.images.map((doc, index) => {
                return (
                  <div key={index} className='flex items-center gap-3 py-3'>
                    <p className=' text-xl'>Image {index + 1}</p>
                    <button onClick={() => downloadFile(doc, doc.split('/')[doc.split('/').length - 1])} className='bg-primary-main text-white px-2 py-1 rounded'>View</button>
                  </div>
                )

              })
            }
          </div>
        </div>


        <div>
          <h3 className='text-secondary-main font-bold'>Supporting Document</h3>
          <div>
            {
              asset.supportingDocuments.map((doc, index) => {
                return (
                  <div key={index} className='flex items-center gap-3 py-3'>
                    <p className=' text-xl'>Document {index + 1}</p>
                    <button onClick={() => downloadFile(doc, doc.split('/')[doc.split('/').length - 1])} className='bg-primary-main text-white px-2 py-1 rounded'>View</button>
                  </div>
                )

              })
            }
          </div>
        </div>


        <div>
          <p className='font-bold text-xl'> Category</p>
          <div className='my-2'></div>
          <div>
            <span className=" bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-2 rounded dark:bg-gray-700 dark:text-gray-300">{asset.category}</span>
          </div>
        </div>

        <div className='bg-red flex justify-center'>
          <button onClick={approveHandler} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Approve
            </span>
          </button>
          <div className='w-5'></div>
          <button onClick={rejectHandler} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reject
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserDetail