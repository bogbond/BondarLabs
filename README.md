# Bondar Labs — Eleventy site

## Requirements
- Node.js 18+

## Install
```bash
npm install
```

## Run locally (dev server)
```bash
npm run dev
```
Then open: http://localhost:8080/

## Build
```bash
npm run build
```
Output goes to `/_site`.

## Before launch
- Update `src/_data/site.json`:
  - `baseUrl`
  - `gtmId` (create a new container)
  - `formsubmitEmail` (your inbox)
- (Optional) Replace placeholder social links in `src/_data/company.json`.

