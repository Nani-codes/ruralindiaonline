import React, { useState } from 'react';
import styles from './Donate.module.css'
function DonateComponent(): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [moneyTab, setMoneyTab] = useState<number>(1);


  const handleTabChange = (tabNumber: number): void => {
    setActiveTab(tabNumber);
  };

  const handleMoneyChange = (tabNumber: number): void => {
    setMoneyTab(tabNumber);
  };

  let selectedOption: string | null = null;



function selectPaymentOption(option: string) {
  if (selectedOption === option) {
    // Deselect the option
    selectedOption = null;
  } else {
    // Select the option
    selectedOption = option;
  }
}

function updateButtonStyles() {
  const buttons = document.querySelectorAll('.space-x-4 button');
  buttons.forEach((button) => {
    const option = (button as HTMLButtonElement).innerText.trim(); // Cast to HTMLButtonElement
    if (selectedOption === option) {
      button.classList.add('bg-red-500', 'text-white');
    } else {
      // Handle the case when the option is not selected
    }
  });
  




}

  return (
    <div className={styles.mycontainer}>


      <div className={styles.form}>
      <div className="p-4">
    <h2 className="text-2xl font-bold mb-2">Donate to PARI</h2>
    {/* <p class="text-gray-700">Card content goes here. You can add any text or other elements.</p> */}
  </div>
      <div className="p-6 w-full">
    <div>
      <div className=" flex-col sm:flex-row space-x-4 space-y-2 mb-4  rounded-full ">
        <button
          onClick={() => handleTabChange(1)}
          className={`px-4 py-2 ${activeTab === 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-full`}
        >
          Online
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={`px-4 py-2 ${activeTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-full`}
        >
          Cheque/DD
        </button>
        <button
          onClick={() => handleTabChange(3)}
          className={`px-4 py-2 ${activeTab === 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-full`}
        >
          BankTransfer
        </button>
      </div>
      {activeTab === 1 && (
   
      
        <div className="space-y-4 mb-4">
<div className="flex space-x-4">
  <div className="text-center">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
      <span className="ml-2 text-gray-700"> Monthly</span>
    </label>
  </div>
  <div className="text-center">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
      <span className="ml-2 text-gray-700">Yearly</span>
    </label>
  </div>

  <div className="text-center">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
      <span className="ml-2 text-gray-700">One-Time</span>
    </label>
  </div>
</div>


          <div className="relative">
            
            <input
              type="text"
              placeholder="Username"
              className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Email Address"
              className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Phone Number"
              className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
            />
          </div>
          <div className="flex space-x-4 items-center">
            <input
              id="one-time-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="one-time-checkbox"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Citizen of India
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleMoneyChange(1)}
                className={`px-4 py-2 rounded-full ${moneyTab === 1 ? 'bg-red-200 text-white  border-red-500' : 'bg-gray-200 text-gray-800 border border-gray-800'}`}
              >
                100
              </button>
              <button
                onClick={() => handleMoneyChange(2)}
                className={`px-4 py-2 rounded-full ${moneyTab === 2 ? 'bg-red-200 text-white border border-red-500' : 'bg-gray-200 text-gray-800 border border-gray-800'}`}
              >
                500
              </button>
              <button
                onClick={() => handleMoneyChange(3)}
                className={`px-4 py-2 rounded-full ${moneyTab === 3 ? 'bg-red-200 text-white border border-red-500' : 'bg-gray-200 text-gray-800 border border-gray-800'}`}
              >
                1000
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 2 && (
      

      <div className="space-y-4 mb-4">

      
      
                <div className="relative">
                  
                  <input
                    type="text"
                    placeholder="Username"
                    className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                  />
                </div>
                <div className="flex space-x-4 items-center">
                  <input
                    id="one-time-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="one-time-checkbox"
                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Citizen of India
                  </label>
                </div>
   
              </div>
      )}
      {activeTab === 3 && (
           <div className="space-y-4 mb-4">
    
           
           
                     <div className="relative">
                       
                       <input
                         type="text"
                         placeholder="Username"
                         className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                       />
                     </div>
                     <div className="relative">
                       <input
                         type="text"
                         placeholder="Full name"
                         className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                       />
                     </div>
                     <div className="relative">
                       <input
                         type="text"
                         placeholder="Email Address"
                         className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                       />
                     </div>
                     <div className="relative">
                       <input
                         type="text"
                         placeholder="Phone Number"
                         className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                       />
                     </div>
                     <div className="relative">
                       <input
                         type="email"
                         placeholder="Email"
                         className="h-10 w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-blue-500 focus:ring-opacity-50 relative z-10"
                       />
                     </div>
                     <div className="flex space-x-4 items-center">
                       <input
                         id="one-time-checkbox"
                         type="checkbox"
                         value=""
                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                       />
                       <label
                         htmlFor="one-time-checkbox"
                         className="text-sm font-medium text-gray-900 dark:text-gray-300"
                       >
                         Citizen of India
                       </label>
                     </div>
               
                   </div>
      )}
    </div>
  </div>


      </div>


</div>

  );
}

export default DonateComponent;
