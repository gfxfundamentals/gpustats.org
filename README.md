# [gpustats.org](https://gpustats.org)

** NOTE: The site is not currently functional! **

The source for [gpustats.org](https://gpustats.org)

## Search parameters

* `api`

  one of `webgl`, `webgl2`, `webgpu`

* `featureName`

  a string of the api dependent feature name to show

* `extensionName`

  a string of the api dependent extension to show

* `platforms`

  a comma separated list of platforms to filter. Valid platforms
  are `windows10`, `mac`, `android`, `ios`, `linux`, `other`

* `browsers`

  a comma separated list of browsers to filter. Valid browsers
  are `firefox`, `chrome`, `safari`, `other`

## Dev Instructions

```
git clone https://github.com/gfxfundamentals/gpustats.org.git
cd gpustats.org
npm install
npm start
```

## extra search parameters

* `data`

  which data to load

  * `test` loads `test-data.json`
  * `error` loads a non-existent file
  * `sample` loads runtime generated random sample data
  * empty loads `data.json`

## Design

At the moment the site assumes no database. All the data
for a year fits in under 400k (120k gzipped) so it seemed
silly to query the data instead of just serve the entire thing.

If more info is added though that might need to change.
