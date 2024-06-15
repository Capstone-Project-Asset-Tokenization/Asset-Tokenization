import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getTransactionContractInstance } from '../../config/contractInstances';
import { SpinLoader } from '../../components/common/spinner/spinLoader';

const AssetTransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const [signer, contract, contractWithSigner] = await getTransactionContractInstance();

            console.log('Signer', signer)
            const address = await signer.address;

            try {
                const txs = await contractWithSigner.getTransactionsFiltered(address, address, 0, 0);
                setTransactions(txs);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError(error.toString());
            }
            setLoading(false);
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return (
            <div>
                <SpinLoader />
            </div>
        );
    }
    
    if (error) {
        return <div> Error: {error}</div>
    }

    return (
        <div className='max-w-5xl mx-auto p-4 bg-neutral-800 text-white m-4'>
            <h1 className='text-xl text font-bold mb-8'>Transaction History</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full leading-normal'>
                <thead>
                    <tr className='text-left'>
                    <th className='px-5 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Name/Business</th>
                    <th className='px-5 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Date</th>
                    <th className='px-5 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Amount</th>
                    <th className='px-5 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Status</th>
                    <th className='px-5 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <tr key={index}>
                        <td className='px-5 py-5 border-b border-gray-800 bg-black text-sm'>{tx.to}</td>
                        <td className='px-5 py-5 border-b border-gray-800 bg-black text-sm'>{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                        <td className='px-5 py-5 border-b border-gray-800 bg-black text-sm'>{ethers.utils.formatEther(tx.amount)} ETH</td>
                        <td className='px-5 py-5 border-b border-gray-800 bg-black text-sm'>Transfer</td>
                        <td className='px-5 py-5 border-b border-gray-800 bg-black text-sm'>
                            <button className='text-blue-500 hover:text-blue-600'>Details</button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className='text-center py-5 border-b border-gray-800 bg-neutral-800 text-sm'>No Transaction History</td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssetTransactionsTable;
