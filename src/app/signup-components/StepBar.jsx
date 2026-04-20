import CheckIcon from "./CheckIcon";
import ChevronRight from "./ChevronRight";

export default function StepBar({ steps, current, completed, isReturning, onStepClick }) {
  return (
    <>
      <style>{`
        .step-bar-scroll::-webkit-scrollbar { display: none; }
        .step-btn:hover { background-color: #f0f4ff !important; }
      `}</style>
      <div className="step-bar-scroll" style={{
        display: "flex", flexWrap: "nowrap", alignItems: "stretch",
        backgroundColor: "#f8f9fb", borderBottom: "1px solid #e2e5ea",
        overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none",
        borderRadius: "8px 8px 0 0",
      }}>
        {steps.map((s, i) => {
          const done = completed.includes(s.id);
          const active = current === i;
          const clickable = isReturning && done;
          return (
            <button key={s.id} className="step-btn"
              onClick={() => clickable && onStepClick(i)}
              style={{
                flex: "1 1 auto", minWidth: "max-content", padding: "18px 32px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                backgroundColor: active ? "#fff" : "transparent",
                borderWidth: 0, borderStyle: "solid", borderColor: "transparent",
                borderBottom: active ? "3px solid #0176d3" : "3px solid transparent",
                cursor: clickable ? "pointer" : "default",
                transition: "background .2s, border-color .2s",
                fontFamily: "'DM Sans', sans-serif",
                position: "relative", flexShrink: 0,
              }}
            >
              <span style={{
                width: 26, height: 26, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                backgroundColor: done ? "#0176d3" : active ? "#e8f0fe" : "#e2e5ea",
                color: done ? "#fff" : active ? "#0176d3" : "#6b7280",
                boxShadow: active ? "0 0 0 3px #d0e8fb" : "none",
                transition: "all .2s",
              }}>
                {done ? <CheckIcon /> : i + 1}
              </span>
              <span style={{
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? "#0176d3" : done ? "#1a2332" : "#6b7280",
                whiteSpace: "nowrap",
              }}>{s.label}</span>
              {i < steps.length - 1 && (
                <span style={{ position: "absolute", right: -2, color: "#c0c7d0", zIndex: 1, display: "flex", alignItems: "center" }}>
                  <ChevronRight />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
