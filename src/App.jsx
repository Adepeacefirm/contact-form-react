import React, { useState } from "react";
import { assets } from "./assets/assets";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [queryTypeError, setQueryTypeError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const [selected, setSelected] = useState("");
  const options = [
    { id: "genEnq", label: "General Enquiry" },
    { id: "supReq", label: "Support Request" },
  ];

  const [iconChecked, setIconChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!firstName.trim()) {
      setFirstNameError("This field is required");
      valid = false;
    } else setFirstNameError("");

    if (!lastName.trim()) {
      setLastNameError("This field is required");
      valid = false;
    } else setLastNameError("");

    if (!email.trim()) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Enter a valid email");
      valid = false;
    } else setEmailError("");

    if (!selected) {
      setQueryTypeError("Please select a query type");
      valid = false;
    } else setQueryTypeError("");

    if (!message.trim()) {
      setMessageError("This field is required");
      valid = false;
    } else setMessageError("");

    if (!iconChecked) {
      setConsentError("To submit this form, please concent to being contacted");
      valid = false;
    } else setConsentError("");

    if (valid) {
      console.log("Form submitted", {
        firstName,
        lastName,
        email,
        selected,
        message,
        iconChecked,
      });

      setSuccessMessage(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelected("");
      setMessage("");
      setIconChecked(false);

      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="relative">
      {successMessage && (
        <div className="p-5 text-green-700 border bg-[#2A4144] w-[80%] sm:w-[70%] lg:w-[33%] sm:-top-15 text-sm mx-auto rounded-lg absolute left-1/2 transform -translate-x-1/2 -top-5">
          <div className="flex items-center gap-2 mb-2">
            <img className="w-[5%]" src={assets.icon_success_check} alt="" />
            <h2 className="text-white font-medium text-lg">Message Sent!</h2>
          </div>
          <div>
            <p className="text-[#E0F1E8]">
              Thanks for completing the form. We will be in touch soon!
            </p>
          </div>
        </div>
      )}
      <main className="w-[90%] sm:w-[80%] lg:w-[50%] mx-auto bg-white my-10 sm:my-20 p-5 text-[#2A4144] rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <form noValidate onSubmit={handleSubmit}>
          <fieldset>
            <legend className="font-medium text-3xl pb-4">Contact Us</legend>
            <div className="flex flex-col sm:flex-row lg:items-center sm:gap-2.5 justify-between ">
              <div className="w-full">
                <label htmlFor="firstName" className="mb-5">
                  First Name *
                </label>
                <input
                  className={`border block w-full mt-2 rounded-lg py-1.5 p-2 cursor-pointer hover:border-2 hover:border-[#0C7D69] focus:outline-[#0C7D69] transition-colors duration-500 ${
                    firstNameError
                      ? "border-red-500 mb-1"
                      : "border-[#86A2A5] mb-6"
                  }`}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    e.target.value.trim() && setFirstNameError("");
                  }}
                />
                {firstNameError && (
                  <p className="text-red-500 text-sm mb-4">{firstNameError}</p>
                )}
              </div>
              <div className="w-full">
                <label className="mt-5" htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  className={`border block mt-2 w-full p-2 rounded-md py-1.5 cursor-pointer transition-colors duration-500 hover:border-2 hover:border-[#0C7D69] focus:outline-[#0C7D69] ${
                    lastNameError
                      ? "border-red-500 mb-1"
                      : "border-[#86A2A5] mb-6"
                  }`}
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    e.target.value.trim() && setLastNameError("");
                  }}
                />
                {lastNameError && (
                  <p className="text-red-500 text-sm mb-4">{lastNameError}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email">Email Address *</label>
              <input
                className={`block border mt-2 w-full p-2 rounded-md py-1.5 cursor-pointer transition-colors duration-500 hover:border-2 hover:border-[#0C7D69] focus:outline-[#0C7D69] ${
                  emailError ? "border-red-500 mb-1" : "border-[#86A2A5] mb-5"
                }`}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (email.includes("@") && email.includes(".")) {
                    setEmailError("");
                  }
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mb-4">{emailError}</p>
              )}
            </div>
            <div>
              <p className="mb-3">Query Type *</p>
              <div className="sm:flex w-full gap-3">
                {options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`flex items-center w-full gap-3 py-2 px-4 transition-colors duration-500 rounded-[5px] mb-2 cursor-pointer hover:border-2 hover:border-[#0C7D69] focus:outline-[#0C7D69] ${
                      selected === opt.id
                        ? "border-[#0C7D69] border-2"
                        : "border border-[#86A2A5]"
                    }`}
                    onClick={() => {
                      setSelected(opt.id);
                      setQueryTypeError("");
                    }}
                  >
                    <input
                      type="radio"
                      name="queryType"
                      id={opt.id}
                      className="hidden"
                      checked={selected === opt.id}
                      onChange={() => setSelected(opt.id)}
                    />
                    {selected === opt.id ? (
                      <img
                        src={assets.icon_radio_selected}
                        alt="selected"
                        className="h-5 w-5"
                      />
                    ) : (
                      <div className="h-5 w-5 border rounded-full"></div>
                    )}

                    <label htmlFor={opt.id} className="cursor-pointer">
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
              {queryTypeError && (
                <p className="text-red-500 text-sm">{queryTypeError}</p>
              )}
            </div>
            <div className="mt-5">
              <label htmlFor="message">Message *</label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  e.target.value.trim() && setMessageError("");
                }}
                className={`border rounded-md block p-2 w-full transition-colors duration-500 h-40 mt-2 cursor-pointer hover:border-2 hover:border-[#0C7D69] focus:outline-[#0C7D69] ${
                  messageError ? "border-red-500" : "border-[#86A2A5]"
                }`}
              ></textarea>
              {messageError && (
                <p className="text-red-500 text-sm">{messageError}</p>
              )}
            </div>
            <div
              className={`mt-6 flex items-center gap-3 ${
                consentError ? "mb-1" : "mb-5"
              }`}
            >
              <input
                type="checkbox"
                name="consent"
                id="consent"
                className="hidden"
                onChange={(e) => {
                  setIconChecked(e.target.checked);
                  e.target.checked && setConsentError("");
                }}
                checked={iconChecked}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIconChecked(!iconChecked);
                }}
              >
                {iconChecked ? (
                  <img src={assets.icon_checkbox_check} alt="" />
                ) : (
                  <div
                    onClick={() => {
                      setConsentError("");
                    }}
                    className="h-5 w-5 rounded border"
                  ></div>
                )}
              </div>
              <label htmlFor="consent" className="cursor-pointer">
                {" "}
                I consent to being contacted by the team *
              </label>
            </div>
            {consentError && (
              <p className="text-red-500 text-sm mb-5">{consentError}</p>
            )}
            <button
              className="w-full p-2 bg-[hsl(169,82%,27%)] transition-colors duration-300 text-white rounded-md cursor-pointer hover:bg-[hsl(169,82%,10%)]"
              type="submit"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default App;
