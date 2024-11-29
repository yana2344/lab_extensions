import React, { useState } from 'react';
import { PublicKey } from "@solana/web3.js";
import { sha256 } from 'js-sha256';  

const WalletPage: React.FC = () => {
    const [publicKeyInput, setPublicKeyInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [generatedAddress, setGeneratedAddress] = useState<string>('');

    const handleGenerateAddress = () => {
        try {
          
            const publicKey = new PublicKey(publicKeyInput);

            const publicKeyBytes = publicKey.toBytes(); 
            const hash = sha256(publicKeyBytes); 
            const cryptoAddress = hash.slice(0, 32); 

            setGeneratedAddress(cryptoAddress);
            setOutput('Address generated successfully!');
        } catch (error) {
            setGeneratedAddress('');
            setOutput(`Invalid Public Key: ${(error as Error).message}`);
        }
    };

    return (
        <div className="min-h-64 bg-gray-200 flex flex-col items-center justify-start p-4">
            {/* Заголовок сторінки */}
            <h1 className="text-2xl font-bold mb-6">Wallet Page</h1>

            {/* Секція для введення ключа */}
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
                <label htmlFor="publicKeyInput" className="block text-lg font-semibold mb-2">
                    Enter Public Key 
                </label>
                <input
                    id="publicKeyInput"
                    type="text"
                    placeholder="Enter Public Key"
                    value={publicKeyInput}
                    onChange={(e) => setPublicKeyInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleGenerateAddress}
                    id="generateAddress"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Generate Address
                </button>

                <p id="output" className="mt-4 text-gray-700">{output}</p>
                
                {}
                {generatedAddress && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Generated Address:</h2>
                        <p className="text-gray-800">{generatedAddress}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletPage;
