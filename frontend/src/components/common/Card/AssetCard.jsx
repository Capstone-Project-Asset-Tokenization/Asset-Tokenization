import React from "react";

// import assetImage from 

const AssetCard = ({ assetImage, assetName, owner, price }) => {
    return (
        <div className="flex flex-col shadow-lg rounded-[20px] overflow-hidden">
            {/* Image Section */}
            {/* <div className="bg-cover bg-center h-48 w-full" style={{ backgroundImage: `url(${assetImage})` }}>
                {/* Empty div for image */}
            {/* </div> */}

            <div className="h-70 w-full overflow-hidden">
                <img src={assetImage} alt="Asset" className="w-full h-full object-cover" />
            </div>

            {/* Details Section */}
            <div className="p-6 bg-[#2B2B2B] text-white flex flex-col justify-between flex-grow">
                <h1 className="text-2xl font-sans font-semibold">{assetName}</h1>
                <div className="flex items-center my-2">
                    <img src={owner.profile_img} alt="Owner" className="h-6 w-6 rounded-full mr-2"/>
                    <p className="font-sans">{owner.owner_name}</p>
                </div>
                <div className="my-3 flex justify-between">
                    <div>
                        <span className="opacity-50 font-mono font-thin">Price</span>
                        <p className="font-light pt-1">{price} ETH</p>
                    </div>
                    {/* TODO: connect the correct link */}
                    <a href="/" className="opacity-50 font-mono font-thin pt-6">See Details</a>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;
