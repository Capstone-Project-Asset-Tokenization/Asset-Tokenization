import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAssetContractInstance } from '../../../config/contractInstances';
import dummyAsset from '../../../assets/dummy_asset.jpg';
import { SpinLoader } from '../../../components/common/spinner/spinLoader';

function AssetDetail() {
  const location = useLocation();
  const assetId = location.state.id;
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const [contract, contractWithSigner] = await getAssetContractInstance();
        const fetchedAsset = await contractWithSigner.getAsset(assetId);
        setAsset(fetchedAsset);
      } catch (err) {
        console.error('Error fetching asset from blockchain:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [assetId]);

  // console.log(asset.images)

  const categoryMapping = {
      0: "RealEstate",
      1: "Artwork",
      2: "IntellectualProperty",
      3: "Other"
  };

  const downloadFile = (fileUrl, fileName) => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  if (loading) return <div><SpinLoader /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!asset) return <div>No asset found</div>;

  return (
    <div className='bg-[#2B2B2B] text-white min-h-screen mb-6'>
      <div className='w-full h-1/4 overflow-hidden'>
        <img className='w-full h-full object-contain' src={asset.images.length > 0 ? asset.images[0] : dummyAsset } alt='asset image' />
      </div>
      <div className='flex flex-col gap-6 mt-6 mx-20'>
        <div>
          <h1 className='text-6xl mb-5'>{asset.name}</h1>
          <p className='text-xl mb-5 opacity-50 font-mono'>{parseInt(asset.tokenPrice)} ETH per Token</p>
        </div>
        <div>
          <h3 className='font-bold font-mono mb-3'>Description</h3>
          <p className='text-xl opacity-50 font-mono'>{asset.description}</p>
        </div>
        <div>
          <h3 className='font-bold font-mono mb-5'>Asset Images</h3>
          <div className='flex flex-wrap md:flex-row flex-col'>
            {asset.images.map((img, index) => (
              <div key={index} className='p-3' onClick={() => openModal(img)}>
                <div className='w-32 h-32 md:w-24 md:h-24 bg-gray-200 flex items-center justify-center overflow-hidden'>
                  <img src={img} alt={`Asset Image ${index + 1}`} className="w-full h-full object-cover"/>
                </div>
              </div>
            ))}
          </div>

          {modalImage && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4' onClick={closeModal}>
              <div className='bg-white p-3'>
                <img src={modalImage} alt='Expanded Asset' className="w-full h-96"/>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className='font-bold font-mono mb-3'>Supporting Documents</h3>
          {asset.supportingDocuments.map((doc, index) => (
            <div key={index} className='flex items-center'>
              <p className='text-xl opacity-50 font-mono mr-10'>Document {index + 1}</p>
              <button onClick={() => downloadFile(doc, doc.split('/')[doc.split('/').length - 1])} className='bg-primary-main text-white px-2 py-1 rounded'>View</button>
            </div>
          ))}
        </div>
        <div>
          <h3 className='font-bold mb-3'>Category</h3>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-2 rounded">{categoryMapping[asset.category]}</span>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;