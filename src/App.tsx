import functionPlot from "function-plot";
import { useEffect, useRef, useState } from "react";
import "./App.css";

const someDefaultFunctions = [
  "x",
  "x^2",
  "x^3",
  "sin(x)",
  "cos(x)",
  "tan(x)",
  "log(x)",
  "ln(x)",
  "sqrt(x)",
  "abs(x)",
  "exp(x)",
  "sqrt(1 - x * x)",
  "-sqrt(1 - x * x)",
];

export default function App() {
  const target = useRef<HTMLDivElement>(null);
  const contentsBounds = document.body.getBoundingClientRect();
  const [formula, setFormula] = useState<string[]>([]);
  useEffect(() => {
    try {
      functionPlot({
        target: target.current!,
        grid: true,
        width: (contentsBounds.width * 2) / 3,
        height: contentsBounds.height - 50,
        yAxis: {
          domain: [-10, 10],
        },
        data: formula.map((f) => ({
          fn: f,
          ...(f.includes("y") ? { fnType: "implicit" } : {}),
        })),
        tip: {
          xLine: true,
          yLine: true,
          renderer(x, y) {
            if (Math.floor(Math.abs(y)) == 0) {
              return `(${x}, ${y})`;
            }
            return "";
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className="App">
        <div className="formula">
          <button
            onClick={() => {
              setFormula([
                ...formula,
                someDefaultFunctions[
                  Math.floor(Math.random() * someDefaultFunctions.length)
                ],
              ]);
            }}
            className="add-button"
          >
            + (will be random the random function)
          </button>
          {formula.map((_, i) => (
            <div className="formula-item" key={i}>
              <input
                type="text"
                value={formula[i]}
                onChange={(e) =>
                  setFormula([
                    ...formula.slice(0, i),
                    e.target.value,
                    ...formula.slice(i + 1),
                  ])
                }
              />
              <button
                key={i}
                onClick={() => {
                  const newFormula = [...formula];
                  newFormula.splice(i, 1);
                  setFormula(newFormula);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div ref={target} className="plot" />
      </div>
    </>
  );
}
