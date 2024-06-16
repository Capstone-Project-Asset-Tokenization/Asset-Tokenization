import React, { useState } from "react";

const faqData = {
  General: [
    {
      question: "What is asset tokenization?",
      answer:
        "Asset tokenization is the process of creating a digital representation (token) of a physical or digital asset on a blockchain network. This allows the asset to be traded, sold, or exchanged more efficiently and securely.",
    },
    {
      question: "How does the Asset Tokenization Platform work?",
      answer:
        "The Asset Tokenization Platform is a blockchain-based system that enables the digitization and trading of various types of assets. Users can register their assets on the platform, which then generates a unique token representing ownership. These tokens can be bought, sold, and transferred on the platform's decentralized marketplace.",
    },
    {
      question: "What types of assets can be tokenized on the platform?",
      answer:
        "The Asset Tokenization Platform supports the tokenization of a wide range of assets, including real estate, art, collectibles, commodities, financial instruments, and more. The platform is designed to be flexible and accommodate the tokenization of both physical and digital assets.",
    },
  ],
  "Accessing the Platform": [
    {
      question: "Who can use the Asset Tokenization Platform?",
      answer:
        "The Asset Tokenization Platform is open to a variety of users, including individual investors, businesses, and institutional investors. Anyone with a digital wallet can register and participate in the platform's tokenization and trading activities.",
    },
    {
      question:
        "What are the benefits of using the Asset Tokenization Platform?",
      answer:
        "The key benefits of using the Asset Tokenization Platform include increased liquidity, fractional ownership, improved transparency, reduced transaction costs, and the ability to access a broader range of investment opportunities. The platform also offers enhanced security and traceability through the use of blockchain technology.",
    },
    {
      question:
        "How is asset ownership and transactions recorded on the blockchain?",
      answer:
        "All asset tokenization and transactions on the platform are recorded on the blockchain network. This provides a transparent and tamper-proof ledger of ownership, transfers, and trading activities. The blockchain-based system ensures the integrity and immutability of asset records.",
    },
  ],
  "Security and Compliance": [
    {
      question:
        "What security measures are in place to protect asset tokenization?",
      answer:
        "The Asset Tokenization Platform employs advanced security measures to protect the integrity of the tokenization process and the assets themselves. This includes the use of encryption, multi-factor authentication, and secure storage solutions. The platform also undergoes regular security audits to ensure the highest level of protection.",
    },
    {
      question: "How are transactions on the platform regulated and compliant?",
      answer:
        "The platform is designed to be fully compliant with relevant regulations and industry standards. All tokenization and trading activities are subject to KYC (Know Your Customer) and AML (Anti-Money Laundering) procedures to ensure regulatory compliance. The platform also works closely with financial authorities to ensure that its operations adhere to the applicable laws and guidelines.",
    },
    {
      question:
        "What are the fees associated with using the Asset Tokenization Platform?",
      answer:
        "The platform charges a range of fees for its services, including registration fees for asset tokenization, trading fees for transactions, and optional subscription fees for advanced features or premium services. The specific fee structure is available on the platform's website and may be subject to periodic updates.",
    },
  ],
  "Trading and Liquidity": [
    {
      question: "Can users trade tokenized assets on secondary markets?",
      answer:
        "Yes, users can trade their tokenized assets on the platform's decentralized marketplace or list them on other compatible secondary markets. The platform's token-based system enables the seamless exchange of tokenized assets between buyers and sellers.",
    },
    {
      question:
        "How is the platform's native token used and what are its key features?",
      answer:
        "The platform's native token is used for a variety of purposes, including paying registration and trading fees, staking to participate in governance, and accessing premium features or services. The token is designed to incentivize network participation, provide utility, and support the overall ecosystem of the Asset Tokenization Platform.",
    },
    {
      question:
        "What kind of customer support is available for platform users?",
      answer:
        "The Asset Tokenization Platform provides comprehensive customer support to assist users with any questions or issues they may encounter. This includes a dedicated support team available via email, live chat, and online ticketing systems. The platform also offers extensive documentation, tutorials, and a knowledge base to help users navigate the platform effectively.",
    },
  ],
};

const FAQ = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeTab, setActiveTab] = useState("customer-support");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSection = (sectionKey) => {
    setActiveSection(activeSection === sectionKey ? null : sectionKey);
  };

  return (
    <div className="px-20 shadow-lg rounded-lg my-8">
      {Object.keys(faqData).map((sectionKey) => (
        <div key={sectionKey}>
          <button
            className="text-neutral-300 bg-neutal-800 shadow-lg mb-3 w-full px-6 py-4 text-left font-bold  hover:bg-neutral-700 focus:outline-none"
            onClick={() => toggleSection(sectionKey)}
          >
            {sectionKey}
            <span className="float-right">
              {activeSection === sectionKey ? "-" : "+"}
            </span>
          </button>
          {activeSection === sectionKey && (
            <div className="px-6 py-4">
              {faqData[sectionKey].map((faq, index) => (
                <div key={index} className="mb-8">
                  <h3 className="font-bold text-neutral-100 mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="container mx-auto py-8">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mr-4 rounded-t-lg ${
              activeTab === "customer-support"
                ? "bg-neutral-600 text-neutral-200"
                : "bg-neutral-600 text-neutral-500 hover:bg-neutral-200"
            }`}
            onClick={() => handleTabClick("customer-support")}
          >
            Customer Support
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "report-issue"
                ? "bg-neutral-600 text-neutral-200"
                : "bg-neutral-600 text-neutral-500 hover:bg-neutral-200"
            }`}
            onClick={() => handleTabClick("report-issue")}
          >
            Report an Issue
          </button>
        </div>

        {activeTab === "customer-support" ? (
          <CustomerSupportPage />
        ) : (
          <ReportIssuePage />
        )}
      </div>
    </div>
  );
};

const CustomerSupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log("Reported issue:", { name, email, issue });
      setSubmitting(false);
      setSubmitted(true);
      // Reset the form fields
      setName("");
      setEmail("");
      setIssue("");
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ask question here</h1>

      <h2 className="text-xl font-bold mt-8 mb-4">We will respond soon.</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="issue" className="block font-medium mb-1">
            Your question
          </label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary-main disabled:bg-gray-500 hover:bg-primary-light text-white font-medium px-4 py-2 rounded-md"
          disabled={submitting || !email || !name || !issue}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {submitted && (
          <div className="mt-4 text-green-500 font-bold">
            Your question has been submitted successfully!
          </div>
        )}
      </form>
      <div className="mt-6 pt-6">
        <a className="text-gray-500 mt-8" href="https://t.me/I4uGOD">
          Contact us on Telegram
        </a>
      </div>
    </div>
  );
};

const ReportIssuePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log("Reported issue:", { name, email, issue });
      setSubmitting(false);
      setSubmitted(true);
      // Reset the form fields
      setName("");
      setEmail("");
      setIssue("");
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>

      <h2 className="text-xl font-bold mt-8 mb-4">Report a New Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="issue" className="block font-medium mb-1">
            Issue Description
          </label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="border border-neutral-700 focus:border-neutral-500 outline-none bg-neutral-800 px-3 py-2 rounded-md w-full h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary-main disabled:bg-gray-500 hover:bg-primary-light text-white font-medium px-4 py-2 rounded-md"
          disabled={submitting || !email || !name || !issue}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {submitted && (
          <div className="mt-4 text-green-500 font-bold">
            Your issue has been submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default FAQ;
