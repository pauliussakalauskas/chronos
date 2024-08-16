// SummaryTable.tsx

import { formatDuration } from "../utils";

type SummaryProps = {
  summary: {
    totalDuration: number;
    totalCaseCount: number;
    totalEfficiency: number;
  };
};

export function SummaryTable({ summary }: SummaryProps) {
  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-4 text-center" scope="col">
                Total Duration
              </th>
              <th className="col-4 text-center" scope="col">
                Total Case Count
              </th>
              <th className="col-4 text-center" scope="col">
                Total Efficiency
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                {formatDuration(summary.totalDuration)}
              </td>
              <td className="text-center">{summary.totalCaseCount}</td>
              <td className="text-center">
                {summary.totalEfficiency.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
