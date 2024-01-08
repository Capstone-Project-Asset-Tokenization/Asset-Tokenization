import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropertyCard from './PropertyCard';
import { fetchAssets } from './assetsSlice';
import SearchForm from './SearchForm';

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
	  <div>
		<h1>Marketplace</h1>
		<SearchForm />
		<div className="assets-list">
		  {displayedAssets.map(asset => (
			<PropertyCard key={asset.id} title={asset.name} description={asset.category}/>
		  ))}
		</div>
	  </div>
	);
  };
  
export default Marketplace;