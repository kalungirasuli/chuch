import { useState } from 'react';

export default function UserDonate() {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    try {
      const response = await fetch('http://server.trueheartofworship.com/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payer, amount }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      alert('Donation successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Donation failed!');
    }
  };

  return (
    <div className="verify backdrop-blur-sm bg-brown/50 rounded-0 p-5 flex flex-col gap-5 w-[95%] md:p-10 m-auto md:rounded-[20px] md:w-[50%] lg:max-w-[400px]">
      <div className="div">
        <h1 className="font-extrabold text-left text-white text-[30px]">Donation</h1>
        <p className="text-[15px] text-white text-left m-0 font-medium">Kindly enter your phone to receive donation message</p>
      </div>
      <div className="div">
        <div className="div flex flex-row h-[50px] mb-5">
          <input
            type="text"
            placeholder="0701111111"
            className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          />
        </div>
        <div className="div flex flex-row h-[50px] mb-5">
          <input
            type="text"
            placeholder="Amount above 500shs"
            className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="div p-5">
          <button
            className="bg-yellow text-white text-[20px] font-extrabold w-full p-4 rounded-[10px]"
            onClick={handleDonate}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}

