import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropertyCard from './PropertyCard';
import { fetchAssets } from './assetsSlice';
import SearchForm from './SearchForm';

const Marketplace = () => {
  const dispatch = useDispatch();
  const assets = useSelector(state => state.assets.assets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);


  return (
	<div>
		<h1>Marketplace</h1>
		{/* Search form goes here */}
		<SearchForm />
		<div className="assets-list">
			{assets.map(property => (
				<PropertyCard key={property.id} property={property} />
			))}
		</div>
	</div>
  );
};

export default Marketplace;
