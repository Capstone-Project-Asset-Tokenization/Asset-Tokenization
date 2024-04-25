import React, { useEffect, useState } from 'react';
import AssetCard from '../Components/AssetCard';
import SearchForm from '../Components/SearchForm';
import { getAssetContractInstance } from '../../../config/contractInstances';
import { SpinLoader } from '../../../components/common/spinner/spinLoader';

const Marketplace = () => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
	const [displayedAssets, setDisplayedAssets] = useState([]);
	const [error, setError] = useState('');

	// const ownerAddresses = assets.map(asset => {
    //     return asset.creator
    // })

    // const {data:users, error:userFetchErro,isLoading:fetchingUsers} = useGetUsersInfoFromWalletQuery(ownerAddresses)

    const fetchAssets = async () => {
        try {
            const [contract, contractWithSigner] = await getAssetContractInstance();
            const statuses = [0, 1, 2];
            let allAssets = [];

            for (let status of statuses) {
                const fetchedAssets = await contractWithSigner.getAssetsByFilter(status);
                allAssets = [...allAssets, ...fetchedAssets];
            }

            setAssets(allAssets);
            setDisplayedAssets(allAssets);
        } catch (error) {
            console.error('Error fetching assets from blockchain:', error);
			setError(error.message)
        } finally {
            setLoading(false);
        }
    };

	const handleSearch = (criteria) => {
        console.log(criteria);
        const categoryMapping = {
            "RealEstate": 0,
            "Artwork": 1,
            "IntellectualProperty": 2,
            "Other": 3
        };
        const categoryValue = criteria.category ? categoryMapping[criteria.category] : null;
    
        const filtered = assets.filter(asset => {
            return (!criteria.name || asset.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
                   (!categoryValue || asset.category === categoryValue) &&
                   (!criteria.minPrice || parseFloat(asset.tokenPrice) >= parseFloat(criteria.minPrice)) &&
                   (!criteria.maxPrice || parseFloat(asset.tokenPrice) <= parseFloat(criteria.maxPrice));
        });
        setDisplayedAssets(filtered);
    };    

    useEffect(() => {
        fetchAssets();
    
        const handleAccountChange = (accounts) => {
            if (accounts.length > 0) {
                console.log('Account connected:', accounts[0]);
                fetchAssets();
            } else {
                console.log('Please connect to MetaMask.');
            }
        };
    
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChange);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountChange);
            }
        };
    }, []);

    console.log(displayedAssets)
	// fullAssetsData = displayedAssets.map((asset,index)=>{
    //     return {
    //         ...asset,
    //         ownerInfo:"users[index]"
    //     }
    // })
    if (loading) return <div><SpinLoader /></div>;
    return (
        <div className="flex flex-col text-white">
            <div className='bg-[#2B2B2B] p-6 mb-20'>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans pl-5">Browse Marketplace</h1>
                <p className="mb-6 text-2xl font-sans pl-5">Browse more through our Marketplace.</p>
                <SearchForm onSearch={handleSearch} />
            </div>
            <div className="bg-[#3B3B3B] w-full p-6 flex flex-wrap items-center justify-center">
                {displayedAssets.map((asset, index) => (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
                        <AssetCard
                            asset={asset}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;