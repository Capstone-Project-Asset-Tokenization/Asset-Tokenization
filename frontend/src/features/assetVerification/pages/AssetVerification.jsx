import React from 'react'

function AssetVerification() {
    let data = [
        {
            profileImg: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            category: 'Apartment',
        },
        {
            profileImg: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            category: 'Apartment',
        },
        {
            profileImg: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            category: 'Apartment',
        },
        {
            profileImg: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            category: 'Apartment',
        },

    ]
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Created Assets</h1>
            <h5 className="">Verify the owner here</h5>
            {/* four tabs with name Today, This week, This month and All time */}


            <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px justify-around">
                    <li class="me-2">
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Today</a>
                    </li>
                    <li class="me-2">
                        <a href="#" class="inline-block p-4 text-grey-600 border-b-2 border-grey-600 rounded-t-lg active dark:text-grey-500 dark:border-grey-500" aria-current="page">This Month</a>
                    </li>
                    <li class="me-2">
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">This Week</a>
                    </li>
                    <li class="me-2">
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">All Time</a>
                    </li>
                </ul>
            </div>

            {/* search bar with place holder of 'search by name' and category text on the middle of the search bar  */}
            <div class="relative mt-6 mb-4">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>

                <input type="text" class="w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-200 dark:bg-transparent dark:text-gray-300 dark:placeholder-gray-600 dark:border-gray-600 dark:focus:border-gray-500" placeholder="Search by name" />

            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-background-secondary dark:bg-background-secondary dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Owner Info
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Detail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-background-primary dark:border-gray-700 hover:bg-background-secondary dark:hover:bg-background-secondary">
                                        <td class="w-4 p-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src={item.profileImg} alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">{item.name}</div>
                                                <div class="font-normal text-gray-500">{item.email}</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            {item.category}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <a href="/asset-verification-detail" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">See Detail</a>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Approve
                                                </span>
                                            </button>
                                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
                <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">Previous</a>
                        </li>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                return (
                                    <li>
                                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">{item}</a>
                                    </li>
                                )
                            }
                            )
                        }
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-background-secondary hover:text-gray-700 dark:bg-background-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-background-secondary dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>






        </div>
    )
}

export default AssetVerification
