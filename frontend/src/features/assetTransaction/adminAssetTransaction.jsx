import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getTransactionContractInstance } from '../../config/contractInstances';
import { SpinLoader } from '../../components/common/spinner/spinLoader';

const AdminAssetTransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const [signer, contract, contractWithSigner] = await getTransactionContractInstance();

            console.log('Signer', signer)
            const address = await signer.address;

            console.log('Address', address)

            try {
                const allTransactions = await contractWithSigner.getTransactionsFiltered("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", 0, 0);
                console.log('ALL TXS', allTransactions);

                // Set the combined transactions in state
                setTransactions(allTransactions);

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
        return <div>Error: {error}</div>
    }

    return (
        <div className='mx-20 p-4 bg-neutral-800 text-white m-4 '>
            <h1 className='text-xl font-bold mb-8'>Transaction History</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full leading-normal'>
                    <thead>
                        <tr className='text-left'>
                        <th className='px-5 py-3 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider'>Asset ID</th>
                        <th className='px-5 py-3 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider'>From</th>
                        <th className='px-5 py-3 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider'>To</th>
                        <th className='px-5 py-3 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider'>Token Amount</th>
                        <th className='px-5 py-3 border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider'>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                        transactions.map((tx, index) => (
                            <tr key={index}>
                                <td className='px-5 py-5 border-b border-neutral-800 bg-black text-sm'>{Number(tx.assetId)}</td>
                                <td className='px-5 py-5 border-b border-neutral-800 bg-black text-sm'>{tx.from}</td>
                                <td className='px-5 py-5 border-b border-neutral-800 bg-black text-sm'>{tx.to}</td>
                                <td className='px-5 py-5 border-b border-neutral-800 bg-black text-sm'>{Number(tx.amount)} Tokens</td>
                                <td className='px-5 py-5 border-b border-neutral-800 bg-black text-sm'>{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5" className='text-center py-5 border-b border-neutral-800 bg-neutral-800 text-sm'>No Transaction History</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAssetTransactionsTable;

