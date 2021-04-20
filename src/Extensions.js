import React, {useContext} from 'react';
import DataContext from './DataContext.js';
import ExclusiveSelection from './ExclusiveSelection.js';

function getExtensions(data, apiName) {
  const extensions = new Set();
  for (const category of data.categories) {
    const api = category.api[apiName];
    if (api) {
      for (const extension of Object.keys(api.extensions)) {
        extensions.add(extension);
      }
    }
  }
  return [...extensions.keys()];
}

export default function Extensions(props) {
  const {data, apiName, extensionName, setExtensionName} = useContext(DataContext);
  return (
    <div>
      <div className="heading">Extensions</div>
      <div>
        <ExclusiveSelection
          id="extensions"
          items={getExtensions(data, apiName)}
          onSelect={setExtensionName}
          currentItem={extensionName}
        />
      </div>
    </div>
  );
}