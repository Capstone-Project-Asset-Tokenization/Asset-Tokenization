import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AssetCard from '../Components/AssetCard';
import { fetchAssets } from '../assetsSlice';
import SearchForm from '../Components/SearchForm';
import assetImage from '../../../assets/Image Placeholder.svg';

const Marketplace = () => {
	const dispatch = useDispatch();

	// const displayedAssets = Object.keys(searchCriteria).length === 0 ? assets : filteredAssets;
	const displayedAssets = [
		{
			id: 1,
			name: 'Asset One',
			ownername: 'Owner A',
			price: '100.00',
		},
		{
			id: 2,
			name: 'Asset Two',
			ownername: 'Owner B',
			price: '200.00',
		},
		{
			id: 3,
			name: 'Asset Three',
			ownername: 'Owner C',
			price: '300.00',
		},
		{
			id: 4,
			name: 'Asset Four',
			ownername: 'Owner D',
			price: '400.00',
		},
		{
			id: 5,
			name: 'Asset Five',
			ownername: 'Owner E',
			price: '500.00',
		},
		{
			id: 6,
			name: 'Asset Six',
			ownername: 'Owner F',
			price: '600.00',
		},
		{
			id: 7,
			name: 'Asset Seven',
			ownername: 'Owner G',
			price: '700.00',
		},
		{
			id: 8,
			name: 'Asset Eight',
			ownername: 'Owner H',
			price: '800.00',
		}
	];
	
  
	return (
		<div className="flex flex-col text-white">
			<div className='bg-[#2B2B2B] p-6 mb-20'>
				<h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans pl-5">Browse Marketplace</h1>
				<p className="mb-6 text-2xl font-sans pl-5">Browse more through our Marketplace.</p>
				<SearchForm />
			</div>
			<div className="bg-[#3B3B3B] w-full p-6 flex flex-wrap items-center justify-center">
				{displayedAssets.map(asset => (
					<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={asset.id}>
						{/* TODO: Pass real fetched data props */}
						<AssetCard assetImage={assetImage} assetName={asset.name} owner={{ profile_img: assetImage, owner_name: asset.ownername }} price={asset.price}/>
					</div>
				))}
			</div>
	  	</div>
	  
	);
  };
  
export default Marketplace;