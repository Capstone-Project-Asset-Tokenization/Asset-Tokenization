import React from "react";
import dummyAsset from "../../../assets/dummy_asset.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AssetDetail = ({ asset, onClose }) => {
  const categoryMapping = {
    0: "RealEstate",
    1: "Artwork",
    2: "IntellectualProperty",
    3: "Other",
  };

  const downloadFile = (fileUrl, fileName) => {
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  if (!asset) return <div>No asset found</div>;

  console.log("images", asset.images.length);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#2B2B2B] text-white w-[50vw] h-[90vh] mb-6 rounded-lg overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">
          <Carousel
            useKeyboardArrows={true}
            showThumbs={false}
            dynamicHeight={false}
            infiniteLoop={true}
          >
            {asset.images.length > 0 ? (
              asset.images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full w-full overflow-hidden"
                >
                  <img
                    className="object-cover h-[300px]"
                    src={img}
                    alt={`Asset Image ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-full">
                <img
                  className="object-cover h-[400px]"
                  src={dummyAsset}
                  alt="No images available"
                />
              </div>
            )}
          </Carousel>
        </div>

        <div className="flex flex-col gap-6 m-6 mx-20">
          <div>
            <h1 className="text-6xl mb-5">{asset.name}</h1>
            <p className="text-xl mb-5 opacity-50 font-mono">
              {parseInt(asset.tokenPrice)} ETH per Token
            </p>
          </div>
          <div>
            <h3 className="font-bold font-mono mb-3">Description</h3>
            <p className="text-xl opacity-50 font-mono">{asset.description}</p>
          </div>
          <div>
            <h3 className="font-bold font-mono mb-3">Supporting Documents</h3>
            <div className="flex flex-col gap-4">
              {asset.supportingDocuments.map((doc, index) => (
                <div key={index} className="flex items-center">
                  <p className="text-xl opacity-50 font-mono mr-4">
                    Document {index + 1}
                  </p>
                  <button
                    onClick={() =>
                      downloadFile(
                        doc,
                        doc.split("/")[doc.split("/").length - 1]
                      )
                    }
                    className="bg-primary-main text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3">Category</h3>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-2 rounded">
              {categoryMapping[asset.category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
