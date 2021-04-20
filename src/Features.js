import React, {useContext} from 'react';
import DataContext from './DataContext.js';
import ExclusiveSelection from './ExclusiveSelection.js';

function getFeatures(data, apiName) {
  const features = new Set();
  for (const category of data.categories) {
    const api = category.api[apiName];
    if (api) {
      for (const feature of Object.keys(api.features)) {
        features.add(feature);
      }
    }
  }
  return [...features.keys()];
}

export default function Features(props) {
  const {data, apiName, featureName, setFeatureName} = useContext(DataContext);
  return (
    <div>
      <div className="heading">Features</div>
      <div>
        <ExclusiveSelection
          id="features"
          items={getFeatures(data, apiName)}
          onSelect={setFeatureName}
          currentItem={featureName}
        />
      </div>
    </div>
  );
}