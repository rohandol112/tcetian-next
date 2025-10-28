'use client'

import Link from 'next/link';
import { ArrowRight, Calendar, MessageSquare, Sparkles, Users, Zap, BarChart3, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Hero Section - Animated Light Design */}
      <section className="relative pt-24 pb-32">
        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Announcement - Animated */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-700 font-medium">New events launching this semester!</span>
              <Link href="/events" className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center gap-1">
                View Events
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Main Headline - Staggered Animation */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your{' '}
              </motion.span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Campus
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Connection Hub
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Discover events, connect with peers, and stay engaged with your college community
            </motion.p>

            {/* CTA Buttons - Animated */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all inline-flex items-center gap-2">
                  Start Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.button
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition border-2 border-gray-200 hover:border-gray-300 inline-flex items-center gap-2 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LEARN MORE
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Heading */}
      <section className="pb-20">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Section Heading - Stripe Style */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">BY THE NUMBERS</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              TCET&apos;s Most Active
              <br />
              <span className="relative inline-block">
                Student Community
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                >
                  <motion.path
                    d="M2 10C50 2 100 2 150 6C200 10 250 10 298 6"
                    stroke="url(#paint0_linear)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="0.5" stopColor="#8B5CF6"/>
                      <stop offset="1" stopColor="#EC4899"/>
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Card 1 - Light Blue - Animated */}
            <motion.div
              className="relative group cursor-default"
              initial={{ opacity: 0, y: 50, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ rotate: 0, scale: 1.05, y: -10 }}
            >
              {/* Realistic tape */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm transform rotate-2 shadow-md border border-yellow-300/50 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              {/* Main soft gradient card */}
              <motion.div
                className="bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400 rounded-xl p-8 shadow-2xl relative min-h-[200px] flex flex-col justify-between"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
              >
                {/* Push pin */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-xl border-2 border-red-700" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-gradient-to-br from-red-300 to-red-500 rounded-full" />
                </motion.div>
                
                <motion.div
                  className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                >
                  500+
                </motion.div>
                <div className="text-base text-white/95 font-bold uppercase tracking-wider drop-shadow-lg">
                  Events This<br />Semester
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 - Light Purple/Pink - Animated */}
            <motion.div
              className="relative group cursor-default"
              initial={{ opacity: 0, y: 50, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.05, y: -10 }}
            >
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm transform -rotate-3 shadow-md border border-yellow-300/50 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              />
              <motion.div
                className="bg-gradient-to-br from-purple-300 via-purple-400 to-pink-400 rounded-xl p-8 shadow-2xl relative min-h-[200px] flex flex-col justify-between"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)" }}
              >
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-xl border-2 border-orange-700" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full" />
                </motion.div>
                
                <motion.div
                  className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                >
                  10K+
                </motion.div>
                <div className="text-base text-white/95 font-bold uppercase tracking-wider drop-shadow-lg">
                  Active<br />Students
                </div>
              </motion.div>
            </motion.div>

            {/* Card 3 - Light Teal/Cyan - Animated */}
            <motion.div
              className="relative group cursor-default"
              initial={{ opacity: 0, y: 50, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.05, y: -10 }}
            >
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm transform rotate-3 shadow-md border border-yellow-300/50 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />
              <motion.div
                className="bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-400 rounded-xl p-8 shadow-2xl relative min-h-[200px] flex flex-col justify-between"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.5)" }}
              >
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-xl border-2 border-indigo-700" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full" />
                </motion.div>
                
                <motion.div
                  className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
                >
                  50+
                </motion.div>
                <div className="text-base text-white/95 font-bold uppercase tracking-wider drop-shadow-lg">
                  Student<br />Clubs
                </div>
              </motion.div>
            </motion.div>

            {/* Card 4 - Light Orange/Yellow - Animated */}
            <motion.div
              className="relative group cursor-default"
              initial={{ opacity: 0, y: 50, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ rotate: 0, scale: 1.05, y: -10 }}
            >
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm transform -rotate-2 shadow-md border border-yellow-300/50 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <motion.div
                className="bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-400 rounded-xl p-8 shadow-2xl relative min-h-[200px] flex flex-col justify-between"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)" }}
              >
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full shadow-xl border-2 border-violet-700" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-gradient-to-br from-purple-300 to-violet-500 rounded-full" />
                </motion.div>
                
                <motion.div
                  className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                >
                  24/7
                </motion.div>
                <div className="text-base text-white/95 font-bold uppercase tracking-wider drop-shadow-lg">
                  Community<br />Active
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Tagline - Animated */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold text-xl"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% auto' }}
            >
              BUILT FOR TCET STUDENTS, BY TCET STUDENTS
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Campus Life Carousel - Stripe x Juspay Hybrid - ANIMATED */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden relative">
        {/* Decorative background elements - Animated */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Heading - Animated */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-purple-400" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
              </motion.div>
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-widest">EVERYTHING YOU NEED</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
              </motion.div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-400 to-blue-400" />
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-gray-900">Built for</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Campus Life
                </span>
                {/* Curved underline arrow - Animated */}
                <motion.svg
                  className="absolute -right-20 top-1/2 -translate-y-1/2 hidden md:block"
                  width="120"
                  height="80"
                  viewBox="0 0 120 80"
                  fill="none"
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 0.6, pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <motion.path
                    d="M10 40C30 20 60 20 80 30C90 35 95 45 100 50"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <motion.path
                    d="M95 45L100 50L95 55"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                  />
                </motion.svg>
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Real tools solving real problems for TCET students and clubs
            </motion.p>
          </motion.div>

          {/* Carousel Container with Sticky Notes - ANIMATED */}
          <div className="relative">
            {/* Carousel Cards - Horizontal Scroll - ANIMATED */}
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              
              {/* Card 1 - Event Discovery (Blue Sticky) - ANIMATED */}
              <motion.div
                className="min-w-[340px] md:min-w-[380px] snap-center group relative"
                initial={{ opacity: 0, x: 100, rotate: 8 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Tape - Animated */}
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 rounded-sm shadow-md border border-yellow-300/50 transform rotate-2 opacity-90 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
                
                {/* Push Pin - Animated */}
                <motion.div
                  className="absolute -top-3 right-8 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-xl border-2 border-red-700" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-red-300 to-red-500 rounded-full" />
                </motion.div>

                {/* Main Card */}
                <motion.div
                  className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-10 shadow-2xl min-h-[420px] relative overflow-hidden cursor-pointer"
                  whileHover={{ rotate: 0, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>

                  <div className="relative z-10">
                    {/* Icon Badge - Animated */}
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/30"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    >
                      <Calendar className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      className="text-3xl font-black text-white mb-4 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      Never Miss<br />an Event
                    </motion.h3>
                    <motion.p
                      className="text-blue-50 leading-relaxed mb-6 text-base"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      Every campus event in one place. Filter by tech talks, cultural fests, or workshops. One-click RSVP with instant confirmations.
                    </motion.p>

                    {/* Feature Pills - Staggered */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Smart Filters', '1-Click RSVP', 'Live Updates'].map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA - Animated */}
                    <motion.div
                      className="flex items-center gap-2 text-white font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Explore Events</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 2 - Community Forums (Purple Sticky) - ANIMATED */}
              <motion.div
                className="min-w-[340px] md:min-w-[380px] snap-center group relative"
                initial={{ opacity: 0, x: 100, rotate: -8 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 rounded-sm shadow-md border border-yellow-300/50 transform -rotate-3 opacity-90 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
                
                <motion.div
                  className="absolute -top-3 right-8 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-xl border-2 border-orange-700" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full" />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500 via-purple-600 to-fuchsia-700 rounded-3xl p-10 shadow-2xl min-h-[420px] relative overflow-hidden cursor-pointer"
                  whileHover={{ rotate: 0, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/30"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    >
                      <MessageSquare className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-black text-white mb-4 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      Ask. Share.<br />Learn.
                    </motion.h3>
                    <motion.p
                      className="text-purple-50 leading-relaxed mb-6 text-base"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      Get answers from seniors, share project ideas, find study groups. Upvote helpful content, build your campus network.
                    </motion.p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Q&A Forums', 'Upvote System', 'Real-time Chat'].map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-white font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Join Discussions</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 3 - Club Management (Pink Sticky) - ANIMATED */}
              <motion.div
                className="min-w-[340px] md:min-w-[380px] snap-center group relative"
                initial={{ opacity: 0, x: 100, rotate: 8 }}
                whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 rounded-sm shadow-md border border-yellow-300/50 transform rotate-1 opacity-90 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
                
                <motion.div
                  className="absolute -top-3 right-8 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 200 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-xl border-2 border-indigo-700" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full" />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-700 rounded-3xl p-10 shadow-2xl min-h-[420px] relative overflow-hidden cursor-pointer"
                  whileHover={{ rotate: 0, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/30"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-black text-white mb-4 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      Manage<br />Your Club
                    </motion.h3>
                    <motion.p
                      className="text-pink-50 leading-relaxed mb-6 text-base"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      Create events, track RSVPs, reach students. Analytics dashboard shows what works. Everything clubs need in one platform.
                    </motion.p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Event Analytics', 'RSVP Tracking', 'CSV Export'].map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-white font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Club Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 4 - Real-time Updates (Teal Sticky) - ANIMATED */}
              <motion.div
                className="min-w-[340px] md:min-w-[380px] snap-center group relative"
                initial={{ opacity: 0, x: 100, rotate: -8 }}
                whileInView={{ opacity: 1, x: 0, rotate: -1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 rounded-sm shadow-md border border-yellow-300/50 transform -rotate-1 opacity-90 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                />
                
                <motion.div
                  className="absolute -top-3 right-8 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full shadow-xl border-2 border-violet-700" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-to-br from-purple-300 to-violet-500 rounded-full" />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 rounded-3xl p-10 shadow-2xl min-h-[420px] relative overflow-hidden cursor-pointer"
                  whileHover={{ rotate: 0, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/30"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-black text-white mb-4 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      Lightning<br />Fast Updates
                    </motion.h3>
                    <motion.p
                      className="text-teal-50 leading-relaxed mb-6 text-base"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      WebSocket-powered real-time notifications. See RSVPs, comments, and votes instantly. No refresh needed, ever.
                    </motion.p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['WebSockets', 'Live Status', 'Zero Lag'].map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-white font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Experience Speed</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Remaining carousel card wrapper ends */}
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <div className="w-2 h-2 bg-teal-400 rounded-full" />
              <span className="ml-2 text-sm text-gray-500">Scroll to explore →</span>
            </div>
          </div>

          {/* Quick Stats - Sticky Note Style */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm shadow-sm opacity-70" />
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-all">
                <div className="text-4xl font-black text-white mb-1 drop-shadow-lg">&lt;2 min</div>
                <div className="text-sm text-orange-50 font-bold uppercase tracking-wide">Average RSVP Time</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm shadow-sm opacity-70" />
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-all">
                <div className="text-4xl font-black text-white mb-1 drop-shadow-lg">98%</div>
                <div className="text-sm text-emerald-50 font-bold uppercase tracking-wide">Event Attendance</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm shadow-sm opacity-70" />
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-all">
                <div className="text-4xl font-black text-white mb-1 drop-shadow-lg">Zero</div>
                <div className="text-sm text-violet-50 font-bold uppercase tracking-wide">Missed Opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Features Section - ANIMATED */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 py-24 relative overflow-hidden">
        {/* Decorative elements - Animated */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Heading - Animated */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
              <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">POWERFUL FEATURES</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Everything You Need
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  In One Platform
                </span>
                {/* Decorative arrow - Animated */}
                <motion.svg
                  className="absolute -bottom-3 left-0 w-full"
                  height="20"
                  viewBox="0 0 400 20"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <path d="M5 10C80 5 160 8 240 12C320 16 360 14 395 10" stroke="url(#paint0_linear_dark)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4"/>
                  <defs>
                    <linearGradient id="paint0_linear_dark" x1="0" y1="0" x2="400" y2="0">
                      <stop stopColor="#60A5FA" stopOpacity="0.5"/>
                      <stop offset="0.5" stopColor="#A78BFA" stopOpacity="0.5"/>
                      <stop offset="1" stopColor="#F472B6" stopOpacity="0.5"/>
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover why TCET students love our platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/events"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {/* Product Card 1 - Animated */}
            <motion.div
              className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, backgroundColor: "rgba(31, 41, 55, 0.7)", borderColor: "rgba(59, 130, 246, 0.5)" }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Calendar className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Event Discovery</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse all campus events. Filter by category, date, or club. One-click RSVP. Never miss what matters.
              </p>
            </motion.div>

            {/* Product Card 2 - Animated */}
            <motion.div
              className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, backgroundColor: "rgba(31, 41, 55, 0.7)", borderColor: "rgba(168, 85, 247, 0.5)" }}
            >
              <motion.div
                className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Student Forums</h3>
              <p className="text-gray-400 leading-relaxed">
                Reddit-style discussions. Share knowledge, ask questions, upvote quality content. Build your network.
              </p>
            </motion.div>

            {/* Product Card 3 - Animated */}
            <motion.div
              className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, backgroundColor: "rgba(31, 41, 55, 0.7)", borderColor: "rgba(236, 72, 153, 0.5)" }}
            >
              <motion.div
                className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-6 h-6 text-pink-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Club Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Organize events, manage members, and engage with students. All tools in one place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ready to Join - ANIMATED */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Decorative background elements - Animated */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Badge - Animated */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-lg mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-gray-700">Join 10,000+ Active Students</span>
          </motion.div>

          {/* Main Heading with Wall of Words Style - Animated */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">READY TO JOIN?</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The Wall of Words
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  We Make Their Day
                </span>
                {/* Handwritten-style underline - Animated */}
                <motion.svg
                  className="absolute -bottom-4 left-0 w-full"
                  height="24"
                  viewBox="0 0 600 24"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                >
                  <path d="M10 12C100 8 200 16 300 12C400 8 500 20 590 12" stroke="url(#paint0_cta)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_cta" x1="0" y1="0" x2="600" y2="0">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="0.5" stopColor="#8B5CF6"/>
                      <stop offset="1" stopColor="#EC4899"/>
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h2>

            {/* Handwritten-style tagline - Animated */}
            <motion.div
              className="relative inline-block mt-8"
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-blue-600 italic">
                Better, Everyday
              </p>
              {/* Curved arrow pointing to CTA - Animated */}
              <motion.svg
                className="absolute -right-24 -bottom-8 hidden md:block"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                <path d="M20 20C30 40 40 60 60 70" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4"/>
                <motion.path
                  d="M55 65L60 70L55 75"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 2 }}
                />
              </motion.svg>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join hundreds of TCET students already using TCETian to discover events, connect with peers, and build their campus network
          </motion.p>

          {/* CTA Buttons - Animated */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center gap-3"
              >
                Create Free Account
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/events"
                className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition border-2 border-gray-200 hover:border-gray-300 inline-flex items-center gap-3"
              >
                Browse Events
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators - Staggered Animation */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[
              { icon: Shield, text: '100% Free Forever', color: 'text-green-600' },
              { icon: Award, text: 'TCET Verified', color: 'text-blue-600' },
              { icon: BarChart3, text: '10K+ Active Users', color: 'text-purple-600' }
            ].map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
