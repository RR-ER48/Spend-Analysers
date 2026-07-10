import { useState } from "react";

export default function App() {
  const [accountList, setAccountList] = useState([]);
  const [logSection, setLogSection] = useState(null);
  function handleAccountList(list) {
    setAccountList((accountList) => [...accountList, list]);
  }
  function handleLogIn(user, Password) {
    setLogSection(
      accountList.find(
        (account) => account.user === user && account.number === Password,
      ),
    );
  }

  function handlePaymentAmount(details) {
    setAccountList((accountList) =>
      accountList.map((account) =>
        account.user === logSection.user
          ? {
              ...account,
              payments: [...account.payments, details],
            }
          : account,
      ),
    );

    setLogSection((logSection) => ({
      ...logSection,
      payments: [...logSection.payments, details],
    }));
  }
  // console.log(accountList);
  // console.log(logSection);
  return (
    <div className="container">
      <Header />
      <div className="section">
        <CreateAccount handleAccountList={handleAccountList} />
        <LogIn handleLogIn={handleLogIn} />
      </div>
      {logSection && (
        <PaymentHistory
          logSection={logSection}
          handlePaymentAmount={handlePaymentAmount}
          setLogSection={setLogSection}
        />
      )}
    </div>
  );
}

function Header() {
  return <h1>Spend-Analysers</h1>;
}

function CreateAccount({ handleAccountList }) {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isName, setIsName] = useState("");
  const [user, setUser] = useState("");
  const [number, setNumber] = useState("");

  function handleCreateAccount() {
    setIsOpenAccount((isOpenAccount) => !isOpenAccount);
  }
  function handleCreateAccountSubmit() {
    if (!isName || !user || !number) return; //gaurd clause
    const newAccount = {
      isName,
      user,
      number,
      payments: [],
      // description: [],
    };
    handleAccountList(newAccount);
    setIsName("");
    setUser("");
    setNumber("");
    setIsOpenAccount(false);

    alert("Account Created Successfully");
  }
  return (
    <div className="create">
      <Button onClick={handleCreateAccount}>
        {isOpenAccount ? "Close" : "Create Account"}
      </Button>
      {isOpenAccount && (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={isName}
            onChange={(e) => setIsName(e.target.value)}
          />
          <input
            type="text"
            placeholder="user-id"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="your password eg.Ggt678"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button onClick={handleCreateAccountSubmit}>Submit</Button>
        </>
      )}
    </div>
  );
}

function LogIn({ handleLogIn }) {
  const [userId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  function handleLogInSubmit() {
    if (!userId || !Password) return; //gaurd clause

    handleLogIn(userId, Password);
    setUserId("");
    setPassword("");
  }
  return (
    <div className="log">
      <h3>Log-In</h3>
      <input
        type="text"
        placeholder="user-id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogInSubmit}>Log-In</Button>
    </div>
  );
}

function PaymentHistory({ logSection, handlePaymentAmount, setLogSection }) {
  const [amount, setAmount] = useState("");
  const [amountDescription, setAmountDescription] = useState("");

  function handleAmount() {
    if (!amount || !amountDescription) return; //gaurd clause
    const newPaymentDetails = {
      amount,
      amountDescription,
    };
    handlePaymentAmount(newPaymentDetails);
    setAmount("");
    setAmountDescription("");
  }
  function handleLogOut() {
    setLogSection(null);
  }
  return (
    <div className="historySection">
      <div className="amount">
        <p>Amount Spend</p>
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <input
          type="text"
          placeholder="Where to spend"
          value={amountDescription}
          onChange={(e) => setAmountDescription(e.target.value)}
        />
        <Button onClick={handleAmount}>➡️</Button>
      </div>
      <div className="spend">
        <h2>{logSection.isName}'s Spend</h2>

        <ul>
          {logSection.payments.map((payment, i) => (
            <PaymentList payment={payment} key={i} />
          ))}
        </ul>
        <Button onClick={handleLogOut}>Log-Out</Button>
      </div>
    </div>
  );
}

function PaymentList({ payment }) {
  return (
    <li>
      <span>{payment.amount}</span> - <span>({payment.amountDescription})</span>
    </li>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
