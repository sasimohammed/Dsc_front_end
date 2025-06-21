import React, {useEffect} from "react";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { motion } from "framer-motion"
import { faMoon, faSun, faUser, faLink, faMapMarkerAlt, faBuilding, faUsers, faStar, faCodeBranch, faBook } from '@fortawesome/free-solid-svg-icons';

function Search() {
    const [isOn, setIsOn] = useState(false)
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }
        else{
            document.documentElement.classList.remove('dark')
        }
    },[theme])

    const toggleTheme = () => {
       setIsOn(!isOn);
       setTheme(theme==='dark'? 'light' : 'dark')
    }
    
    useEffect(() => {
        const his=localStorage.getItem('user');
        if(his){
            setHistory(JSON.parse(his));
        }
    }, [])

    const handlesearch = async (customUsername) => {
        const username = (customUsername || search).trim().toLowerCase();
        if (!username) {
            setError("Please enter a username");
            return;
        }
        try {
            const response = await fetch(`https://api.github.com/users/${username}`)
            if (!response.ok) {
                throw new Error("User not found")
            }
            const data = await response.json();
            setData(data);
            setError(null);


            setHistory(prev => {
                if (!prev.includes(username)) {
                    const updated = [...prev, username];
                    localStorage.setItem('user', JSON.stringify(updated));
                    return updated;
                }
                return prev;
            });

        }
        catch (err) {
            setData(null);
            setError(err.message);
            console.log(err);
        }
    }

    const topProfiles = [
        {
            username: "torvalds",
            name: "Linus Torvalds",
            avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
            url: "https://github.com/torvalds",
        },
        {
            username: "gaearon",
            name: "Dan Abramov",
            avatar: "https://avatars.githubusercontent.com/u/810438?v=4",
            url: "https://github.com/gaearon",
        },
        {
            username: "sindresorhus",
            name: "Sindre Sorhus",
            avatar: "https://avatars.githubusercontent.com/u/170270?v=4",
            url: "https://github.com/sindresorhus",
        },

        {
            username: "addyosmani",
            name: "Addy Osmani",
            avatar: "https://avatars.githubusercontent.com/u/110953?v=4",
            url: "https://github.com/addyosmani",
        }
    ];

    return (
        <div className={`search w-full min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex flex-row justify-start`}>
            <div
                className={`w-full h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col p-10 items-start justify-between`}>

                <nav
                    className={`flex items-center sm:mb-1 mb-5 justify-between w-[95%] p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                    {/*logo*/}
                    <h1 className={`font-bold text-2xl flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        <span>
                            <span className="text-purple-500">GP_</span>
                            finder
                        </span>
                        <FontAwesomeIcon icon={faGithub} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}/>
                    </h1>

                    {/*toggle*/}
                    <div className={"flex flex-row items-center gap-3"}>
                        <button
                            onClick={toggleTheme}
                            className={`w-[80px] h-[30px] rounded-full px-2 flex items-center ${
                                isOn ? "justify-start bg-gray-700" : "justify-end bg-gray-300"
                            } transition-colors duration-300`}
                        >
                            <motion.div
                                layout
                                transition={{type: "spring", bounce: 0.25, duration: 0.3}}
                                className="w-[25px] h-[25px] rounded-full bg-purple-500"
                            />
                        </button>
                        <FontAwesomeIcon
                            icon={faMoon}
                            className={`text-xl ${theme === 'dark' ? 'text-purple-400' : 'text-gray-400'}`}
                        />
                        <FontAwesomeIcon
                            icon={faSun}
                            className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-yellow-500'}`}
                        />
                    </div>
                </nav>

                {/*history*/}
                <div
                    className={`sm:w-[21%] w-[95%] max-h-[60vh] ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } p-6 sm:absolute sm:right-[7%] sm:top-[20%] shadow-md rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            className={`text-lg font-semibold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            Search History
                        </h2>
                        {history.length > 0 && (
                            <button
                                className="text-sm text-red-500 hover:underline"
                                onClick={() => {
                                    setHistory([]);
                                    localStorage.removeItem('user');
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <ul className="space-y-2">
                        {history.length > 0 ? (
                            history.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={`https://github.com/${item}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`block px-3 py-2 rounded transition-all duration-200 ${
                                            theme === 'dark'
                                                ? 'text-white hover:bg-gray-700'
                                                : 'text-gray-800 hover:bg-purple-100'
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSearch(item);         // updates input field visually
                                            handlesearch(item);      // immediately uses the correct value
                                        }}

                                    >
                                        @{item}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li
                                className={`${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                } text-sm italic`}
                            >
                                No history yet.
                            </li>
                        )}
                    </ul>
                </div>

                {/* Recommended Profiles */}
                <div className="mt-10 sm:w-[70%] w-[95%] grid grid-cols-2 md:grid-cols-4 gap-6">
                    {topProfiles.map((profile) => (
                        <a
                            key={profile.username}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'} p-6 rounded-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex flex-col items-center transition duration-300`}
                        >
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-20 h-20 rounded-full mb-4"
                            />
                            <p className="font-semibold text-lg">{profile.name}</p>
                            <p className="text-purple-500 text-sm">@{profile.username}</p>
                        </a>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="sm:w-[70%] w-[95%] mt-10 flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search GitHub username..."
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlesearch()
                            }
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`flex-1 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <button
                        onClick={()=>handlesearch()}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Search
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className={`w-[70%] mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'}`}>
                        {error}
                    </div>
                )}

                {/* User Data */}
                {data && (
                    <div
                        className={`sm:w-[70%] w-[95%] mt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col items-center">
                                <img
                                    src={data.avatar_url}
                                    alt={data.name || data.login}
                                    className="w-40 h-40 rounded-full mb-4"
                                />
                                <a
                                    href={data.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-500 hover:underline"
                                >
                                    @{data.login}
                                </a>
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">{data.name || data.login}</h2>
                                        <p className="text-purple-500">@{data.login}</p>
                                    </div>
                                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Joined {new Date(data.created_at).toLocaleDateString()}</p>
                                </div>

                                <p className={`my-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {data.bio || "This profile has no bio"}
                                </p>

                                <div
                                    className={`grid grid-cols-3 gap-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg p-4 mb-6`}>
                                    <div className="flex flex-col items-center">
                                        <span
                                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Repos</span>
                                        <span className="font-bold">{data.public_repos}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span
                                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Followers</span>
                                        <span className="font-bold">{data.followers}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span
                                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Following</span>
                                        <span className="font-bold">{data.following}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt}
                                                         className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}/>
                                        <span>{data.location || "Not Available"}</span>
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <FontAwesomeIcon icon={faLink}
                                                         className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}/>
                                        {data.blog ? (
                                            <a href={data.blog} target="_blank" rel="noopener noreferrer"
                                               className="text-purple-500 hover:underline">
                                                {data.blog}
                                            </a>
                                        ) : (
                                            <span>Not Available</span>
                                        )}
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <FontAwesomeIcon icon={faBuilding}
                                                         className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}/>
                                        <span>{data.company || "Not Available"}</span>
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <FontAwesomeIcon icon={faUsers}
                                                         className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}/>
                                        <span>{data.followers} followers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;