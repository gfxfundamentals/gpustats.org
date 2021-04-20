import React, {useContext} from 'react';
import DataContext from './DataContext.js';
import ExclusiveSelection from './ExclusiveSelection.js';

function getAPIs(data) {
  const apis = new Set();
  for (const category of data.categories) {
    for (const name of Object.keys(category.api)) {
      apis.add(name);
    }
  }
  return [...apis.keys()];
}

export default function APIs(props) {
  const {data, setAPIName, apiName} = useContext(DataContext);
  return (
    <div>
      <div className="heading">API</div>
      <div>
        <ExclusiveSelection
          id="apis"
          items={getAPIs(data)}
          onSelect={setAPIName}
          currentItem={apiName}
        />
      </div>
    </div>
  );
}