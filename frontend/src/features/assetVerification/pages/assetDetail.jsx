import React from 'react'

function AssetDetail() {
  return (
    <div class=' '>
      <div className='w-12/12 overflow-hidden  md:h-[30rem] sm:h-[15rem] bg-red-800'>
        <img className=' object-contain h-100 ' src='https://lennaertkoorman.nl/wp-content/uploads/2023/03/cropped-2-LOTTA-.-40x50cm-Oil-on-canvas-.-Lennaert-Koorman-website-banner.jpg' alt='asset image' />
      </div>
      <div class='flex flex-col h-screen justify-around mx-20 bg-red'>
        <div>
          <h1 className='text-6xl'>Afar Man Art Work</h1>
          <p class='text-secondary-main text-xl'>10 ETH</p>
        </div>

        <div>
          <h3 class='text-secondary-main font-bold'>Created By</h3>
          <div class="flex items-center gap-3">
            <img class="w-10 h-10 rounded-full" src="https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4" alt="Jese image" />
            <p class='font-bold text-xl'>Zeamanual Feleke</p>
          </div>
        </div>

        <div>
          <h3 class='text-secondary-main font-bold'>Description</h3>
          <div>
            <p class='font-bold text-xl'>The Orbitians</p>
            <p class='font-bold text-xl'>is a collection of 10,000 unique NFTs on the Ethereum blockchain</p>
          </div>
        </div>


        <div>
          <h3 class='text-secondary-main font-bold'>Details</h3>
          <div>
            <p class='font-bold text-xl'>See all images</p>
            <p class='font-bold text-xl'>See all supporting documents</p>
          </div>
        </div>

        <div>
          <p class='font-bold text-xl'> Category</p>
          <div class='my-2'></div>
          <div>
            <span class=" bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-2 rounded dark:bg-gray-700 dark:text-gray-300">ART WORK</span>
            <span class=" bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-2 rounded dark:bg-gray-700 dark:text-gray-300">PHOTO GRAPH</span>
            <span class=" bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-2 rounded dark:bg-gray-700 dark:text-gray-300">CULTURE</span>
         
          </div>
        </div>

        <div class='bg-red flex justify-center'>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Approve
            </span>
          </button>
          <div class='w-5'></div>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reject    
            </span>
          </button>
        </div>

      </div>


    </div>
  )
}

export default AssetDetail