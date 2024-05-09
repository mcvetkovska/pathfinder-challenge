import { useEffect, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { FoundPath } from "./FoundPath";
import { sampleMaps } from "./pathFinder/utils";
import "./App.css";

function App() {
  const [map, setMap] = useState(sampleMaps[0]);
  const [resetError, reset] = useState(false);

  useEffect(() => {
    reset((err) => !err);
  }, [map]);

  return (
    <div>
      <h3>Sample Maps</h3>
      <div className="sample_maps">
        {sampleMaps.map((sampleMap) => (
          <pre
            key={sampleMap}
            className={`map ${sampleMap === map ? "selected" : ""}`}
            onClick={() => setMap(sampleMap)}
          >
            {sampleMap}
          </pre>
        ))}
      </div>
      <ErrorBoundary resetError={resetError}>
        <FoundPath map={map} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
