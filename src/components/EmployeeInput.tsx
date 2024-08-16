// EmployeeInput.tsx
import React from "react";

interface EmployeeInputProps {
  employee: string;
  setEmployee: React.Dispatch<React.SetStateAction<string>>;
}

export function EmployeeInput({ employee, setEmployee }: EmployeeInputProps) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        placeholder="Enter employee name"
        aria-describedby="button-addon2"
      />
    </div>
  );
}
