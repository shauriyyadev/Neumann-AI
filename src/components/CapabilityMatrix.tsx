const YES = { y: true } as const;
const NO = { n: true } as const;

type Cell = string | typeof YES | typeof NO;

const ROWS: Array<[string, Cell, Cell, Cell]> = [
  ["Agents", "3", "15", "Unlimited"],
  ["Runs per month", "2,000", "20,000", "Unlimited"],
  ["Approval gates", YES, YES, YES],
  ["Run history", "30 days", "12 months", "Custom"],
  ["Audit log export", YES, YES, YES],
  ["SSO and SCIM", NO, YES, YES],
  ["Data residency", "US", "US or EU", "US or EU, dedicated"],
  ["DPA and custom SLA", NO, NO, YES],
  ["Support", "Email", "Priority", "Named engineer"],
];

function Value({ cell }: { cell: Cell }) {
  if (typeof cell === "object")
    return "y" in cell ? (
      <span className="yes" aria-label="Included">
        ✓
      </span>
    ) : (
      <span className="no" aria-label="Not included">
        —
      </span>
    );
  return <span>{cell}</span>;
}

export default function CapabilityMatrix() {
  return (
    <div className="matrix-wrap reveal">
      <table className="matrix">
        <caption className="sr-only">
          Capabilities by plan: Starter, Team, and Enterprise.
        </caption>
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">Starter</th>
            <th scope="col" className="win">
              Team · most teams
            </th>
            <th scope="col">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([label, a, b, c]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>
                <Value cell={a} />
              </td>
              <td className="win">
                <Value cell={b} />
              </td>
              <td>
                <Value cell={c} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
