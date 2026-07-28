import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "./router";
import { AuthProvider } from "./auth";
import { AdminPage } from "./admin";
import { AgenciesPage, DihPage, Home, PartnerPage } from "./public-pages";
import { LoginPage } from "./login";
import { PortalPage } from "./portal";
import { AdminReviewPage, PortalReviewPage } from "./review";
import "./styles.css";

function App(){return <AuthProvider><Routes><Route path="/" element={<Home/>}/><Route path="/artistas/dih-ribeiro" element={<DihPage/>}/><Route path="/partner" element={<PartnerPage/>}/><Route path="/agencias" element={<AgenciesPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/portal" element={<PortalPage/>}/><Route path="/admin" element={<AdminPage/>}/>{import.meta.env.DEV&&<Route path="/review/portal" element={<PortalReviewPage/>}/>} {import.meta.env.DEV&&<Route path="/review/admin" element={<AdminReviewPage/>}/>}<Route path="*" element={<Navigate to="/" replace/>}/></Routes></AuthProvider>}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
