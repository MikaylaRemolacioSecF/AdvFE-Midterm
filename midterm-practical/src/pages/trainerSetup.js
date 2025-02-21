import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TrainerSetup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Load existing trainer info if available
  useEffect(() => {
    const savedTrainer = JSON.parse(localStorage.getItem("trainer"));
    if (savedTrainer) {
      setName(savedTrainer.name);
      setAge(savedTrainer.age);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!age.trim()) newErrors.age = "Age is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const trainer = { name, age };
      localStorage.setItem("trainer", JSON.stringify(trainer)); // Save to localStorage
      router.push("/"); // Redirect back to Home
    }
  };

  return (
    <div style={{ textAlign: "center",backgroundColor: "#B6D0E2", minHeight: "100vh", padding: "20px", color: "blue"}}>
      <h1>Edit Trainer Information</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ margin: "10px" }} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </label>
        <br />

        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ margin: "10px" }} />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </label>
        <br />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
