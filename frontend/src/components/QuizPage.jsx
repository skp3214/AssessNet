import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser"
import questions from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import config from '../config/config';
function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        calculateScore();
    }, [userAnswers]);

    const handleAnswerChange = (questionId, selectedAnswer) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: selectedAnswer
        }));
    };

    const calculateScore = () => {
        let newScore = 0;
        questions.forEach(question => {
            if (userAnswers[question.id] === question.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleQuestionNavigation = (index) => {
        setCurrentQuestion(index);
    };

    const finistTest = () => {

        console.log(user.email)
        console.log(score)
        let emailTemplate = `${user.name} your test score is ${score}/${questions.length}`;
        emailjs.send(
            config.emailJSServiceID,
            config.emailJSTemplateID,
            {
                from_name: 'AssessNet',
                to_name: user.name,
                from_email: 'skprajapati3214@gmail.com',
                to_email: user.email,
                message: emailTemplate
            },
            config.emailJSPublicKEY
        )
            .then((response) => {
                console.log('Email sent successfully');
                console.log(response)
                alert('Email sent successfully');
                dispatch(logout());
                navigate('/');
            })
            .catch((err) => {
                console.error('Error sending email:', err);
                alert('Error sending email');
            });

    }

    return (
        <div className="min-h-screen bg-indigo-400 py-6 flex flex-col justify-center ">
            <div className="relative py-3 ">
                <div className="relative px-4 py-10 bg-indigo-100 shadow-lg ">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 ">
                                {!quizCompleted ? (
                                    <>
                                        <h2 className="text-3xl font-extrabold text-gray-900">Quiz</h2>
                                        <p className="text-xl text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                                        <p className="font-medium">{questions[currentQuestion].question}</p>
                                        <div className="space-y-2">
                                            {questions[currentQuestion].options.map((option, index) => (
                                                <label key={index} className="flex items-center space-x-3">
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-5 w-5 text-indigo-600"
                                                        checked={userAnswers[questions[currentQuestion].id] === option}
                                                        onChange={() => handleAnswerChange(questions[currentQuestion].id, option)}
                                                    />
                                                    <span className="text-gray-900 font-medium">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <button
                                                onClick={handlePrevious}
                                                disabled={currentQuestion === 0}
                                                className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 "
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 "
                                            >
                                                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                            </button>
                                        </div>
                                        <div className="pt-6 text-base leading-6 font-bold ">
                                            <p className="text-gray-900">Question Navigation:</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {questions.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleQuestionNavigation(index)}
                                                        className={`w-8 h-8 rounded-full  ${currentQuestion === index
                                                            ? 'bg-indigo-600 text-white'
                                                            : userAnswers[questions[index].id]
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-gray-200 text-gray-700'
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900">Quiz Completed!</h3>
                                        <button
                                            onClick={finistTest}
                                            className="px-4 py-2 font-medium text-white mt-4 bg-indigo-600 rounded-md hover:bg-indigo-500 "
                                        >
                                            Finish Test
                                        </button>
                                        <button
                                            onClick={() => setQuizCompleted(false)}
                                            className="px-4 py-2 font-medium mx-4 text-white mt-4 bg-indigo-600 rounded-md hover:bg-indigo-500 "
                                        >
                                            Back To Test
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;