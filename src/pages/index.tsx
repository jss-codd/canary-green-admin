// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { useEffect } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import MainPage from '../components/Mainpage';
import Sidebar from '../components/Sidebar';
// import Barchart from "../components/Graph/Barchart";
import BarCharts from '../components/Graph/BarCharts';
import MapChart from '../components/Maps/MapChart';
import Link from 'next/link';
import Maps from './Maps';
import Login from './login';

function IndexPage() {
  return <Login />;
}
export default IndexPage;
