import React, { useState } from 'react';

export default function QRCodes() {
  //useState variables
  const [type, setType] = useState('single');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [startinput, setstartInput] = useState();
  const [number, setNumber] = useState(0);

  //Initialize Array that goes up by 1 with start and end as useState variables
  let numArray = [];
  for (let i = BigInt(start); i < BigInt(end); i += BigInt(1)) {
    numArray.push(i);
  }

  //GetQR Request
  const getqr = (e) => {
    setStart(BigInt(startinput));
    setEnd(BigInt(startinput) + BigInt(number));
    e.preventDefault();
  };

  //Save as .txt function
  const savetxt = (e) => {
    var FileSaver = require('file-saver');
    const txt = new Blob([numArray], {
      type: 'text/plain;charset=utf-8'
    });
    FileSaver.saveAs(txt, 'QR Codes.txt');
    e.preventDefault();
  };

  //Get Selection Single or Multiple
  const getselection = (e) => {
    setType(e.target.value);
    setstartInput('');
    setNumber('');
    setStart('');
  };

  //Console log array out to get codes if don't want to download it
  console.log(numArray.toString());

  //JSX if start is greater than or equal to end and multiple selected
  if (
    (start >= end || start === undefined || end === undefined || !numArray) &&
    type === 'multiple'
  ) {
    return (
      <div className="QRCodes">
        <form>
          <select onChange={getselection}>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
          <label>Number of QR's</label>
          <input
            className="Number"
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <label>Start</label>
          <input
            className="Start"
            onChange={(e) => setstartInput(e.target.value)}
          ></input>
          <button onClick={getqr}>Submit</button>
          <button onClick={savetxt}>Save txt</button>
        </form>
      </div>
    );

    //JSX if start is greater than or equal to end and single selected
  } else if (
    (start >= end || start === undefined || end === undefined || !numArray) &&
    type === 'single'
  ) {
    return (
      <div className="QRCodes">
        <form>
          <select onChange={getselection}>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>

          <label>QR Code</label>
          <input
            className="Start"
            onChange={(e) => setstartInput(e.target.value)}
          ></input>
          <button onClick={getqr}>Submit</button>
          <button onClick={savetxt}>Save txt</button>
        </form>
      </div>
    );
  }

  //JSX if multiple is selected
  else if (type === 'multiple') {
    return (
      <div className="QRCodes">
        <form>
          <select onChange={getselection}>
            <option value="single" onChange={getselection}>
              Single
            </option>
            <option value="multiple" onChange={getselection}>
              Multiple
            </option>
          </select>
          <label>Number of QR's</label>
          <input
            className="Number"
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <label>Start</label>
          <input
            className="Start"
            onChange={(e) => setstartInput(e.target.value)}
          ></input>
          <button onClick={getqr}>Submit</button>
          <button onClick={savetxt}>Save txt</button>
        </form>
        <div className="QRContainer">
          {numArray.map((array, index) => (
            <div className="QR" key={index}>
              <h4>{array.toString()}</h4>
              <div>
                <img
                  src={`https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${array}`}
                  alt="qrcode"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    //jSX if single is selected
  } else if (type === 'single') {
    return (
      <div className="QRCodes">
        <form>
          <select onChange={getselection}>
            <option value="single" onChange={getselection}>
              Single
            </option>
            <option value="multiple" onChange={getselection}>
              Multiple
            </option>
          </select>
          <label>QR Code</label>
          <input
            className="Start"
            onChange={(e) => setstartInput(e.target.value)}
          ></input>
          <button onClick={getqr}>Submit</button>
          <button onClick={savetxt}>Save txt</button>
        </form>
        <div className="QRContainer">
          <div className="QR">
            <h4>{startinput}</h4>
            <div>
              <img
                src={`https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${startinput}`}
                alt="qrcode"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
