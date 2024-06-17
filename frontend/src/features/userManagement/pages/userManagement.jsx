import React, { useEffect, useState } from "react";
import {
  getAssetContractInstance,
  getUserContractInstance,
} from "../../../config/contractInstances";
import {
  createAdminUserObjFromContract,
  createAssetObjFromContract,
  createUserObjFromContract,
} from "../../../utils/contractToObject";
import {
  useBanUserMutation,
  useGetUsersInfoFromWalletQuery,
  useUnbanUserMutation,
  useUpdateRoleMutation,
} from "../../../stores/auth/authAPI";
import { Link } from "react-router-dom";
import { dummyUserAvatar } from "../../../assets/avatar";
import { useNavigate } from "react-router-dom";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";

function UserManagement() {
  let [usersDetail, setUsersDetail] = useState([]);
  let [fullUsersData, setFullUsersData] = useState([]);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [
    updateRole,
    {
      isError: roleUpdateError,
      isLoading: roleUpdateLoading,
      isSuccess: roleUpdateSuccess,
    },
  ] = useUpdateRoleMutation();
  const [
    banUser,
    {
      isError: banUserError,
      isLoading: banUserLoading,
      isSuccess: banUserSuccess,
    },
  ] = useBanUserMutation();
  const [
    unbanUser,
    {
      isError: unbanUserError,
      isLoading: unbanUserLoading,
      isSuccess: unbanUserSuccess,
    },
  ] = useUnbanUserMutation();

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [selectedUserStatus, setSelectedUserStatus] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  let userAddresses = usersDetail.map((user) => user.userAddress);

  let {
    data: users,
    error: userFetchError,
    isLoading: fetchingUsers,
  } = useGetUsersInfoFromWalletQuery(userAddresses);

  let handleSelectedUserChange = (status) => {
    setSelectedUserStatus(status);
    fetchUsers(status);
  };

  let fetchUsers = async (selectedUserStatus = 0) => {
    try {
      setLoading(true);
      let [userContract, userContractWithSigner] =
        await getUserContractInstance();
      let response;
      switch (selectedUserStatus) {
        case 2:
          response = await userContractWithSigner.getBannedUsers();
          break;
        case 1:
          response =
            await userContractWithSigner.getAdminsWithPromoterDetails();
          break;
        default:
          response = await userContractWithSigner.getRegisteredUsers();
      }

      switch (selectedUserStatus) {
        case 1:
          response = await Promise.all(
            response[0].map(async (item) => {
              return await createAdminUserObjFromContract(item);
            })
          );
          response = response.filter(
            (item) =>
              item.userAddress != "0x0000000000000000000000000000000000000000"
          );
          break;
        default:
          response = await Promise.all(
            response.map(async (item) => {
              return await createUserObjFromContract(item);
            })
          );
      }
      setLoading(false);
      setUsersDetail(response);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  let promoteHandler = async (userWallet) => {
    let [userContract, userContractWithSigner] =
      await getUserContractInstance();
    try {
      setLoading(true);
      let response = await userContractWithSigner.promoteToAdmin(userWallet);
      console.log("admin promote response", response);
      updateRole({ walletAddress: userWallet, newRole: "ADMIN" });
      fetchUsers(selectedUserStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("admin promote error", error);
      setError(error.message.split('"')[1]);
    }
  };

  let dePromoteHandler = async (userWallet) => {
    let [userContract, userContractWithSigner] =
      await getUserContractInstance();

    try {
      setLoading(true);
      let response = await userContractWithSigner.depromoteAdmin(userWallet);
      console.log("admin depromote response", response);
      updateRole({ walletAddress: userWallet, newRole: "USER" });
      // navigate("/asset-verification");
      fetchUsers(selectedUserStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("admin depromote error", error);
      setError(error.message.split('"')[1]);
    }
  };

  let banHandler = async (userWallet) => {
    let [userContract, userContractWithSigner] =
      await getUserContractInstance();

    try {
      setLoading(true);
      let response = await userContractWithSigner.banUser(userWallet);
      console.log("user ban response", response);
      banUser({ userWallet: userWallet });
      // navigate("/asset-verification");
      fetchUsers(selectedUserStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("user ban error", error);
      setError(error.message.split('"')[1]);
    }
  };

  let unbanHandler = async (userWallet) => {
    let [userContract, userContractWithSigner] =
      await getUserContractInstance();
    try {
      setLoading(true);
      let response = await userContractWithSigner.unbanUser(userWallet);
      console.log("user unban response", response);
      unbanUser({ userWallet: userWallet });
      // navigate("/asset-verification");
      fetchUsers(selectedUserStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("user unban error", error);
      setError(error.message.split('"')[1]);
    }
  };

  useEffect(() => {
    fetchUsers(selectedUserStatus);
  }, [selectedUserStatus]);

  useEffect(() => {
    if (users) {
      console.log(users, "users++++++=");
      const updatedUsers = usersDetail.map((usr, index) => ({
        ...usr,
        userMetaData: users ? users[index] : "",
      }));
      setFullUsersData(updatedUsers);
      setFilteredUsersData(updatedUsers);
    }
  }, [users, usersDetail]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = fullUsersData.filter((user) => {
      if (user.userMetaData) {
        const name =
          user.userMetaData.firstName.toLowerCase() +
          " " +
          user.userMetaData.lastName.toLowerCase();
        return name.includes(query);
      }
      return false;
    });
    setFilteredUsersData(filteredData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-8">Platform Users</h1>
      <h5 className="my-4 text-neutral-400">Manage All Users</h5>
      <div className="flex justify-around my-8">
        {["All", "Admins", "Banned"].map((label, index) => (
          <button
            key={index}
            className={`py-2 w-full px-4 font-medium focus:outline-none ${
              selectedUserStatus === index
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => handleSelectedUserChange(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative mt-12 my-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-3 px-10 bg-[#303030] outline-none rounded-sm"
          placeholder="Search by name"
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>

      <div className="relative min-h-[40vh] overflow-x-auto shadow-md flex flex-col sm:rounded-lg mt-12">
        {!loading && !fetchingUsers && filteredUsersData?.length === 0 && (
          <div className="mx-auto text-gray-400 my-auto">
            <p className="text-lg mb-8">It seems there are no users yet!</p>
          </div>
        )}
        {loading || fetchingUsers ? (
          <div className="flex justify-center items-center my-auto">
            <SpinLoader />
          </div>
        ) : (
          <>
            {filteredUsersData?.length !== 0 && (
              <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
                <thead className="text-xs text-neutral-700 uppercase bg-background-secondary dark:bg-background-secondary dark:text-neutral-400">
                  <tr className="py-10 h-16">
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
                  {filteredUsersData.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b dark:bg-background-primary dark:border-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-800"
                    >
                      <td className="w-4 p-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-neutral-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={dummyUserAvatar}
                          alt="User Avatar"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {user.userMetaData?.firstName}{" "}
                            {user.userMetaData?.lastName}
                          </div>
                          <div className="font-normal text-neutral-500">
                            {user?.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{user.userMetaData?.email}</td>
                      <td className="                      px-6 py-4">
                        {user.userMetaData?.nationalID}
                      </td>
                      <td className="px-6 py-4">
                        {user.isBanned ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {user.isAdmin ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          {!user.isAdmin && !user.isBanned && (
                            <button
                              onClick={() => promoteHandler(user.userAddress)}
                            >
                              <span className="relative px-[41px] py-2.5 transition-all ease-in duration-75 bg-primary-dark font-bold">
                                Promote
                              </span>
                            </button>
                          )}
                          {user.isAdmin && (
                            <button
                              onClick={() => dePromoteHandler(user.userAddress)}
                              className=""
                            >
                              <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-purple-400">
                                Depromote
                              </span>
                            </button>
                          )}
                          {!user.isBanned && (
                            <button
                              onClick={() => banHandler(user.userAddress)}
                            >
                              <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-red-400">
                                Ban
                              </span>
                            </button>
                          )}
                          {user.isBanned && (
                            <button
                              onClick={() => unbanHandler(user.userAddress)}
                            >
                              <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-green-400">
                                Unban
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        <nav
          className="flex items-center mt-auto flex-column p-8 flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              1-{Math.min(filteredUsersData.length, 10)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {filteredUsersData.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-s-lg hover:bg-neutral-800 hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[1].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 hover:bg-neutral-800 hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-e-lg hover:bg-neutral-800 hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserManagement;
