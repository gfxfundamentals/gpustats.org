import React, {useContext} from 'react';
import DataContext from './DataContext.js';
import MultipleSelection from './MultipleSelection.js';
import {getBrowsers, getPlatforms} from './data-utils.js';

export default function Filters(props) {
  const {data, selectedPlatforms, selectedBrowsers, setPlatformFilter, setBrowserFilter} = useContext(DataContext);

  const platforms = getPlatforms(data);
  const browsers = getBrowsers(data);

  return (
    <React.Fragment>
      <div className="heading">Filters</div>
      <div>
        <div className="indent">
          <div className="subheading">Platform</div>
          <MultipleSelection id="platforms" items={platforms} selectedItems={selectedPlatforms} onSelect={setPlatformFilter} />
        </div>
        <div className="indent">
          <div className="subheading">Browsers</div>
          <MultipleSelection id="browsers" items={browsers} selectedItems={selectedBrowsers} onSelect={setBrowserFilter} />
        </div>
      </div>
    </React.Fragment>
  );
}