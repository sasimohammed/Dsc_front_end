import React, { useState, useEffect } from 'react';
import { useAppContext } from "./Appcontext";

function Achievements() {
    const { state } = useAppContext();
    const [currentXP] = useState(state.xp);
    const [nextLevelXP] = useState(1000);

    const [activeTab, setActiveTab] = useState('achievements');
    const [streak] = useState(5);
    const [unlockedAvatars] = useState([0]); // Index of unlocked avatars
    const [selectedAvatar, setSelectedAvatar] = useState(0);

    // Sample data
    const avatars = [
        { id: 0, name: "Superhero", xpRequired: 0 },
        { id: 1, name: "Warrior", xpRequired: 2000 },
        { id: 2, name: "Beast", xpRequired: 2000 },
        { id: 3, name: "Monster", xpRequired: 2000 },
        { id: 4, name: "Star", xpRequired: 2000 },
        { id: 5, name: "Masked", xpRequired: 2000 },
        { id: 6, name: "Armored", xpRequired: 2000 },
        { id: 7, name: "Futuristic", xpRequired: 2000 },
        { id: 8, name: "Agent", xpRequired: 2000 }
    ];

    const badges = [
        { id: 1, name: "7-Day Streak", unlocked: true },
        { id: 2, name: "Legend", unlocked: true },
        { id: 3, name: "Helper", unlocked: false },
        { id: 4, name: "Master", unlocked: false }
    ];

    const achievements = [
        {
            id: 1,
            name: "First Step",
            description: "Complete your first task",
            unlocked: true,
            xp: 10,
        },
        {
            id: 2,
            name: "Task Novice",
            description: "Complete 10 tasks",
            unlocked: true,
            xp: 25,
        },
        {
            id: 3,
            name: "Task Master",
            description: "Complete 100 tasks",
            unlocked: true,
            xp: 100,
        },
        {
            id: 4,
            name: "Week Warrior",
            description: "Maintain a 7-day streak",
            unlocked: true,
            xp: 50,
        },
        {
            id: 5,
            name: "Month Master",
            description: "Maintain a 30-day streak",
            unlocked: false,
            xp: 250,
        },
        {
            id: 6,
            name: "Consistency King",
            description: "100-day streak",
            unlocked: false,
            xp: 500,
        },
        {
            id: 7,
            name: "Early Bird",
            description: "Complete a task before 7 AM",
            unlocked: false,
            xp: 75,
        },
        {
            id: 8,
            name: "Night Owl",
            description: "Complete a task after midnight",
            unlocked: false,
            xp: 75,
        },
        {
            id: 9,
            name: "Speed Runner",
            description: "Complete 5 tasks within one hour",
            unlocked: false,
            xp: 150,
        },
        {
            id: 10,
            name: "Completionist",
            description: "Unlock all other achievements",
            unlocked: false,
            xp: 1000,
        },
        {
            id: 11,
            name: "Work Warrior",
            description: "Complete 50 work-related tasks",
            unlocked: false,
            xp: 200,
        },
        {
            id: 12,
            name: "Health Hero",
            description: "Complete 30 health/fitness tasks",
            unlocked: false,
            xp: 200,
        }
    ];

    return (
        <div className="bg-gradient-to-b min-h-screen p-4 text-white text-xs sm:text-sm">

            {/* Header with XP and Level */}
            <div className="relative p-3 text-white flex flex-col gap-3 bg-gradient-to-b from-gray-900 to-purple-900 rounded-xl mb-4">
                <div className="flex flex-row items-center gap-3 justify-start">
                    <img
                        className="rounded-full w-12 h-12 border-2 border-white object-cover"
                        src={`https://img.freepik.com/free-vector/superhero-concept-illustration_114360-29318.jpg?uid=R117230801&ga=GA1.1.578030478.1725297375&semt=ais_hybrid&w=740`}
                        alt="SuperHero"
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-lg">SuperHero</h1>
                        <p className="italic text-sm">"Saving the day, one task at a time!"</p>
                    </div>
                </div>

                <div className="mb-1">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Level {Math.floor(currentXP/1000) + 1} Hero</span>
                        <span>{currentXP} / {nextLevelXP} XP</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                            className="bg-purple-300 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(currentXP % 1000 / 1000) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="absolute sm:right-4 sm:top-4 right-2 top-1 bg-purple-800 text-white font-bold text-xs sm:px-3 sm:py-2 px-2 py-1 rounded-lg shadow-lg flex items-center justify-center space-x-1 hover:scale-105 transition cursor-pointer">
                    <span className="text-sm">🔥</span>
                    <span className="leading-tight">
                        {streak} Day Streak
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-purple-700 mb-4 text-xs sm:text-sm">
                <button
                    className={`px-3 py-1 font-medium ${activeTab === 'achievements' ? 'text-purple-300 border-b-2 border-purple-300' : 'text-purple-100'}`}
                    onClick={() => setActiveTab('achievements')}
                >
                    Achievements
                </button>
                <button
                    className={`px-3 py-1 font-medium ${activeTab === 'avatars' ? 'text-purple-300 border-b-2 border-purple-300' : 'text-purple-100'}`}
                    onClick={() => setActiveTab('avatars')}
                >
                    Avatars
                </button>
                <button
                    className={`px-3 py-1 font-medium ${activeTab === 'stats' ? 'text-purple-300 border-b-2 border-purple-300' : 'text-purple-100'}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Stats
                </button>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
                {activeTab === 'achievements' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {achievements.map(achievement => (
                            <div
                                key={achievement.id}
                                className={`p-3 rounded-lg border ${achievement.unlocked ? 'bg-purple-800/50 border-purple-500' : 'bg-gray-800/50 border-gray-700'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-700'}`}>
                                        {achievement.unlocked ? '🏆' : '🔒'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{achievement.name}</h3>
                                        <p className="text-xs">{achievement.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'avatars' && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-8 gap-3">
                        {avatars.map((avatar, index) => (
                            <div
                                key={avatar.id}
                                className={`relative group ${unlockedAvatars.includes(index) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                onClick={() => unlockedAvatars.includes(index) && setSelectedAvatar(index)}
                            >
                                <div className={`relative overflow-hidden rounded-full border-2 ${selectedAvatar === index ? 'border-yellow-400' : 'border-white'}`}>
                                    <img
                                        className="w-full h-auto aspect-square object-cover"
                                        src={`https://img.freepik.com/premium-photo/powerful-female-superhero-with-purple-skin-futuristic-armor_1179510-2849.jpg?uid=R117230801&ga=GA1.1.578030478.1725297375&semt=ais_hybrid&w=740`}
                                        alt={avatar.name}
                                    />
                                    {!unlockedAvatars.includes(index) && (
                                        <>
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">🔒</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-2xs p-1 text-center">
                                                {avatar.xpRequired} XP
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className="text-center mt-1 text-xs">{avatar.name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="space-y-4">
                        <div className="bg-purple-900/30 p-3 rounded-lg">
                            <h3 className="font-bold text-sm mb-2">Your Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <StatCard title="Tasks Completed" value="100" icon="✅" />
                                <StatCard title="Days Active" value="25" icon="📅" />
                                <StatCard title="Current Level" value={Math.floor(currentXP/1000) + 1} icon="⭐" />
                                <StatCard title="XP to Next Level" value={nextLevelXP - currentXP} icon="⚡" />
                            </div>
                        </div>

                        <div className="bg-purple-900/30 p-3 rounded-lg">
                            <h3 className="font-bold text-sm mb-2">Your Badges</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {badges.map(badge => (
                                    <div key={badge.id} className="text-center">
                                        <div className={`w-12 h-12 mx-auto rounded-full border-2 ${badge.unlocked ? 'border-yellow-400' : 'border-gray-600 opacity-50'}`}>
                                            <img
                                                src={`https://img.freepik.com/free-vector/flat-women-s-day-superwoman-illustration_23-2149263659.jpg?uid=R117230801&ga=GA1.1.578030478.1725297375&semt=ais_hybrid&w=740`}
                                                alt={badge.name}
                                                className={`w-full h-full object-cover rounded-full ${!badge.unlocked && 'grayscale'}`}
                                            />
                                        </div>
                                        <p className="mt-1 text-xs">{badge.name}</p>
                                        {!badge.unlocked && <p className="text-2xs text-gray-400">Locked</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-purple-800/50 p-2 rounded-lg flex items-center gap-2">
            <div className="text-xl">{icon}</div>
            <div>
                <p className="text-xs text-purple-200">{title}</p>
                <p className="font-bold text-sm">{value}</p>
            </div>
        </div>
    );
}

function ChallengeTask({ title, progress, total, xpReward, onComplete }) {
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        if (!checked && progress < total) {
            setChecked(true);
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    };

    return (
        <div
            className={`flex items-center gap-2 p-2 rounded-lg ${checked ? 'bg-green-900/30' : 'bg-purple-900/30'} cursor-pointer hover:bg-purple-800/50 transition`}
            onClick={handleCheck}
        >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-green-500' : 'border-2 border-white'}`}>
                {checked ? '✓' : ''}
            </div>
            <div className="flex-1">
                <p className="font-medium text-xs">{title}</p>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-1">
                    <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min(100, (progress / total) * 100)}%` }}
                    ></div>
                </div>
            </div>
            <div className="bg-yellow-500/20 text-yellow-400 text-2xs px-1 py-0.5 rounded">
                +{xpReward} XP
            </div>
        </div>
    );
}

export default Achievements;