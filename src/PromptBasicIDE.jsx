import { useState, useRef, useCallback, useEffect } from "react";

const CONTROLS = [
  { type: "Pointer", icon: "⇱", label: "Pointer" },
  { type: "Label", icon: "A", label: "Label" },
  { type: "TextBox", icon: "ab|", label: "TextBox" },
  { type: "CommandButton", icon: "▭", label: "CommandButton" },
  { type: "CheckBox", icon: "☑", label: "CheckBox" },
  { type: "OptionButton", icon: "◉", label: "OptionButton" },
  { type: "ComboBox", icon: "▾⌷", label: "ComboBox" },
  { type: "ListBox", icon: "☰", label: "ListBox" },
  { type: "Frame", icon: "▢", label: "Frame" },
  { type: "PictureBox", icon: "🖼", label: "PictureBox" },
  { type: "Image", icon: "🏔", label: "Image" },
  { type: "HScrollBar", icon: "↔", label: "HScrollBar" },
  { type: "VScrollBar", icon: "↕", label: "VScrollBar" },
  { type: "Timer", icon: "⏱", label: "Timer" },
  { type: "DataGrid", icon: "⊞", label: "DataGrid" },
  { type: "Shape", icon: "○", label: "Shape" },
  { type: "Line", icon: "╱", label: "Line" },
  { type: "DriveListBox", icon: "💾", label: "DriveListBox" },
  { type: "DirListBox", icon: "📁", label: "DirListBox" },
  { type: "FileListBox", icon: "📄", label: "FileListBox" },
];

const EVENTS_BY_TYPE = {
  CommandButton: ["Click", "DblClick", "MouseDown", "MouseUp", "GotFocus", "LostFocus", "KeyPress", "KeyDown", "KeyUp"],
  TextBox: ["Change", "Click", "DblClick", "GotFocus", "LostFocus", "KeyPress", "KeyDown", "KeyUp"],
  Label: ["Click", "DblClick", "MouseDown", "MouseUp"],
  CheckBox: ["Click", "GotFocus", "LostFocus", "KeyPress"],
  OptionButton: ["Click", "DblClick", "GotFocus", "LostFocus"],
  ComboBox: ["Change", "Click", "DblClick", "DropDown", "GotFocus", "LostFocus", "KeyPress"],
  ListBox: ["Click", "DblClick", "GotFocus", "LostFocus", "KeyPress"],
  Frame: ["Click", "DblClick", "MouseDown", "MouseUp"],
  PictureBox: ["Click", "DblClick", "Paint", "Resize", "MouseDown", "MouseUp"],
  Image: ["Click", "DblClick", "MouseDown", "MouseUp"],
  HScrollBar: ["Change", "Scroll", "GotFocus", "LostFocus"],
  VScrollBar: ["Change", "Scroll", "GotFocus", "LostFocus"],
  Timer: ["Timer"],
  DataGrid: ["Click", "DblClick", "RowColChange", "Scroll"],
  Shape: ["Click", "DblClick", "MouseDown", "MouseUp"],
  Line: ["Click"],
  DriveListBox: ["Change", "GotFocus", "LostFocus"],
  DirListBox: ["Change", "Click", "GotFocus", "LostFocus"],
  FileListBox: ["Click", "DblClick", "PathChange", "GotFocus", "LostFocus"],
  Form: ["Load", "Unload", "Activate", "Deactivate", "Resize", "Paint", "Click", "DblClick", "KeyPress"],
};

const DEFAULT_PROPS = {
  Label: { Caption: "Label", BackColor: "#c0c0c0", ForeColor: "#000000", FontSize: "11", Visible: "True", Alignment: "0 - Left Justify" },
  TextBox: { Text: "", BackColor: "#ffffff", ForeColor: "#000000", FontSize: "11", Enabled: "True", MultiLine: "False", Visible: "True" },
  CommandButton: { Caption: "Command", Enabled: "True", FontSize: "11", Visible: "True", Style: "0 - Standard" },
  CheckBox: { Caption: "Check", Value: "0 - Unchecked", Enabled: "True", FontSize: "11", Visible: "True" },
  OptionButton: { Caption: "Option", Value: "False", Enabled: "True", FontSize: "11", Visible: "True" },
  ComboBox: { Text: "", Items: "", Enabled: "True", FontSize: "11", Visible: "True", Style: "0 - Dropdown Combo" },
  ListBox: { Items: "", Enabled: "True", FontSize: "11", Visible: "True", MultiSelect: "0 - None" },
  Frame: { Caption: "Frame", Enabled: "True", FontSize: "11", Visible: "True" },
  PictureBox: { BackColor: "#c0c0c0", Visible: "True" },
  Image: { Visible: "True", Stretch: "False" },
  HScrollBar: { Min: "0", Max: "100", Value: "0", Enabled: "True", Visible: "True" },
  VScrollBar: { Min: "0", Max: "100", Value: "0", Enabled: "True", Visible: "True" },
  Timer: { Enabled: "True", Interval: "0" },
  DataGrid: { Columns: "", Rows: "", Caption: "", Enabled: "True", FontSize: "11", Visible: "True" },
  Shape: { Shape: "0 - Rectangle", BackColor: "#c0c0c0", BorderColor: "#000000", Visible: "True" },
  Line: { BorderColor: "#000000", Visible: "True" },
  DriveListBox: { Enabled: "True", Visible: "True" },
  DirListBox: { Enabled: "True", Visible: "True" },
  FileListBox: { Pattern: "*.*", Enabled: "True", Visible: "True" },
};

const DEFAULT_SIZES = {
  Label: { w: 80, h: 20 }, TextBox: { w: 120, h: 24 }, CommandButton: { w: 95, h: 30 },
  CheckBox: { w: 100, h: 20 }, OptionButton: { w: 100, h: 20 }, ComboBox: { w: 120, h: 24 },
  ListBox: { w: 100, h: 80 }, Frame: { w: 160, h: 100 }, PictureBox: { w: 120, h: 80 },
  Image: { w: 80, h: 60 }, HScrollBar: { w: 120, h: 18 }, VScrollBar: { w: 18, h: 100 },
  Timer: { w: 32, h: 32 }, DataGrid: { w: 240, h: 140 }, Shape: { w: 80, h: 60 },
  Line: { w: 100, h: 2 }, DriveListBox: { w: 120, h: 24 }, DirListBox: { w: 120, h: 80 },
  FileListBox: { w: 120, h: 80 },
};

let idCounter = 0;

const bev = (inset) => inset
  ? { borderTop: "1px solid #808080", borderLeft: "1px solid #808080", borderBottom: "1px solid #fff", borderRight: "1px solid #fff" }
  : { borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderBottom: "1px solid #808080", borderRight: "1px solid #808080" };

const bev2 = (inset) => inset
  ? { borderTop: "1px solid #404040", borderLeft: "1px solid #404040", borderBottom: "1px solid #dfdfdf", borderRight: "1px solid #dfdfdf" }
  : { borderTop: "1px solid #dfdfdf", borderLeft: "1px solid #dfdfdf", borderBottom: "1px solid #404040", borderRight: "1px solid #404040" };

function Win31Button({ children, onClick, active, style, small, disabled }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button disabled={disabled}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      style={{
        background: "#c0c0c0", padding: small ? "1px 4px" : "2px 8px",
        fontSize: small ? 10 : 11, fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        cursor: disabled ? "default" : "default", opacity: disabled ? 0.5 : 1,
        outline: active ? "1px dotted #000" : "none",
        outlineOffset: -4, ...(pressed ? bev(true) : bev(false)), ...style
      }}
    >{children}</button>
  );
}

function RuntimeControl({ ctrl, runtimeState, onEvent, executing }) {
  const state = runtimeState[ctrl.name] || {};
  const props = { ...ctrl.props, ...state };
  const vis = props.Visible !== "False";
  if (!vis) return null;
  const s = {
    position: "absolute", left: ctrl.x, top: ctrl.y, width: ctrl.w, height: ctrl.h,
    fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: parseInt(props.FontSize) || 11,
    boxSizing: "border-box", overflow: "hidden"
  };
  const fire = (evt, extra) => onEvent(ctrl.name, ctrl.type, evt, extra);

  switch (ctrl.type) {
    case "Label": return <div style={{ ...s, color: props.ForeColor || "#000" }}>{props.Caption || ctrl.name}</div>;
    case "TextBox": return <input value={props.Text || ""} onChange={e => { onEvent(ctrl.name, ctrl.type, "Change", { Text: e.target.value }, true); }} onClick={() => fire("Click")} style={{ ...s, background: "#fff", border: "1px solid #808080", padding: "2px 4px", outline: "none", ...bev2(true) }} />;
    case "CommandButton": return <div onClick={() => fire("Click")} style={{ ...s, background: "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", ...bev(false), userSelect: "none" }} onMouseDown={e => { e.currentTarget.style.borderTopColor = "#808080"; e.currentTarget.style.borderLeftColor = "#808080"; e.currentTarget.style.borderBottomColor = "#fff"; e.currentTarget.style.borderRightColor = "#fff"; }} onMouseUp={e => { e.currentTarget.style.borderTopColor = "#fff"; e.currentTarget.style.borderLeftColor = "#fff"; e.currentTarget.style.borderBottomColor = "#808080"; e.currentTarget.style.borderRightColor = "#808080"; }}>{executing === ctrl.name ? "⏳..." : (props.Caption || ctrl.name)}</div>;
    case "CheckBox": {
      const checked = props.Value === "1 - Checked";
      return <div style={{ ...s, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => {
        const nv = checked ? "0 - Unchecked" : "1 - Checked";
        onEvent(ctrl.name, ctrl.type, "Click", { Value: nv }, true);
      }}><div style={{ width: 13, h: 13, minWidth: 13, minHeight: 13, background: "#fff", border: "1px solid #808080", ...bev2(true), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{checked ? "✓" : ""}</div><span>{props.Caption || ctrl.name}</span></div>;
    }
    case "OptionButton": {
      const sel = props.Value === "True";
      return <div style={{ ...s, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => {
        onEvent(ctrl.name, ctrl.type, "Click", { Value: "True" }, true);
      }}><div style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff", border: "1px solid #808080", display: "flex", alignItems: "center", justifyContent: "center" }}>{sel ? <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#000" }} /> : null}</div><span>{props.Caption || ctrl.name}</span></div>;
    }
    case "ComboBox": {
      const items = (props.Items || "").split("|").filter(Boolean);
      return <select value={props.Text || ""} onChange={e => onEvent(ctrl.name, ctrl.type, "Change", { Text: e.target.value }, true)} style={{ ...s, fontSize: parseInt(props.FontSize) || 11 }}>
        <option value="">{props.Text || ""}</option>
        {items.map((it, i) => <option key={i} value={it}>{it}</option>)}
      </select>;
    }
    case "ListBox": {
      const items = (props.Items || "").split("|").filter(Boolean);
      const selIdx = props.SelectedIndex != null ? parseInt(props.SelectedIndex) : -1;
      return <div style={{ ...s, background: "#fff", ...bev2(true), overflow: "auto" }}>
        {items.map((it, i) => <div key={i} onClick={() => onEvent(ctrl.name, ctrl.type, "Click", { SelectedIndex: String(i), SelectedItem: it }, true)} style={{ padding: "1px 4px", background: i === selIdx ? "#000080" : "transparent", color: i === selIdx ? "#fff" : "#000", cursor: "pointer", fontSize: 11 }}>{it}</div>)}
        {items.length === 0 && <div style={{ padding: 4, color: "#999", fontSize: 10 }}>(empty)</div>}
      </div>;
    }
    case "Frame": return <div style={{ ...s, border: "1px solid #808080", paddingTop: 14 }}><span style={{ position: "absolute", top: -8, left: 8, background: "#c0c0c0", padding: "0 4px", fontSize: 11 }}>{props.Caption || ctrl.name}</span></div>;
    case "DataGrid": {
      let cols = [], rows = [];
      try { cols = props.Columns ? JSON.parse(props.Columns) : []; } catch {}
      try { rows = props.Rows ? JSON.parse(props.Rows) : []; } catch {}
      return (
        <div style={{ ...s, background: "#fff", ...bev2(true), display: "flex", flexDirection: "column" }}>
          {cols.length > 0 && (
            <div style={{ display: "flex", background: "#c0c0c0", borderBottom: "1px solid #808080", fontSize: 10, fontWeight: "bold", flexShrink: 0 }}>
              {cols.map((c, i) => <div key={i} style={{ flex: 1, padding: "2px 4px", borderRight: i < cols.length - 1 ? "1px solid #808080" : "none", minWidth: 40 }}>{c}</div>)}
            </div>
          )}
          <div style={{ flex: 1, overflow: "auto" }}>
            {rows.map((row, ri) => (
              <div key={ri} style={{ display: "flex", borderBottom: "1px solid #e0e0e0", background: row._highlight ? "#ffffcc" : (ri % 2 === 0 ? "#fff" : "#f4f4f4") }}>
                {cols.map((c, ci) => <div key={ci} style={{ flex: 1, padding: "1px 4px", borderRight: ci < cols.length - 1 ? "1px solid #f0f0f0" : "none", fontSize: 10, minWidth: 40 }}>{row[c] ?? ""}</div>)}
              </div>
            ))}
            {rows.length === 0 && <div style={{ padding: 8, color: "#999", fontSize: 10 }}>(no data)</div>}
          </div>
        </div>
      );
    }
    case "HScrollBar": return <div style={{ ...s, background: "#c0c0c0", ...bev2(false) }}><input type="range" min={props.Min || 0} max={props.Max || 100} value={props.Value || 0} onChange={e => onEvent(ctrl.name, ctrl.type, "Change", { Value: e.target.value }, true)} style={{ width: "100%", height: "100%" }} /></div>;
    case "VScrollBar": return <div style={{ ...s, background: "#c0c0c0", ...bev2(false), display: "flex" }}><input type="range" min={props.Min || 0} max={props.Max || 100} value={props.Value || 0} orient="vertical" onChange={e => onEvent(ctrl.name, ctrl.type, "Change", { Value: e.target.value }, true)} style={{ writingMode: "bt-lr", WebkitAppearance: "slider-vertical", width: "100%", height: "100%" }} /></div>;
    case "PictureBox": return <div style={{ ...s, background: props.BackColor || "#c0c0c0", border: "1px solid #808080", ...bev2(true) }} />;
    case "Image": return <div style={{ ...s, background: "#e0e0e0", border: "1px dashed #808080", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#808080" }}>Image</div>;
    case "Shape": return <div style={{ ...s, border: `1px solid ${props.BorderColor || "#000"}`, background: "transparent" }} />;
    case "Line": return <div style={{ ...s, borderTop: `1px solid ${props.BorderColor || "#000"}`, height: 1 }} />;
    case "Timer": return null;
    case "DriveListBox": return <div style={{ ...s, background: "#fff", display: "flex", ...bev2(true) }}><div style={{ flex: 1, padding: "2px 3px", fontSize: 10 }}>💾 C:</div><div style={{ width: 18, background: "#c0c0c0", ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>▼</div></div>;
    case "DirListBox": return <div style={{ ...s, background: "#fff", ...bev2(true), padding: 2, fontSize: 10 }}><div>📁 C:\</div></div>;
    case "FileListBox": {
      const items = (props.Items || "").split("|").filter(Boolean);
      return <div style={{ ...s, background: "#fff", ...bev2(true), padding: 2, fontSize: 10 }}>
        {items.length > 0 ? items.map((f, i) => <div key={i} style={{ padding: "0 2px" }}>{f}</div>) : <div style={{ color: "#999" }}>(no files)</div>}
      </div>;
    }
    default: return <div style={{ ...s, border: "1px solid #808080", background: "#e0e0e0" }} />;
  }
}

function ControlRenderer({ ctrl }) {
  const s = {
    position: "absolute", left: ctrl.x, top: ctrl.y, width: ctrl.w, height: ctrl.h,
    fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11,
    boxSizing: "border-box", overflow: "hidden"
  };
  switch (ctrl.type) {
    case "Label": return <div style={{ ...s, color: "#000" }}>{ctrl.props?.Caption || ctrl.name}</div>;
    case "TextBox": return <div style={{ ...s, background: "#fff", border: "1px solid #808080", padding: "2px 3px", ...bev2(true) }}>{ctrl.props?.Text || ""}</div>;
    case "CommandButton": return <div style={{ ...s, background: "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", ...bev(false) }}>{ctrl.props?.Caption || ctrl.name}</div>;
    case "CheckBox": return <div style={{ ...s, display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 13, height: 13, background: "#fff", border: "1px solid #808080", ...bev2(true), flexShrink: 0 }} /><span>{ctrl.props?.Caption || ctrl.name}</span></div>;
    case "OptionButton": return <div style={{ ...s, display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff", border: "1px solid #808080", flexShrink: 0 }} /><span>{ctrl.props?.Caption || ctrl.name}</span></div>;
    case "ComboBox": return <div style={{ ...s, background: "#fff", display: "flex", ...bev2(true) }}><div style={{ flex: 1, padding: "2px 3px" }}></div><div style={{ width: 18, background: "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", ...bev(false), fontSize: 9 }}>▼</div></div>;
    case "ListBox": return <div style={{ ...s, background: "#fff", ...bev2(true), padding: 2 }}><div style={{ padding: "1px 3px", background: "#000080", color: "#fff" }}>Item1</div><div style={{ padding: "1px 3px" }}>Item2</div></div>;
    case "Frame": return <div style={{ ...s, border: "1px solid #808080", paddingTop: 12 }}><span style={{ position: "absolute", top: -7, left: 8, background: "#c0c0c0", padding: "0 4px", fontSize: 11 }}>{ctrl.props?.Caption || ctrl.name}</span></div>;
    case "PictureBox": return <div style={{ ...s, background: "#c0c0c0", border: "1px solid #808080", ...bev2(true) }} />;
    case "Image": return <div style={{ ...s, background: "#e0e0e0", border: "1px dashed #808080", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#808080" }}>Image</div>;
    case "HScrollBar": return <div style={{ ...s, background: "#c0c0c0", display: "flex", ...bev2(false) }}><div style={{ width: 16, height: "100%", ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>◀</div><div style={{ flex: 1 }} /><div style={{ width: 16, height: "100%", ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>▶</div></div>;
    case "VScrollBar": return <div style={{ ...s, background: "#c0c0c0", display: "flex", flexDirection: "column", ...bev2(false) }}><div style={{ height: 16, ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>▲</div><div style={{ flex: 1 }} /><div style={{ height: 16, ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>▼</div></div>;
    case "Timer": return <div style={{ ...s, border: "1px dashed #808080", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⏱</div>;
    case "DataGrid": return (
      <div style={{ ...s, background: "#fff", ...bev2(true), display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", background: "#c0c0c0", borderBottom: "1px solid #808080", fontSize: 10, fontWeight: "bold" }}>
          {["Col1", "Col2", "Col3"].map((c, i) => <div key={i} style={{ flex: 1, padding: "1px 4px", borderRight: "1px solid #808080" }}>{c}</div>)}
        </div>
        <div style={{ flex: 1, fontSize: 10 }}>
          {[1, 2, 3].map(r => <div key={r} style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>{[1, 2, 3].map(c => <div key={c} style={{ flex: 1, padding: "0 4px", borderRight: "1px solid #e0e0e0" }}>data</div>)}</div>)}
        </div>
      </div>
    );
    case "Shape": return <div style={{ ...s, border: "1px solid #000", background: "transparent" }} />;
    case "Line": return <div style={{ ...s, borderTop: "1px solid #000", height: 1 }} />;
    case "DriveListBox": return <div style={{ ...s, background: "#fff", display: "flex", ...bev2(true) }}><div style={{ flex: 1, padding: "2px 3px", fontSize: 10 }}>💾 C:</div><div style={{ width: 18, background: "#c0c0c0", ...bev(false), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>▼</div></div>;
    case "DirListBox": return <div style={{ ...s, background: "#fff", ...bev2(true), padding: 2, fontSize: 10 }}><div>📁 C:\</div><div style={{ paddingLeft: 12 }}>📂 Windows</div></div>;
    case "FileListBox": return <div style={{ ...s, background: "#fff", ...bev2(true), padding: 2, fontSize: 10 }}><div style={{ background: "#000080", color: "#fff", padding: "0 2px" }}>readme.txt</div><div style={{ padding: "0 2px" }}>setup.exe</div></div>;
    default: return <div style={{ ...s, border: "1px solid #808080" }} />;
  }
}

function SelectionHandles({ ctrl, onResize }) {
  const hSize = 6;
  const handles = [
    { cursor: "nw-resize", x: -hSize / 2, y: -hSize / 2, dx: -1, dy: -1 },
    { cursor: "n-resize", x: ctrl.w / 2 - hSize / 2, y: -hSize / 2, dx: 0, dy: -1 },
    { cursor: "ne-resize", x: ctrl.w - hSize / 2, y: -hSize / 2, dx: 1, dy: -1 },
    { cursor: "e-resize", x: ctrl.w - hSize / 2, y: ctrl.h / 2 - hSize / 2, dx: 1, dy: 0 },
    { cursor: "se-resize", x: ctrl.w - hSize / 2, y: ctrl.h - hSize / 2, dx: 1, dy: 1 },
    { cursor: "s-resize", x: ctrl.w / 2 - hSize / 2, y: ctrl.h - hSize / 2, dx: 0, dy: 1 },
    { cursor: "sw-resize", x: -hSize / 2, y: ctrl.h - hSize / 2, dx: -1, dy: 1 },
    { cursor: "w-resize", x: -hSize / 2, y: ctrl.h / 2 - hSize / 2, dx: -1, dy: 0 },
  ];
  return handles.map((h, i) => (
    <div key={i} onMouseDown={e => { e.stopPropagation(); onResize(e, h.dx, h.dy); }}
      style={{ position: "absolute", left: ctrl.x + h.x, top: ctrl.y + h.y, width: hSize, height: hSize, background: "#000", cursor: h.cursor, zIndex: 999 }} />
  ));
}

async function executeLLMPrompt(prompt, controls, runtimeState, triggerCtrl, triggerEvent, mode) {
  const controlContext = controls.map(c => {
    const st = runtimeState[c.name] || {};
    const merged = { ...c.props, ...st };
    return { name: c.name, type: c.type, properties: merged };
  });

  const systemPrompt = `You are the runtime engine for a Visual Basic-style application. The user has created a form with controls and written natural language prompts as event handlers.

Your job: interpret the prompt and return a JSON array of actions to perform on the form's controls.

AVAILABLE CONTROLS ON THE FORM:
${JSON.stringify(controlContext, null, 2)}

AVAILABLE ACTIONS (return as JSON array):
1. Set a property: {"action": "setProperty", "control": "<n>", "property": "<prop>", "value": "<val>"}
   - For Label: Caption, ForeColor, BackColor, Visible, FontSize
   - For TextBox: Text, Enabled, Visible, BackColor, ForeColor
   - For CommandButton: Caption, Enabled, Visible
   - For CheckBox: Caption, Value ("0 - Unchecked" or "1 - Checked"), Visible
   - For OptionButton: Caption, Value ("True"/"False"), Visible
   - For ComboBox: Text, Items (pipe-separated like "A|B|C"), Visible
   - For ListBox: Items (pipe-separated), SelectedIndex, Visible
   - For DataGrid: Columns (JSON array of strings), Rows (JSON array of objects keyed by column names; add _highlight: true to highlight a row), Caption
   - For HScrollBar/VScrollBar: Value, Min, Max
   - For FileListBox: Items (pipe-separated file names)
   - General: Visible ("True"/"False"), Caption, Text, Enabled

2. Show a message box: {"action": "msgBox", "message": "<text>", "title": "<title>"}

IMPORTANT RULES:
- Return ONLY a JSON array of actions. No markdown, no backticks, no explanation.
- For DataGrid Columns, always use a JSON array of column header strings: ["Name","Email","Phone"]
- For DataGrid Rows, use a JSON array of objects: [{"Name":"John","Email":"john@example.com","Phone":"555-1234"}]
- Always use the exact control names from the form.
- If the prompt asks to generate sample data, create realistic-looking data.
- If the prompt references a control that doesn't exist, use a msgBox action to show an error.`;

  const userMsg = `EVENT TRIGGERED: ${triggerCtrl}_${triggerEvent}
PROMPT/INSTRUCTION FOR THIS EVENT:
${prompt}

Return the JSON array of actions to execute:`;

  try {
    // In Claude artifacts, call Anthropic directly. Locally, use the proxy.
    const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    const apiUrl = isLocal
      ? "http://localhost:3001/api/messages"
      : "https://api.anthropic.com/v1/messages";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userMsg }]
      })
    });
    const data = await response.json();
    const text = data.content?.map(b => b.text || "").join("") || "[]";
    const clean = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error("LLM execution error:", err);
    return [{ action: "msgBox", message: `Error executing prompt: ${err.message}`, title: "Runtime Error" }];
  }
}

export default function PromptBasicIDE() {
  const [controls, setControls] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTool, setSelectedTool] = useState("Pointer");
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeEvent, setCodeEvent] = useState("");
  const [codeTarget, setCodeTarget] = useState("Form");
  const [eventHandlers, setEventHandlers] = useState({});
  const [dragState, setDragState] = useState(null);
  const [formName] = useState("Form1");
  const [projectName] = useState("Project1");
  const [runMode, setRunMode] = useState("prompt");
  const [isRunning, setIsRunning] = useState(false);
  const [runtimeState, setRuntimeState] = useState({});
  const [msgBox, setMsgBox] = useState(null);
  const [executingCtrl, setExecutingCtrl] = useState(null);
  const [logMessages, setLogMessages] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const formRef = useRef(null);

  const selected = controls.find(c => c.id === selectedId);

  const getTargetEvents = useCallback(() => {
    if (codeTarget === "Form") return EVENTS_BY_TYPE.Form || [];
    const ctrl = controls.find(c => c.name === codeTarget);
    return ctrl ? (EVENTS_BY_TYPE[ctrl.type] || []) : [];
  }, [codeTarget, controls]);

  const handlerKey = `${codeTarget}_${codeEvent}`;
  const currentPrompt = eventHandlers[handlerKey] || "";

  useEffect(() => {
    const evts = getTargetEvents();
    if (evts.length > 0 && !evts.includes(codeEvent)) setCodeEvent(evts[0]);
  }, [codeTarget, getTargetEvents]);

  const addLog = useCallback((msg) => {
    setLogMessages(prev => [...prev.slice(-50), { time: new Date().toLocaleTimeString(), msg }]);
  }, []);

  const handleRuntimeEvent = useCallback(async (ctrlName, ctrlType, eventName, directStateUpdate, isDirectUpdate) => {
    if (isDirectUpdate && directStateUpdate) {
      setRuntimeState(prev => ({ ...prev, [ctrlName]: { ...(prev[ctrlName] || {}), ...directStateUpdate } }));
    }
    const key = `${ctrlName}_${eventName}`;
    const prompt = eventHandlers[key];
    if (!prompt || !prompt.trim()) return;
    addLog(`▶ ${ctrlName}.${eventName} fired`);
    setExecutingCtrl(ctrlName);
    try {
      const actions = await executeLLMPrompt(prompt, controls, runtimeState, ctrlName, eventName, runMode);
      addLog(`✓ ${actions.length} action(s) returned`);
      for (const act of actions) {
        if (act.action === "setProperty") {
          setRuntimeState(prev => ({
            ...prev,
            [act.control]: { ...(prev[act.control] || {}), [act.property]: act.value }
          }));
          addLog(`  SET ${act.control}.${act.property} = ${typeof act.value === "string" ? act.value.substring(0, 60) : JSON.stringify(act.value).substring(0, 60)}...`);
        } else if (act.action === "msgBox") {
          setMsgBox({ message: act.message, title: act.title || "Message" });
          addLog(`  MSGBOX: ${act.message}`);
        }
      }
    } catch (err) {
      addLog(`✗ Error: ${err.message}`);
      setMsgBox({ message: `Runtime error: ${err.message}`, title: "Error" });
    }
    setExecutingCtrl(null);
  }, [eventHandlers, controls, runtimeState, runMode, addLog]);

  useEffect(() => {
    if (isRunning) {
      const loadKey = "Form_Load";
      if (eventHandlers[loadKey]?.trim()) {
        handleRuntimeEvent("Form", "Form", "Load");
      }
    }
  }, [isRunning]);

  const handleFormMouseDown = (e) => {
    if (isRunning) return;
    if (e.target !== formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (selectedTool !== "Pointer") {
      const sz = DEFAULT_SIZES[selectedTool] || { w: 80, h: 24 };
      const typeCount = controls.filter(c => c.type === selectedTool).length + 1;
      const name = `${selectedTool}${typeCount}`;
      const newCtrl = {
        id: `ctrl_${++idCounter}`, type: selectedTool, name,
        x: Math.round(x / 8) * 8, y: Math.round(y / 8) * 8,
        w: sz.w, h: sz.h, props: { ...DEFAULT_PROPS[selectedTool] }
      };
      if (newCtrl.props?.Caption && !["Frame"].includes(selectedTool)) newCtrl.props.Caption = name;
      setControls(prev => [...prev, newCtrl]);
      setSelectedId(newCtrl.id);
      setSelectedTool("Pointer");
    } else {
      setSelectedId(null);
    }
  };

  const handleControlMouseDown = (e, ctrl) => {
    e.stopPropagation();
    if (isRunning || selectedTool !== "Pointer") return;
    setSelectedId(ctrl.id);
    const rect = formRef.current.getBoundingClientRect();
    setDragState({ type: "move", id: ctrl.id, oX: e.clientX - rect.left - ctrl.x, oY: e.clientY - rect.top - ctrl.y });
  };

  const handleControlDblClick = (e, ctrl) => {
    e.stopPropagation();
    if (isRunning) return;
    setCodeTarget(ctrl.name);
    const evts = EVENTS_BY_TYPE[ctrl.type] || [];
    setCodeEvent(evts[0] || "Click");
    setCodeOpen(true);
  };

  const handleResize = (e, dx, dy) => {
    if (isRunning) return;
    setDragState({ type: "resize", id: selectedId, dx, dy, startX: e.clientX, startY: e.clientY, origCtrl: { ...selected } });
  };

  useEffect(() => {
    if (!dragState) return;
    const onMove = (e) => {
      if (dragState.type === "move") {
        const rect = formRef.current.getBoundingClientRect();
        let nx = Math.round((e.clientX - rect.left - dragState.oX) / 8) * 8;
        let ny = Math.round((e.clientY - rect.top - dragState.oY) / 8) * 8;
        setControls(prev => prev.map(c => c.id === dragState.id ? { ...c, x: Math.max(0, nx), y: Math.max(0, ny) } : c));
      } else if (dragState.type === "resize") {
        const { dx, dy, startX, startY, origCtrl } = dragState;
        const mx = e.clientX - startX, my = e.clientY - startY;
        let nx = origCtrl.x, ny = origCtrl.y, nw = origCtrl.w, nh = origCtrl.h;
        if (dx === 1) nw = Math.max(16, origCtrl.w + mx);
        if (dx === -1) { nw = Math.max(16, origCtrl.w - mx); nx = origCtrl.x + origCtrl.w - nw; }
        if (dy === 1) nh = Math.max(16, origCtrl.h + my);
        if (dy === -1) { nh = Math.max(16, origCtrl.h - my); ny = origCtrl.y + origCtrl.h - nh; }
        setControls(prev => prev.map(c => c.id === dragState.id ? { ...c, x: nx, y: ny, w: nw, h: nh } : c));
      }
    };
    const onUp = () => setDragState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragState]);

  const updateProp = (key, val) => {
    if (!selected) return;
    if (key === "(Name)") {
      setControls(prev => prev.map(c => c.id === selectedId ? { ...c, name: val } : c));
    } else {
      setControls(prev => prev.map(c => c.id === selectedId ? { ...c, props: { ...c.props, [key]: val } } : c));
    }
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Delete" && selectedId && !codeOpen && !isRunning) { setControls(prev => prev.filter(c => c.id !== selectedId)); setSelectedId(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, codeOpen, isRunning]);

  const startRun = () => {
    setRuntimeState({});
    setLogMessages([]);
    setIsRunning(true);
    setSelectedId(null);
    addLog("▶ Program started");
  };

  const stopRun = () => {
    setIsRunning(false);
    setExecutingCtrl(null);
    addLog("⏹ Program stopped");
  };

  const propsForSelected = selected ? { "(Name)": selected.name, ...selected.props } : null;
  const handlersCount = Object.values(eventHandlers).filter(v => v.trim()).length;

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: "#c0c0c0", fontFamily: "'MS Sans Serif', Tahoma, sans-serif", overflow: "hidden", userSelect: "none" }}>
      <div style={{ background: "#000080", color: "#fff", padding: "2px 8px", fontSize: 12, fontWeight: "bold", display: "flex", alignItems: "center" }}>
        <span style={{ flex: 1 }}>PromptBasic — [{projectName}]{isRunning ? " [Running]" : ""}</span>
        <span style={{ fontSize: 10, fontWeight: "normal", opacity: 0.8 }}>Visual Prompt Development Environment</span>
      </div>
      <div style={{ display: "flex", background: "#c0c0c0", padding: "1px 0", borderBottom: "1px solid #808080", fontSize: 11 }}>
        {["File", "Edit", "View", "Insert", "Run", "Debug", "Options", "Window", "Help"].map(m => (
          <div key={m} style={{ padding: "2px 8px", cursor: "default" }}
            onMouseEnter={e => { e.target.style.background = "#000080"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#000"; }}>{m}</div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", background: "#c0c0c0", padding: "2px 4px", gap: 2, borderBottom: "1px solid #808080", ...bev(false) }}>
        <Win31Button small disabled={isRunning}>📄</Win31Button>
        <Win31Button small disabled={isRunning}>💾</Win31Button>
        <Win31Button small disabled={isRunning}>📂</Win31Button>
        <div style={{ width: 1, height: 20, background: "#808080", margin: "0 4px" }} />
        <Win31Button small onClick={() => setCodeOpen(!codeOpen)} disabled={isRunning}>{"{ }"}</Win31Button>
        <Win31Button small onClick={() => setShowLog(!showLog)}>📋</Win31Button>
        <div style={{ width: 1, height: 20, background: "#808080", margin: "0 4px" }} />
        <Win31Button small onClick={startRun} disabled={isRunning} style={{ background: isRunning ? "#c0c0c0" : "#90EE90" }}>▶ Run</Win31Button>
        <Win31Button small onClick={stopRun} disabled={!isRunning} style={{ background: !isRunning ? "#c0c0c0" : "#FFB0B0" }}>⏹ Stop</Win31Button>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
          <span>Mode:</span>
          <label style={{ cursor: "default" }}><input type="radio" name="rm" checked={runMode === "prompt"} onChange={() => setRunMode("prompt")} disabled={isRunning} style={{ marginRight: 2 }} />Live</label>
          <label style={{ cursor: "default" }}><input type="radio" name="rm" checked={runMode === "compile"} onChange={() => setRunMode("compile")} disabled={isRunning} style={{ marginRight: 2 }} />Compile</label>
        </div>
        <div style={{ width: 8 }} />
        <div style={{ ...bev(true), padding: "1px 6px", fontSize: 10, background: isRunning ? "#fffff0" : "#c0c0c0", minWidth: 100, textAlign: "center" }}>
          {isRunning ? (executingCtrl ? `⏳ Executing ${executingCtrl}...` : "🟢 Running") : (selected ? `${selected.x}, ${selected.y}  ${selected.w}×${selected.h}` : "Ready")}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {!isRunning && (
          <div style={{ width: 55, background: "#c0c0c0", ...bev(false), display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ background: "#000080", color: "#fff", padding: "2px 4px", fontSize: 10, textAlign: "center", fontWeight: "bold" }}>Tools</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, padding: 2, overflow: "auto" }}>
              {CONTROLS.map(c => (
                <div key={c.type} title={c.label} onClick={() => setSelectedTool(c.type)}
                  style={{
                    width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, cursor: "default", background: selectedTool === c.type ? "#e0e0e0" : "#c0c0c0",
                    ...(selectedTool === c.type ? bev(true) : bev(false))
                  }}>{c.icon}</div>
              ))}
            </div>
          </div>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: 1, background: "#808080", overflow: "auto", padding: 8, display: "flex", flexDirection: "column" }}>
              <div style={{ background: "#000080", color: "#fff", padding: "2px 6px", fontSize: 11, display: "flex", alignItems: "center", ...bev(false) }}>
                <span style={{ flex: 1, fontWeight: "bold" }}>{isRunning ? `${formName} [Running]` : `${projectName} - ${formName} [Form]`}</span>
                {isRunning && <span style={{ fontSize: 10, marginRight: 8, color: "#90EE90" }}>● LIVE</span>}
              </div>
              {!isRunning && (
                <div style={{ background: "#000080", padding: "1px 4px", display: "flex", gap: 8, fontSize: 10, color: "#fff", borderBottom: "1px solid #404040" }}>
                  {["File", "Edit", "View", "Help"].map(m => <span key={m} style={{ cursor: "default" }}>{m}</span>)}
                </div>
              )}
              <div ref={formRef} onMouseDown={handleFormMouseDown}
                style={{
                  flex: 1, background: "#c0c0c0", position: "relative", minHeight: 300,
                  ...(!isRunning ? { backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "8px 8px" } : {}),
                  cursor: !isRunning && selectedTool !== "Pointer" ? "crosshair" : "default",
                  ...bev(false)
                }}>
                {isRunning ? (
                  controls.map(ctrl => (
                    <RuntimeControl key={ctrl.id} ctrl={ctrl} runtimeState={runtimeState} onEvent={handleRuntimeEvent} executing={executingCtrl} />
                  ))
                ) : (
                  controls.map(ctrl => (
                    <div key={ctrl.id}
                      onMouseDown={e => handleControlMouseDown(e, ctrl)}
                      onDoubleClick={e => handleControlDblClick(e, ctrl)}
                      style={{ position: "absolute", left: 0, top: 0, cursor: selectedTool === "Pointer" ? "move" : "crosshair" }}>
                      <ControlRenderer ctrl={ctrl} />
                      {selectedId === ctrl.id && (
                        <div style={{ position: "absolute", left: ctrl.x - 1, top: ctrl.y - 1, width: ctrl.w + 2, height: ctrl.h + 2, border: "1px dashed #000", pointerEvents: "none" }} />
                      )}
                    </div>
                  ))
                )}
                {!isRunning && selected && <SelectionHandles ctrl={selected} onResize={handleResize} />}
              </div>
            </div>
            {!isRunning && (
              <div style={{ width: 210, background: "#c0c0c0", display: "flex", flexDirection: "column", ...bev(false), flexShrink: 0, overflow: "hidden" }}>
                <div style={{ background: "#000080", color: "#fff", padding: "2px 4px", fontSize: 10, fontWeight: "bold" }}>Properties</div>
                <div style={{ padding: 3, borderBottom: "1px solid #808080" }}>
                  <select value={selectedId || ""} onChange={e => setSelectedId(e.target.value || null)}
                    style={{ width: "100%", fontSize: 11, ...bev2(true), background: "#fff", padding: "1px 2px" }}>
                    <option value="">{formName} Form</option>
                    {controls.map(c => <option key={c.id} value={c.id}>{c.name} {c.type}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, overflow: "auto", fontSize: 10 }}>
                  {propsForSelected ? Object.entries(propsForSelected).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
                      <div style={{ width: 85, padding: "1px 4px", borderRight: "1px solid #c0c0c0", background: "#e8e8e8", fontWeight: k === "(Name)" ? "bold" : "normal", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k}</div>
                      <input value={v} onChange={e => updateProp(k, e.target.value)}
                        style={{ flex: 1, border: "none", padding: "1px 3px", fontSize: 10, outline: "none", background: "#fff", minWidth: 0 }} />
                    </div>
                  )) : (
                    <div style={{ padding: 8, color: "#808080" }}><div style={{ fontWeight: "bold" }}>{formName}</div></div>
                  )}
                </div>
              </div>
            )}
          </div>
          {codeOpen && !isRunning && (
            <div style={{ height: 240, background: "#c0c0c0", borderTop: "2px solid #808080", display: "flex", flexDirection: "column", flexShrink: 0 }}>
              <div style={{ background: "#000080", color: "#fff", padding: "2px 6px", fontSize: 11, display: "flex", alignItems: "center" }}>
                <span style={{ flex: 1, fontWeight: "bold" }}>{formName} - Prompt Code</span>
                <span onClick={() => setCodeOpen(false)} style={{ cursor: "default", padding: "0 4px" }}>×</span>
              </div>
              <div style={{ display: "flex", gap: 4, padding: "4px 6px", borderBottom: "1px solid #808080", alignItems: "center" }}>
                <select value={codeTarget} onChange={e => setCodeTarget(e.target.value)}
                  style={{ flex: 1, fontSize: 11, ...bev2(true), background: "#fff", padding: 1 }}>
                  <option value="Form">{formName} (Form)</option>
                  {controls.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <select value={codeEvent} onChange={e => setCodeEvent(e.target.value)}
                  style={{ flex: 1, fontSize: 11, ...bev2(true), background: "#fff", padding: 1 }}>
                  {getTargetEvents().map(ev => <option key={ev} value={ev}>{ev}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", margin: "0 6px 6px 6px", ...bev2(true), background: "#fff" }}>
                <div style={{ padding: "3px 8px", fontSize: 11, fontFamily: "'Courier New', monospace", color: "#000080", borderBottom: "1px solid #e0e0e0", background: "#f8f8ff" }}>
                  <span style={{ color: "#0000aa" }}>Sub</span> {codeTarget}_{codeEvent} ()
                </div>
                <div style={{ padding: "3px 8px", fontSize: 9, color: "#808080", background: "#fffff0", borderBottom: "1px solid #e0e0e0" }}>
                  💬 Describe what this event should do in natural language:
                </div>
                <textarea value={currentPrompt}
                  onChange={e => setEventHandlers(prev => ({ ...prev, [handlerKey]: e.target.value }))}
                  placeholder={'Example: "Fill DataGrid1 with 10 sample customers with Name, Email, and Phone. Highlight rows where email contains \'gmail\'."'}
                  style={{ flex: 1, border: "none", outline: "none", resize: "none", padding: 8, fontSize: 12, fontFamily: "'Courier New', monospace", lineHeight: 1.5, color: "#008000", background: "#fff" }} />
                <div style={{ padding: "3px 8px", fontSize: 11, fontFamily: "'Courier New', monospace", color: "#000080", borderTop: "1px solid #e0e0e0", background: "#f8f8ff" }}>
                  <span style={{ color: "#0000aa" }}>End Sub</span>
                </div>
              </div>
            </div>
          )}
          {showLog && (
            <div style={{ height: 120, background: "#c0c0c0", borderTop: "2px solid #808080", display: "flex", flexDirection: "column", flexShrink: 0 }}>
              <div style={{ background: "#000080", color: "#fff", padding: "2px 6px", fontSize: 11, display: "flex", alignItems: "center" }}>
                <span style={{ flex: 1, fontWeight: "bold" }}>Immediate Window</span>
                <span onClick={() => setShowLog(false)} style={{ cursor: "default", padding: "0 4px" }}>×</span>
              </div>
              <div style={{ flex: 1, background: "#fff", ...bev2(true), margin: "0 6px 6px 6px", overflow: "auto", padding: 4, fontFamily: "'Courier New', monospace", fontSize: 10 }}>
                {logMessages.map((l, i) => <div key={i}><span style={{ color: "#808080" }}>[{l.time}]</span> {l.msg}</div>)}
                {logMessages.length === 0 && <div style={{ color: "#999" }}>No output yet. Click ▶ Run to start.</div>}
              </div>
            </div>
          )}
        </div>
      </div>
      {msgBox && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ background: "#c0c0c0", minWidth: 280, maxWidth: 420, ...bev(false), display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#000080", color: "#fff", padding: "2px 8px", fontSize: 11, fontWeight: "bold" }}>{msgBox.title}</div>
            <div style={{ padding: "16px 20px", fontSize: 12, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 24 }}>ℹ️</span>
              <span style={{ flex: 1, lineHeight: 1.4 }}>{msgBox.message}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 16px 12px" }}>
              <Win31Button onClick={() => setMsgBox(null)} style={{ minWidth: 70 }}>OK</Win31Button>
            </div>
          </div>
        </div>
      )}
      <div style={{ background: "#c0c0c0", borderTop: "1px solid #fff", padding: "2px 8px", fontSize: 10, display: "flex", gap: 16 }}>
        <span>{controls.length} control(s)</span>
        <span>{handlersCount} prompt handler(s)</span>
        <span>Mode: {runMode === "prompt" ? "Live Prompt" : "Pre-Compile"}</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: isRunning ? "#008000" : "#000" }}>{isRunning ? "● RUNNING" : (selectedTool !== "Pointer" ? `Drawing: ${selectedTool}` : "Ready")}</span>
      </div>
    </div>
  );
}
