"use client";

import { useEffect, useState } from "react";

const BIRTH_DATE = new Date("2005-05-15T00:00:00"); // change this

function getAgeInYears(birthDate: Date) {
  const now = new Date();

  const diffMs = now.getTime() - birthDate.getTime();

  const yearMs = 365.2425 * 24 * 60 * 60 * 1000;

  return diffMs / yearMs;
}

export default function LiveAge() {
  const [age, setAge] = useState(() => getAgeInYears(BIRTH_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAgeInYears(BIRTH_DATE));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-white bg-black px-3 py-2 text-xl">
      been here for {age.toFixed(9)} years
    </div>
  );
}