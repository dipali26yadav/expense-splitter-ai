import { useState } from "react";

function App() {
  const [person, setPerson] = useState("");
  const [people, setPeople] = useState([]);

  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const [expenses, setExpenses] = useState([]);

 const addPerson = async () => {
  if (person === "") return;

  await fetch("http://localhost:5000/addParticipant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: person })
  });

  setPeople([...people, person]);
  setPerson("");
};

  const addExpense = () => {
    if (expense === "" || amount === "" || paidBy === "") return;

    const newExpense = {
      name: expense,
      amount: Number(amount),
      paidBy: paidBy
    };

    setExpenses([...expenses, newExpense]);

    setExpense("");
    setAmount("");
    setPaidBy("");
  };

  const calculateBalances = () => {
    let balances = {};

    people.forEach((p) => (balances[p] = 0));

    expenses.forEach((item) => {
      const share = item.amount / people.length;

      people.forEach((p) => {
        if (p === item.paidBy) {
          balances[p] += item.amount - share;
        } else {
          balances[p] -= share;
        }
      });
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Expense Splitter</h1>

      <h2>Add Participant</h2>

      <input
        placeholder="Person name"
        value={person}
        onChange={(e) => setPerson(e.target.value)}
      />

      <br /><br />

      <button onClick={addPerson}>Add Person</button>

      <h3>Participants</h3>
      <ul>
        {people.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>

      <hr />

      <h2>Add Expense</h2>

      <input
        placeholder="Expense name"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      >
        <option value="">Who paid?</option>
        {people.map((p, index) => (
          <option key={index} value={p}>
            {p}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={addExpense}>Add Expense</button>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.amount} (Paid by {item.paidBy})
          </li>
        ))}
      </ul>

      <hr />

      <h2>Balances</h2>

      <ul>
        {Object.entries(balances).map(([person, balance], index) => (
          <li key={index}>
            {person}: {balance > 0 ? `Gets ₹${balance}` : `Owes ₹${Math.abs(balance)}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;