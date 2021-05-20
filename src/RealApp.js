import React, {useState, useEffect} from 'react';
import {useSet} from 'react-use';
import * as d3 from 'd3';
import APIs from './APIs.js';
import AreaChart from './AreaChart.js';
import DataContext from './DataContext.js';
import {getBrowsers, getPlatforms} from './data-utils.js';
import Extensions from './Extensions.js';
import Filters from './Filters.js';
import Features from './Features.js';

const colors = i => d3.interpolatePiYG(i % 10 / 10).replace('rgb', 'rgba').replace(')', ',0.8)');

function initSetFromString(str = '', validValues) {
  const initialValues = str.split(',').filter(s => validValues.includes(s));
  return new Set(initialValues.length ? initialValues : validValues);
}

export default function RealApp (props) {
  const {data} = props;
  const q = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  const [apiName, setAPIName] = useState(q.api || 'webgl');
  const [featureName, setFeatureName] = useState(q.featureName || '');
  const [extensionName, setExtensionName] = useState(q.extensionName || '');
  const [dataParam, setDataParam] = useState(q.data || '');

  const allPlatforms = getPlatforms(data);
  const allBrowsers = getBrowsers(data);

  // not sure what the best model is here
  const [showFeature, setShowFeature] = useState(true);
  const [selectedPlatforms, selectedPlatformsSetAPI] = useSet(initSetFromString(q.platforms, allPlatforms));
  const [selectedBrowsers, selectedBrowsersSetAPI] = useSet(initSetFromString(q.browsers, allBrowsers));
  //const [set, { add, has, remove, toggle, reset }] = useSet(new Set(['hello']));

  const handlePopState = () => {
    const q = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    setDataParam(q.data || '')
    setAPIName(q.api || 'webgl');
    setFeatureName(q.featureName || '');
    setExtensionName(q.extensionName || '');
    selectedPlatformsSetAPI.reset();
    (q.platforms || allPlatforms.join(',')).split(',').forEach(p => selectedPlatformsSetAPI.add(p));
    selectedBrowsersSetAPI.reset();
    (q.browsers || allBrowsers.join(',')).split(',').forEach(p => selectedBrowsersSetAPI.add(p));
  };

  useEffect(() => {
    const q = {
      ...(dataParam && {data: dataParam}),
      api: apiName,
      ...(showFeature && featureName && {featureName}),
      ...(showFeature && extensionName && {extensionName}),
      ...(selectedPlatforms.size !== allPlatforms.length && {features: [...selectedPlatforms].join(',')}),
      ...(selectedBrowsers.size !== allBrowsers.length && {browsers: [...selectedBrowsers].join(',')}),
    }
    const params = new URLSearchParams(q);
    const url = new URL(window.location.href);
    url.search = params.toString();
    if (url.href !== window.location.href) {
      console.log('pushState:', url.href, window.location.href);
      window.history.pushState({}, '', url.href);
    }
  });

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  });

  // not sure what the best model is here
  const setFeatureNameImpl = name => {
    setFeatureName(showFeature && name === featureName ? '' : name);
    //setExtensionName('');
    setShowFeature(true);
  };
  const setExtensionNameImpl = name => {
    //setFeatureName('');
    setExtensionName(!showFeature && name === extensionName ? '' : name);
    setShowFeature(false);
  };

  const setBrowserFilter = (name) => {
    selectedBrowsersSetAPI.toggle(name);
  };

  const setPlatformFilter = (name) => {
    selectedPlatformsSetAPI.toggle(name);
  };

  const filter = category => selectedBrowsers.has(category.browser) && selectedPlatforms.has(category.platform);

  return (
    <DataContext.Provider value={{
      data,
      apiName,
      // meh!
      featureName: showFeature ? featureName : '',
      extensionName: showFeature ? '' : extensionName,
      showFeature,
      setAPIName,
      setFeatureName: setFeatureNameImpl,
      setExtensionName: setExtensionNameImpl,
      selectedBrowsers,
      selectedPlatforms,
      setPlatformFilter,
      setBrowserFilter,
      colors,
      filter,
    }}>
      <div className="main">
        <div className="left layout-scrollbar">
          <div className="menu">
            <APIs />
            <Filters />
            <Features />
            <Extensions />
          </div>
        </div>
        <div className="right layout-scrollbar">
          <div className="charts">
            <AreaChart />
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
}

