import  { useState, useRef } from "react";

export function InputVCode({ length, label, loading, onComplete }){
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])
  const [data,setData]=useState('')
  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== "")) {
     setData(onComplete(newCode.join(""))) 
 
    }
  };
 
  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="code-input w-full flex flex-col gap-3">
      <label className="code-label text-white text-[20px] font-bold ">{label}</label>
      <div className="code-inputs grid grid-cols-6 gap-3 w-full h-[40px] md:h-[50px]">
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={e => processInput(e, idx)}
              onKeyUp={e => onKeyUp(e, idx)}
              ref={ref => inputs.current.push(ref)}
              className="bg-gray-300 h-full w-full rounded-0 outline-none border-0 focus:outline-2 focus:outline-yellow"
            />
          );
        })}
      </div> 
      <button className="font-extrabold text-[20px] bg-yellow hover:bg-amber-600 rounded-0 text-white text-center p-2 w-[150px] md:w-[200px]">Resend</button>
    </div>
  );
};

