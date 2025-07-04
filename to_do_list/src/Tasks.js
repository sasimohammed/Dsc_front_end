import React, { useState } from 'react';
import { useAppContext } from './Appcontext';
import { motion, AnimatePresence } from 'framer-motion';
import rocket from './img/rocket.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Tasks() {
    const { state, dispatch } = useAppContext();
    const tasks = state.tasks;

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [newTask, setNewTask] = useState('');
    const [activeTab, setActiveTab] = useState("all");

    const filteredTasks = tasks.filter(task => {
        if (activeTab === "all") return true;
        if (activeTab === "pending") return !task.completed;
        if (activeTab === "completed") return task.completed;
        return true;
    });

    const startEditing = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, text: editText } : task
        );
        dispatch({ type: 'SET_TASKS', payload: updatedTasks });
        setEditingId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const addTask = () => {
        if (newTask.trim()) {
            const newTasks = [
                { id: Date.now(), text: newTask, completed: false },
                ...tasks
            ];
            dispatch({ type: 'SET_TASKS', payload: newTasks });
            setNewTask('');
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    };

    const toggleTaskCompletion = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                dispatch({
                    type: 'ADD_XP',
                    payload: task.completed ? -5 : 5
                });
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        dispatch({ type: 'SET_TASKS', payload: updatedTasks });
    };

    const tabVariants = {
        inactive: {
            scale: 1,
            backgroundColor: 'rgba(76, 29, 149, 0.3)'
        },
        active: {
            scale: 1.05,
            backgroundColor: 'rgba(126, 34, 206, 0.7)',
            transition: { duration: 0.2 }
        },
        hover: {
            scale: 1.03,
            backgroundColor: 'rgba(126, 34, 206, 0.5)',
            transition: { duration: 0.1 }
        }
    };

    const taskVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
        completed: { opacity: 0.7, x: 0, transition: { duration: 0.3 } }
    };

    const checkButtonVariants = {
        unchecked: { scale: 1 },
        checked: { scale: [1, 1.1, 1] }
    };

    return (
        <div className="w-11/12 min-h-screen p-4 text-white text-xs sm:text-sm">
            {/* Add Task Input */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 bg-purple-900/30 border border-purple-500/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <motion.button
                    onClick={addTask}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition text-xs sm:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add
                </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 text-xs sm:text-sm">
                {['all', 'pending', 'completed'].map(tab => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-3 py-1 rounded-lg"
                        variants={tabVariants}
                        initial="inactive"
                        animate={activeTab === tab ? "active" : "inactive"}
                        whileHover="hover"
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                ))}
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16">
                    <img
                        src={rocket}
                        alt="Start Now"
                        className="w-2/6 h-1/2 object-contain mb-3"
                    />
                    <p className="text-purple-300 text-sm">Add your first task to get started!</p>
                </div>
            ) : (
                <div className="space-y-2 w-full sm:w-[80%] text-xs sm:text-sm">
                    <AnimatePresence>
                        {filteredTasks.map(task => (
                            <motion.div
                                key={task.id}
                                className={`w-full flex items-center justify-between rounded-lg border p-2 ${task.completed ? 'bg-purple-900/30 border-purple-700/50' : 'bg-purple-800/50 border-purple-500/30'}`}
                                variants={taskVariants}
                                initial="initial"
                                animate={task.completed ? "completed" : "animate"}
                                exit="exit"
                            >
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        onClick={() => toggleTaskCompletion(task.id)}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-purple-500 border-purple-500' : 'border-purple-300 hover:border-purple-400'}`}
                                        variants={checkButtonVariants}
                                        animate={task.completed ? "checked" : "unchecked"}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {task.completed && (
                                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </motion.button>

                                    {editingId === task.id ? (
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="bg-purple-900/50 border border-purple-500/50 rounded px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm"
                                            autoFocus
                                        />
                                    ) : (
                                        <motion.span
                                            className={task.completed ? 'line-through text-purple-300' : ''}
                                            animate={{
                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                color: task.completed ? '#d8b4fe' : 'white'
                                            }}
                                        >
                                            {task.text}
                                        </motion.span>
                                    )}
                                </div>

                                <div className="flex gap-1">
                                    {editingId === task.id ? (
                                        <>
                                            <motion.button
                                                onClick={() => saveEdit(task.id)}
                                                className="text-green-400 hover:text-green-300 p-1 text-xs sm:text-sm"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Save
                                            </motion.button>
                                            <motion.button
                                                onClick={cancelEdit}
                                                className="text-red-400 hover:text-red-300 p-1 text-xs sm:text-sm"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Cancel
                                            </motion.button>
                                        </>
                                    ) : (
                                        <>
                                            <motion.button
                                                onClick={() => startEditing(task.id, task.text)}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FontAwesomeIcon className={"text-purple-300 text-xs sm:text-sm"} icon={faPenToSquare} />
                                            </motion.button>
                                            <motion.button
                                                onClick={() => deleteTask(task.id)}
                                                className="text-red-400 hover:text-red-300 p-1 text-xs sm:text-sm"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                Delete
                                            </motion.button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default Tasks;