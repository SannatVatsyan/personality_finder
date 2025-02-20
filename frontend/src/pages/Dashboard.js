import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import '../styles/Dashboard.css';

const COLORS = ["#007aff", "#ff2d55", "#34c759"]; // Apple-inspired colors

const Dashboard = () => {
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', sex: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:5002/api/test/last-result`, { 
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage.message}`);
                }

                const data = await response.json();
                console.log("Fetched results:", data);

                if (data.result) {
                    setResult(data.result);
                } else {
                    setResult(null);
                }
            } catch (err) {
                console.error("Error fetching results:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []); // ✅ Removed infinite loop by not depending on `result`

    const processChartData = () => {
        if (!result || !result.answers) return [];

        const counts = {
            Agree: 0,
            Neutral: 0,
            Disagree: 0
        };

        result.answers.forEach(answer => {
            if (counts[answer] !== undefined) {
                counts[answer]++;
            }
        });

        return Object.keys(counts).map(key => ({
            name: key,
            value: counts[key]
        }));
    };

    // ✅ Fixed MBTI Calculation Function
    const calculateMBTI = () => {
        if (!result || !result.answers || result.answers.length < 10) return "Unknown";

        let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

        const questionsMapping = [
            "E", "S", "T", "J",
            "I", "N", "F", "P",
            "E", "S"  // Last two for extra balance
        ];

        result.answers.forEach((answer, index) => {
            const trait = questionsMapping[index];

            if (answer === "Agree") {
                scores[trait]++;
            } else if (answer === "Disagree") {
                scores[trait === "E" ? "I" :
                       trait === "I" ? "E" :
                       trait === "S" ? "N" :
                       trait === "N" ? "S" :
                       trait === "T" ? "F" :
                       trait === "F" ? "T" :
                       trait === "J" ? "P" :
                       "J"]++;
            }
        });

        return `${scores["E"] > scores["I"] ? "E" : "I"}${scores["S"] > scores["N"] ? "S" : "N"}${scores["T"] > scores["F"] ? "T" : "F"}${scores["J"] > scores["P"] ? "J" : "P"}`;
    };

    const generatePDF = async () => {
        if (!result) return;

        const personalityType = result.personalityType || calculateMBTI();

        const pdf = new jsPDF();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.text("Personality Test Report", 20, 20);

        pdf.setFontSize(16);
        pdf.setTextColor(50);
        pdf.text(`Personality Type: ${personalityType}`, 20, 40);
        pdf.text(`Taken on: ${new Date(result.timestamp).toLocaleString()}`, 20, 50);

        pdf.setFontSize(18);
        pdf.setTextColor(0);
        pdf.text("📌 Your Responses:", 20, 65);

        let y = 75;
        pdf.setFontSize(12);
        pdf.setTextColor(50);

        result.answers.forEach((answer, index) => {
            pdf.text(`${index + 1}. ${answer}`, 20, y);
            y += 10;
        });

        pdf.setFontSize(18);
        pdf.setTextColor(0);
        pdf.text("📊 Answer Breakdown:", 20, y + 10);

        const chartElement = document.querySelector(".chart-container");
        if (chartElement) {
            await html2canvas(chartElement, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL("image/png");
                pdf.addImage(imgData, "PNG", 15, y + 20, 180, 80);
                pdf.save("Personality_Test_Report.pdf");
            });
        } else {
            pdf.text("Unable to generate chart preview.", 20, y + 30);
            pdf.save("Personality_Test_Report.pdf");
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Your Personality Insights</h1>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && result ? (
                <div className="test-result">
                    <div className="glassmorphism-card">
                        <h2 className="personality-type">Your MBTI Type: {result.personalityType || calculateMBTI()}</h2>
                        <p className="timestamp">Taken on: {new Date(result.timestamp).toLocaleString()}</p>

                        {/* 📊 Interactive Gauge Chart */}
                        <div className="chart-container">
                            <h3 className="chart-title">Personality Breakdown</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie 
                                        data={processChartData()} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" cy="50%" 
                                        innerRadius={60} 
                                        outerRadius={90} 
                                        fill="#8884d8" 
                                        paddingAngle={5} 
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {processChartData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 🎛 Share & Download Buttons */}
                        <div className="dashboard-buttons">
                            <button onClick={() => setShowForm(true)} className="primary-button">📤 Share Test Result</button>
                            <button onClick={generatePDF} className="secondary-button">📥 Download PDF</button>
                        </div>
                    </div>
                </div>
            ) : (
                !loading && !error && <p className="no-results">No results found.</p>
            )}
        </div>
    );
};

export default Dashboard;
