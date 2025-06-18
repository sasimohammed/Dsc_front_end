import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTrophy, faInfoCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Tasks from "./Tasks";
import Achievements from "./Achievements";
import About from "./About";
import { useAppContext } from './Appcontext';
import { motion } from 'framer-motion';

function Main() {
    const { state, dispatch } = useAppContext();
    const { currentPage, xp } = state;

    const renderContent = () => {
        switch (currentPage) {
            case 'tasks':
                return <Tasks />;
            case 'achievements':
                return <Achievements />;
            case 'about':
                return <About />;
            default:
                return <Tasks />;
        }
    };

    const sidebarItems = [
        { icon: faTasks, label: 'Tasks', page: 'tasks' },
        { icon: faTrophy, label: 'Achievements', page: 'achievements' },
        { icon: faInfoCircle, label: 'About Us', page: 'about' }
    ];

    return (
        <div className=" h-min-screen  cursor-pointer bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4  bg-gradient-to-br from-gray-900 to-purple-900 shadow-lg">
                <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-white rounded-full shadow-lg py-1 px-3 flex items-center justify-center">
                        <h1 className="text-[#3F073D] font-bold font-mavenpro text-2xl">T</h1>
                    </div>
                    <div className="text-xl font-bold">TO DO</div>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 px-4 py-2 rounded-xl shadow-lg">
                    🔥 XP: {xp}
                </div>
            </nav>

            <div className="flex">
                {/* Modern Sidebar */}
                <aside className="w-64  bg-gradient-to-br from-gray-900 to-purple-900 h-auto p-6 border-r border-purple-900/50 shadow-xl">
                    <div className="flex flex-col h-full">
                        <div className="mb-10">
                            <h2 className="text-xs uppercase tracking-wider text-purple-300/80 mb-4 pl-3">Navigation</h2>
                            <ul className="space-y-2">
                                {sidebarItems.map((item) => (
                                    <motion.li
                                        key={item.page}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative rounded-lg transition-all ${currentPage === item.page ? 'bg-gradient-to-r from-purple-800/60 to-pink-700/60' : 'hover:bg-purple-900/30'}`}
                                        onClick={() => dispatch({ type: 'SET_PAGE', payload: item.page })}
                                    >
                                        <div className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === item.page ? 'bg-purple-600/30' : 'bg-purple-900/20'}`}>
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className={currentPage === item.page ? 'text-purple-200' : 'text-purple-400'}
                                                    />
                                                </div>
                                                <span className={currentPage === item.page ? 'font-medium text-white' : 'text-purple-200'}>{item.label}</span>
                                            </div>
                                            {currentPage === item.page && (
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    className="text-purple-300 text-sm"
                                                />
                                            )}
                                        </div>
                                        {currentPage === item.page && (
                                            <motion.div
                                                layoutId="activeItem"
                                                className="absolute left-0 top-0 w-1 h-full bg-purple-400 rounded-r-lg"
                                                initial={false}
                                            />
                                        )}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default Main;