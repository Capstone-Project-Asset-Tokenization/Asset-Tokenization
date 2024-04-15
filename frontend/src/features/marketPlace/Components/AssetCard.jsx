import React from "react";

const AssetCard = ({ name, totalSupply, tokenPrice, images }) => {
    return (
        <div className="flex flex-col shadow-lg rounded-[20px] overflow-hidden h-[450px]"> {/* Fixed height for the card */}
            {/* Image Section */}
            <div className="h-48 w-full overflow-hidden"> {/* Adjusted height for image */}
                <img src={images.length > 0 ? images[0] : "default-image-url.jpg"} alt={name} className="w-full h-full object-cover" />
            </div>

            {/* Details Section */}
            <div className="p-6 bg-[#2B2B2B] text-white flex flex-col justify-between flex-grow">
                <h1 className="text-2xl font-sans font-semibold">{name}</h1>
                <div className="my-3 flex justify-between">
                    <div>
                        <span className="opacity-50 font-mono font-thin">Total Supply</span>
                        <p className="font-light pt-1">{totalSupply.toLocaleString()} Units</p>
                    </div>
                    <div>
                        <span className="opacity-50 font-mono font-thin">Price</span>
                        <p className="font-light pt-1">{tokenPrice.toLocaleString()} ETH</p>
                    </div>
                </div>
                {/* TODO: connect the correct link */}
                <a href="/" className="opacity-50 font-mono font-thin pt-6">See Details</a>
            </div>
        </div>
    );
};

export default AssetCard;