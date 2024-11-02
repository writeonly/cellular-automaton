import React, { useState } from 'react';

interface AntConfigProps {
  onStart: (direction: number, turnRules: string) => void;
}

const AntConfig: React.FC<AntConfigProps> = ({ onStart }) => {
  const [direction, setDirection] = useState<number>(0);
  const [turnRules, setTurnRules] = useState<string>('RL');

  const handleDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(Number(event.target.value));
  };

  const handleTurnRulesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTurnRules(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onStart(direction, turnRules);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Direction:
          <select value={direction} onChange={handleDirectionChange}>
            <option value={0}>Up</option>
            <option value={1}>Right</option>
            <option value={2}>Down</option>
            <option value={3}>Left</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Turn Rules (e.g., RL):
          <input
            type="text"
            value={turnRules}
            onChange={handleTurnRulesChange}
            pattern="[RL]*"
          />
        </label>
      </div>
      <button type="submit">Start</button>
    </form>
  );
};

export default AntConfig;
