import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PageWrapper from "./UI/pageWapper/PageWrapper";

import i18nHttpApi from 'i18next-http-backend';
import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(i18nHttpApi)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en','de'],
        fallbackLng: "en",
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json'
        },

        detection: {
            order: ['cookie', 'localStorage', 'navigator'],
            caches: ['cookie','localStorage']
        },
        debug: true
    });


ReactDOM.render(
    <Suspense fallback={<div/>}>
  <React.StrictMode>
      <PageWrapper>
    <App />
      </PageWrapper>
  </React.StrictMode>
    </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
