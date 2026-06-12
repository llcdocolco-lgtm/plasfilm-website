import { useState, useEffect } from 'react';

export default function useDollarRate() {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const load = () =>
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(r => r.json())
        .then(d => setRate(Math.round(d.rates.COP)))
        .catch(() => {});

    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return rate;
}
