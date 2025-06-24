import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-3 text-white">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto py-12"
            >
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                            Your Hero Journey Starts Here
                        </h1>
                        <p className="text-base md:text-lg text-purple-100 mb-8 leading-relaxed">
                            Transform your daily progress into an epic adventure. Unlock badges, level up your hero, and celebrate every milestone with our gamified achievement system.
                        </p>

                    </div>
                    <div className="md:w-1/2 flex items-center justify-center">
                        <img
                            src="https://img.freepik.com/premium-photo/purple-object-with-purple-background-with-pad-paper-it_1040470-29641.jpg?uid=R117230801&ga=GA1.1.578030478.1725297375&semt=ais_hybrid&w=740"
                            alt="Hero Illustration"
                            className="w-4/6 h-11/12 rounded-2xl shadow-xl border-2 border-purple-500/30"
                        />
                    </div>
                </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto py-16"
            >
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        How The System Works
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "📝",
                            title: "Complete Actions",
                            description: "Every task you finish moves you closer to new achievements"
                        },
                        {
                            icon: "🔼",
                            title: "Earn XP",
                            description: "Gain experience points that help you level up"
                        },
                        {
                            icon: "🏆",
                            title: "Unlock Rewards",
                            description: "Collect badges and special items for your hero avatar"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-xl border border-purple-800/50"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-purple-100">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* XP System Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto py-16"
            >
                <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/50 rounded-2xl p-8 md:p-12 border border-purple-700/30 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-6">XP & Reward System</h2>
                            <ul className="space-y-4">
                                {[
                                    "Every task completed earns +5 XP",
                                    "5 completed tasks = +50 XP bonus",
                                    "Daily streaks multiply your rewards",
                                    "Special achievements unlock rare items"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="bg-pink-500 rounded-full p-1 flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-700/50">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs">Level 5 Hero</span>
                                    <span className="text-xs">600/1000 XP</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-2.5 rounded-full"
                                        style={{ width: '60%' }}
                                    ></div>
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((badge) => (
                                        <div key={badge} className="text-center">
                                            <div className="bg-purple-900/50 rounded-full p-3 mx-auto w-14 h-14 flex items-center justify-center mb-2">
                                                <span className="text-xl">🏅</span>
                                            </div>
                                            <p className="text-xs">Badge {badge}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto py-16"
            >
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-bold mb-4">Why Join The Adventure?</h2>
                    <p className="text-base text-purple-200 max-w-2xl mx-auto">
                        More than just tracking - it's about making progress enjoyable and rewarding
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/30 p-6 rounded-2xl border border-purple-800/50">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                            <span className="bg-purple-600 p-2 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </span>
                            Visual Progress Tracking
                        </h3>
                        <p className="text-sm text-purple-100">
                            See your growth through levels and achievements. Watch your hero evolve as you complete more tasks and hit milestones.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/50 to-pink-900/30 p-6 rounded-2xl border border-pink-800/50">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                            <span className="bg-pink-600 p-2 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </span>
                            Motivation Boost
                        </h3>
                        <p className="text-sm text-purple-100">
                            The gamification elements keep you engaged and motivated to maintain streaks and unlock the next reward.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto py-16 text-center"
            >
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-700/30">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Begin Your Quest?</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-2xl mx-auto">
                        Join thousands of heroes who are turning their daily tasks into epic adventures.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-2.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/30">
                            Get Started Now
                        </button>
                        <button className="px-6 py-2.5 text-sm bg-transparent border border-purple-400 rounded-full font-medium hover:bg-purple-900/30 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default About;