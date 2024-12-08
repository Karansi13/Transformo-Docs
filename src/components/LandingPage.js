"use client";
import React from "react";
import Image from 'next/image';
import { ReactComponent as Container } from "public/assets/Container.svg";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm fixed w-full z-50">
        <a href="#" className="text-2xl font-bold text-gray-800">
          TransformoDocs
        </a>
        <ul className="hidden md:flex space-x-8">
          <li>
            <a href="#home" className="text-gray-600 hover:text-black">
              Home
            </a>
          </li>
          <li>
            <a href="#platform" className="text-gray-600 hover:text-black">
              Platform
            </a>
          </li>
          <li>
            <a href="#uses" className="text-gray-600 hover:text-black">
              Uses
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-600 hover:text-black">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-600 hover:text-black">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className="px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
          >
            Sign Up
          </a>
        </div>
      </div>


      <div className="relative bg-white h-screen flex items-center justify-center">
        {/* SVG Overlay */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src="/assets/Container.svg"
            alt="Background Icon"
            layout="fill"
            objectFit="contain"
          />
        </div>


    
      {/* Hero Section Content */}
  <div
    id="home"
    className="flex flex-col items-center justify-center h-screen py-9 pt-9 md:px-12"
  >
    <h1 className="text-3xl md:text-5xl text-black font-bold text-center mb-6 leading-snug">
      Automate workflows for data <br/> extraction 
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> powered by AI</span>
    </h1>
    <p className="text-center text-gray-900 max-w-2xl mb-8 leading-relaxed">
      Serve dynamic landing page content based on users' UTM, geolocation, or
      device and improve quality scores, engagement, and conversion rates.
    </p>
    <div className="flex space-x-4">
      <a
        href="#get-started"
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Get Started
      </a>
      <a
        href="#trial"
        className="px-6 py-3 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100"
      >
        Trial
      </a>
    </div>
  </div>
</div>


      {/* Trusted By Section */}
      <div id="platform" className="py-9  bg-white text-center">
        <h2 className="text-lg font-bold text-black mb-4">
          Trusted By Ministries
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 px-6">
          {Array(8)
            .fill("Zenith")
            .map((company, index) => (
              <span
                key={index}
                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-600"
              >
                {company}
              </span>
            ))}
        </div>
        <a
          href="#all"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        > View All
        </a>
      </div>

      {/* Features Section */}
      <div id="uses" className="py-9 bg-gray-50 text-center">
        <a
          href="#how-to-use"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 mb-6"
        >
          How To Use
        </a>
        <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">
          Beyond Traditional Document <br/> Management
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          In a world drowning in unstructured data, TransformoDocs brings
          clarity, accessibility, and intelligence to your documents.
        </p>
      </div>

      {/* Icons Section */}
      <div id="icons" className="py-12 bg-white">
  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-7 gap-6 px-6">
    {[
      { title: "AI", icon: "🤖" },
      { title: "Forms", icon: "📝" },
      { title: "Edit Doc", icon: "✍️" },
      { title: "Docs", icon: "📄" },
      { title: "Extraction", icon: "📤" },
      { title: "Chat Bot", icon: "💬" },
      { title: "Projects", icon: "📊" },
    ].map((feature, index) => (
      <div
        key={index}
        className="flex flex-col items-center space-y-2 text-center"
      >
        <span className="text-5xl">{feature.icon}</span>
        <h4 className="font-bold text-gray-700">{feature.title}</h4>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}
