import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AssetCard from '../Components/AssetCard';
import { fetchAssets } from '../assetsSlice';
import SearchForm from '../Components/SearchForm';
import assetImage from '../../../assets/Image Placeholder.svg';

const Marketplace = () => {
	const dispatch = useDispatch();
	const { assets, filteredAssets, searchCriteria } = useSelector((state) => state.assets);
  
	useEffect(() => {
	  dispatch(fetchAssets());
	}, [dispatch]);

	useEffect(() => {
		console.log(assets)
		console.log(filteredAssets)
		console.log(searchCriteria)
  	}, [assets, filteredAssets])
  
	const displayedAssets = Object.keys(searchCriteria).length === 0 ? assets : filteredAssets;
  
	return (
		<div className="flex flex-col text-white">
			<div className='bg-[#2B2B2B] p-6 mb-20'>
				<h1 className="text-6xl font-bold mb-6 font-sans pl-5">Browse Marketplace</h1>
				<p className="mb-6 text-2xl font-sans pl-5">Browse more through our Marketplace.</p>
				<SearchForm />
			</div>
			<div className="bg-[#3B3B3B] w-full p-6 flex flex-row flex-wrap items-center justify-center">
				{displayedAssets.map(asset => (
					<div className="w-1/4 p-2" key={asset.id}>
						{/* TODO: Pass real fetched data props */}
						<AssetCard assetImage={assetImage} assetName={asset.name} owner={{ profile_img: assetImage, owner_name: asset.ownername }} price={asset.price}/>
					</div>
				))}
			</div>
	  	</div>
	  
	);
  };
  
export default Marketplace;